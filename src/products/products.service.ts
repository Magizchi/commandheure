import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService
  ) { }


  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

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
            code_supplier: product[1],
            name: product[2],
            brand: product[3],
            douane: product[4],
            ean: product[5],
            quantity_per_box: product[6],
            weight: product[7],
            image_path: '',
          }


          const t = await this.productRepository.create({ ...newProduct })
          // console.log('t', t);
          await this.productRepository.save(t)
          return 'File uploaded and saved'
        }
      })
    )

    return 'Upload file'
  }

  async findByCategory(id: string) {
    const categoryName = await this.categoriesService.findOneBy(id.replace('-', ' ').toUpperCase())
    const productPerCategory = await this.productRepository.find({
      where: {
        category_id: categoryName.id
      }
    })
    console.log('products_aa', productPerCategory.length);

    return productPerCategory

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
