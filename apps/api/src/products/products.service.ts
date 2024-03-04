import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductForFront as ProductsForFront } from './models/ModelsProducts';
import { SearchProductsDto } from './dto/SearchProduct.dto';
import { GetByCategoryDto } from './dto/getByCategory.dto';

@Injectable()
export class ProductsService {
  logger: any;
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
    private readonly httpService: HttpService
  ) { }

  /**
   * Get product joins with shoppingCart with the category
   * @param category string
   * @returns ProductsForFront[]
   */
  async getProducts({ byCategory }: GetByCategoryDto): Promise<ProductsForFront[]> {
    // Get Category id
    const { id } = await this.categoriesService.findOneBy(byCategory.replace('-', ' ').toLocaleLowerCase());
    // Find Products with categoryID
    const products = await this.productRepository.find({
      where: {
        category_id: id
      },
      relations: {
        shoppingCart: true
      }
    });
    // Regroup product by title
    const groupedProducts: ProductsForFront[] = [];
    products.forEach((product) => {
      const idFromTitle = groupedProducts.findIndex(groupedProduct => product.title === groupedProduct.title);
      if (idFromTitle === -1) {
        groupedProducts.push({
          key: groupedProducts.length + 1,
          title: product.title,
          subTitle: '',
          brand: product.brand,
          images: [product.image],
          origin: '',
          variant: [{
            id: product.id,
            volume: product.weight,
            name: product.name,
            pcb: +product.quantity_per_box,
            code: product.code_supplier,
            quantity: product.shoppingCart ? product.shoppingCart.quantity : 0
          }]
        });
      } else {
        groupedProducts[idFromTitle].variant.push({
          id: product.id,
          volume: product.weight,
          name: product.name,
          pcb: +product.quantity_per_box,
          code: product.code_supplier,
          quantity: product.shoppingCart ? product.shoppingCart.quantity : 0
        });
      }
    });
    return groupedProducts;
  }

  async searchProducts({ search }: SearchProductsDto) {
    let searchLike = {};
    if (isNaN(+search)) {
      searchLike = { name: Like(`%${search}%`) };
    } else {
      searchLike = { code_supplier: Like(`%${search}%`) };
    }

    const filteredProduct = await this.productRepository.findBy(searchLike);
    return filteredProduct;
  }

  async positionProduct(id: string) {
    const product = await this.productRepository.find(
      {
        where: {
          code_supplier: +id
        },
      }
    );
    const p = product[0];

    // const test = await this.searchProducts(p.name);

  }

  async getImages() {
    const allProducts = await this.productRepository.find();
    await Promise.all(allProducts.map(async (product) => {
      const response: any = await firstValueFrom(
        this.httpService.get<any>(`https://world.openfoodfacts.org/api/v3/product/${product.ean}`).pipe(
          catchError((error: any) => {
            return this.logger.error(error.response.data);
          })
        ));

      const [findProduct] = await this.productRepository.find(
        {
          where: {
            code_supplier: product.code_supplier
          },
        }
      );

      const addedImage = { ...findProduct, image: response.data.product.image_front_small_url };
      await this.productRepository.save(addedImage);

      // if (response) {  

      //   response.forEach((e: any) => {
      //     if (e) {
      //       console.log('res', e)
      //     }
      //   });
      // }


    }));


  }
}
