import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class UpdateCatDto extends PartialType(CreateCatDto) {
    @IsString()
    @MinLength(5)
    name: string;
    @IsInt()
    @IsPositive()
    age: number;
    @IsOptional()
    @IsString()
    breed?: string;


}
