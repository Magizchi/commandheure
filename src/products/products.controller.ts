import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, Redirect } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCsv(@UploadedFile() file: Express.Multer.File) {
    const csvInfoString = file.buffer.toString()
    const uploadFileStatus = this.productsService.upload(csvInfoString)
    return `file name ${uploadFileStatus}`
  }

  @Get()
  async searchProduct(@Query("search") search): Promise<any> {
    const searchProducts = await this.productsService.searchProducts(search)
    return searchProducts
  }

  @Get(':id')
  findByCategory(@Param('id') id: string, @Query() search) {
    console.log('search', search);

    return this.productsService.findByCategory(id, search.page, search.size)
  }

  @Get('site/:id')
  redirect(@Param('id') id: string) {
    console.log('&é"', id);

    return this.productsService.positionProduct(id)

  }

  @Get('images/get-images')
  getImages() {
    return this.productsService.getImages()
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
