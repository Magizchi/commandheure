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
      const foundedProduct = await this.shoppingCartRepository.findOne({
        where: {
          productId: createShoppingCartDto.productId
        }
      })
      if (foundedProduct) {
        const { id } = foundedProduct
        return this.update(id, createShoppingCartDto)
      }
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

      return shopcart
    } catch (err) {
      return `Message: ${err}`
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  async update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    try {
      const product = this.shoppingCartRepository.create(updateShoppingCartDto)
      await this.shoppingCartRepository.update(id, product)
      return `This action updates a #${id} shoppingCart`;
    } catch (err) {
      throw `Message: ${err}`
    }
  }

  remove(id: number) {
    try {
      this.shoppingCartRepository.delete(id)
      return `${id} supprimer`
    } catch (err) {
      return 'Erreur Server'
    }
  }
}
