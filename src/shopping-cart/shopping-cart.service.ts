import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>
  ) { }

  create(createShoppingCartDto: CreateShoppingCartDto) {
    try {
      const product = this.shoppingCartRepository.create(createShoppingCartDto)
      this.shoppingCartRepository.save(product)
      return 'This action adds a new shoppingCart';
    } catch (err) {
      return `Message: ${err}`
    }
  }

  async findAll() {
    try {
      const productsJoinShoppingCart = await this.shoppingCartRepository.find({
        relations: {
          product: true
        }
      })
      const products = productsJoinShoppingCart.map((item) => ({ ...item.product, quantities: item.quantities }))
      return products

    } catch (err) {
      return `Message: ${err}`
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
