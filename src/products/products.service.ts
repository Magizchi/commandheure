import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductForFront as ProductsForFront } from './models/ModelsProducts';

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

  async upload(file: string) {
    const csvInfoArray = file.split('\r\n').map(each => each.split(','))
    const csvHeader = csvInfoArray.splice(0, 1).flat()
    await Promise.all(
      csvInfoArray.map(async (product) => {
        const category = await this.categoriesService.findOneBy(product[0])
        if (category) {
          const newProduct: CreateProductDto = {
            category_id: category.id,
            category: category.id,
            code_supplier: +product[1],
            name: product[2],
            brand: product[3],
            douane: product[4],
            ean: product[5],
            quantity_per_box: product[6],
            weight: product[7],
            image_path: '',
          }


          const createdProduct = this.productRepository.create({ ...newProduct })
          await this.productRepository.save(createdProduct)
          return 'File uploaded and saved'
        }
      })
    )

    return 'Upload file'
  }
  /**
   * @param category category of products
   * @returns ProductsForFront[]
   */
  async getProducts(category: string): Promise<ProductsForFront[]> {
    const { id } = await this.categoriesService.findOneBy(category.replace('-', ' ').toLocaleLowerCase())
    const products = await this.productRepository.find({
      where: {
        category_id: id
      },
    })
    const groupedProducts: ProductsForFront[] = []

    products.forEach((product) => {
      const idFromTitle = groupedProducts.findIndex(groupedProduct => product.title === groupedProduct.title)
      if (idFromTitle === -1) {
        groupedProducts.push({
          title: product.title,
          subTitle: '',
          brand: product.brand,
          images: [product.image],
          origin: '',
          variant: [{
            volume: product.weight,
            name: product.name,
            pcb: +product.quantity_per_box,
            code: product.code_supplier
          }]
        })
      } else {
        groupedProducts[idFromTitle].variant.push({
          volume: product.weight,
          name: product.name,
          pcb: +product.quantity_per_box,
          code: product.code_supplier
        })
      }
    })
    return groupedProducts
  }

  async searchProducts(search: string) {
    const filteredProduct = await this.productRepository.findBy([
      { name: Like(`%${search}%`) },
      { code_supplier: +Like(`%${search}%`) }
    ])
    return filteredProduct.map((product) => ({ ...product, label: product.name, value: product.code_supplier }))
  }

  async positionProduct(id: string) {
    const product = await this.productRepository.find(
      {
        where: {
          code_supplier: +id
        },
      }
    )
    const p = product[0]

    const test = await this.searchProducts(p.name)

  }

  async getImages() {
    const allProducts = await this.productRepository.find()
    await Promise.all(allProducts.map(async (product) => {
      const response: any = await firstValueFrom(
        this.httpService.get<any>(`https://world.openfoodfacts.org/api/v3/product/${product.ean}`).pipe(
          catchError((error: any) => {
            return this.logger.error(error.response.data);
          })
        ))

      const [findProduct] = await this.productRepository.find(
        {
          where: {
            code_supplier: product.code_supplier
          },
        }
      )

      const addedImage = { ...findProduct, image: response.data.product.image_front_small_url }
      await this.productRepository.save(addedImage)

      // if (response) {  

      //   response.forEach((e: any) => {
      //     if (e) {
      //       console.log('res', e)
      //     }
      //   });
      // }


    }))


  }
}
