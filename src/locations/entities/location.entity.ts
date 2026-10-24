import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Location {

    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "Ocso juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Calle 1, Juriquilla, Qro"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [20.123456, -100.123456]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({ default: "8r5fv-8rfd5s-9w6s-7t4v1" })
    @OneToOne(() => Manager, (manager) => manager.location, {
        eager: true,
        nullable: true,
    })
    manager: Manager | string;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
