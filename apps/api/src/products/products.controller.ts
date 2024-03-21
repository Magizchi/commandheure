import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchProductsDto } from './dto/SearchProduct.dto';
import { Product } from './entities/product.entity';
import { GetByCategoryDto } from './dto/getByCategory.dto';
import { log } from 'console';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async searchProducts(@Query(new ValidationPipe()) searchdto: SearchProductsDto): Promise<Product[]> {
    const searchProducts = await this.productsService.searchProducts(searchdto);
    return searchProducts;
  }

  @Get(':byCategory')
  getProducts(@Param(new ValidationPipe) byCategory: GetByCategoryDto, @Query(new ValidationPipe()) searchdto: SearchProductsDto) {
    console.log('searchdto', searchdto);

    return this.productsService.getProducts(byCategory, searchdto);
  }

  @Get('site/:id')
  redirect(@Param('id') id: string) {
    return this.productsService.positionProduct(id);
  }

  @Get('images/get-images')
  getImages() {
    return this.productsService.getImages();
  }
}
