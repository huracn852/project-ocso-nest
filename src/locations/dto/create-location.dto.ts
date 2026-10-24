import { ArrayNotEmpty, IsArray, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Region } from '../../regions/entities/region.entity';


export class CreateLocationDto {


    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsUUID()
    @IsOptional()
    region: Region;
    @IsUUID()
    @IsOptional()
    managerId?: string;
}