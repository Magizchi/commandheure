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

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    try {
      const product = this.shoppingCartRepository.create(createShoppingCartDto)
      const saved = await this.shoppingCartRepository.save(product)
      return saved
    } catch (err) {
      return `Message: ${err}`
    }
  }

  async findAll() {
    try {
      const shopcart = await this.shoppingCartRepository.find({
        relations: {
          product: true
        }
      })
      return shopcart.map(({ product, id, quantities }) => ({ shoppingCartId: id, quantities, ...product }))
    } catch (err) {
      return `Message: ${err}`
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    try {
      this.shoppingCartRepository.update(id, updateShoppingCartDto)
      return `This action updates a #${id} shoppingCart`;
    } catch (err) {
      throw `Message: ${err}`
    }
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
