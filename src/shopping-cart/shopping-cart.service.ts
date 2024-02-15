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
      const productInShoppingCart = await this.shoppingCartRepository.findOne({
        where: {
          productId: createShoppingCartDto.productId
        }
      })
      if (productInShoppingCart) {
        const { id, productId } = productInShoppingCart
        return this.update(id, productId, createShoppingCartDto)
      }
      const product = this.shoppingCartRepository.create(createShoppingCartDto)
      const saved = await this.shoppingCartRepository.save(product)
      const p = await this.shoppingCartRepository.findOne({ where: { id: saved.id }, relations: { product: true } })
      return { message: 'Produit ajouter au panier', product: { ...p.product, quantity: p.quantity } }
    } catch (err) {
      return `Message: ${err}`
    }
  }

  async FindProductsInShoppingCart(search?) {
    try {
      const shopcart = await this.shoppingCartRepository.find({
        relations: {
          product: true
        },
        order: { id: search ? 'DESC' : 'ASC' },
        take: search
      })
      if (search) {
        return shopcart
          .map((item) => ({ key: item.id, quantity: item.quantity, ...item.product }))
          .sort((a, b) => {
            if (a.key < b.key) return -1
            if (a.key > b.key) return 1
            return 1
          })
      }
      return shopcart.map((item) => ({ key: item.id, quantity: item.quantity, ...item.product }))
    } catch (err) {
      return `Message: ${err}`
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  async update(id: number, productId: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    try {
      const product = this.shoppingCartRepository.create(updateShoppingCartDto)
      await this.shoppingCartRepository.update(id, product)
      return { message: `This action updates a #${id} shoppingCart`, product: { id: productId, ...updateShoppingCartDto } }
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

  async getExcelFile() {
    const product = await this.FindProductsInShoppingCart()
    return product
  }
}
