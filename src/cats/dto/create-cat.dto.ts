import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {

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
