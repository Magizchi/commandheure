import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';


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


          const t = this.productRepository.create({ ...newProduct })
          // console.log('t', t);
          await this.productRepository.save(t)
          return 'File uploaded and saved'
        }
      })
    )

    return 'Upload file'
  }
  /**
   * @param category category of products
   * @param page asked pages
   * @param take take products
   * @returns 
   */
  async findByCategory(category: string, page: number, take: number) {
    const { id } = await this.categoriesService.findOneBy(category.replace('-', ' ').toUpperCase())

    const [productPerCategory, filtered] = await this.productRepository.findAndCount({
      where: {
        category_id: id
      },
      skip: (page - 1) * take,
      take: take,
      order: {
        code_supplier: 'asc'
      }
    })

    const result = {
      products: productPerCategory.sort((a, b) => +a.code_supplier - +b.code_supplier).map((item, index) => ({ ...item, key: 1 + index + (page - 1) * take })),
      filtered: filtered,
      total: filtered
    }
    return result
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
      // console.log('pr', product.code_supplier)
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

      // console.log('findProduct', findProduct);

      const addedImage = { ...findProduct, image: response.data.product.image_front_small_url }
      // console.log('addedImage', addedImage)
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

// create(createProductDto: CreateProductDto) {
//   return 'This action adds a new product';
// }

// findAll() {
//   return `This action returns all products`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} product`;
// }

// update(id: number, updateProductDto: UpdateProductDto) {
//   return `This action updates a #${id} product`;
// }

// remove(id: number) {
//   return `This action removes a #${id} product`;
// }