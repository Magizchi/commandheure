import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { SearchParamsDto } from './dto/search-params.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post()
  create(@Body(new ValidationPipe()) createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  findAll(@Query(new ValidationPipe()) search: SearchParamsDto) {
    return this.shoppingCartService.FindProductsInShoppingCart(search);
  }

  @Get('/excel')
  getExcelFile() {
    const fileInfo = this.shoppingCartService.getExcelFile();
    this.shoppingCartService.dropTable();
    return fileInfo;
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe) updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    if (updateShoppingCartDto.quantity === 0) {
      return this.shoppingCartService.remove(id);
    } else {
      return this.shoppingCartService.update(
        id,
        updateShoppingCartDto.productId,
        updateShoppingCartDto,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.shoppingCartService.remove(id);
  }
}
