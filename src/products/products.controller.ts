import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCsv(@UploadedFile() file: Express.Multer.File) {
    const csvInfoString = file.buffer.toString()
    const uploadFileStatus = this.productsService.upload(csvInfoString)
    return `file name ${uploadFileStatus}`
  }

  @Get()
  async searchProducts(@Query("search") search): Promise<any> {
    const searchProducts = await this.productsService.searchProducts(search)
    return searchProducts
  }

  @Get(':id')
  getProducts(@Param('id') id: string, @Query() search: { page: number, size: number }) {
    return this.productsService.getProducts(id, search.page, search.size)
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
}
