import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuidv4(),
      productName: "Sabritas Normal 48g",
      price: 29,
      countSeal: 3,
      provider: uuidv4(),
    }, 
    {
      productId: uuidv4(),
      productName: " Coca cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuidv4(),    
    },
    {
      productId: uuidv4(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuidv4(),
    }
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuidv4();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.productId === id)[0];
    if (!productFound) throw new NotFoundException();
    return productFound;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.provider === id);
    if (productFound.length === 0) throw new NotFoundException();
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productFound = this.findOne(id)
    
    return {
      ...productFound,
      ...updateProductDto
    };

  }

  remove(id: string) {
    const { productId } = this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== productId);
    return this.products;
  }
}
