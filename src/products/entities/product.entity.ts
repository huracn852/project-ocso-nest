import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';
@Entity(
)
export class Product {
    
       
        @PrimaryGeneratedColumn('uuid')
        productId: string;
        @Column({ length: 40 })
        productName: string;
        @Column({ type: 'float' })
        price: number;
        @Column({ type: 'int' })
        countSeal: number;
        //@Column({ type: 'uuid' })
        //provider: string;
        @ManyToOne(() => Provider, (provider) => provider.products)
        provider: Provider;
}
