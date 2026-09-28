import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';
import { join } from 'path';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ length: 40 })
  productName: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  countSeal: number;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({
    name: 'providerId',
  })
  provider: Provider;
}
