import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';

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
  provider: Provider;
}
