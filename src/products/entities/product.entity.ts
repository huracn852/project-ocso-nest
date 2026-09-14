import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
