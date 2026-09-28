import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  providerId: string;

  @Column({ type: 'text' })
  providerName: string;

  @Column({ type: 'text' })
  providerEmail: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  providerPhoneNumber?: string | null;

  @OneToMany(() => Product, (product) => product.provider)
  products: Product[];
}
