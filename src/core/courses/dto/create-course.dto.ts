import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, IsNumber } from "class-validator";
import { BaseDto } from "../../../common/dto/core/base.dto";
import { CreateEnrollmentDto } from "../../../core/enrollments/dto/create-enrollment.dto";

export class CreateCourseDto extends BaseDto {
    @ApiProperty()
    @IsString({ message: 'Title must be string' })
    @IsNotEmpty({ message: 'Ttile can not be empty' })
    @MaxLength(255, { message: 'Character limit exceeded' })
    title: string;
  
    @ApiProperty()
    @IsString({ message: 'Description must be string' })
    @IsNotEmpty({ message: 'Description can not be empty' })
    @MaxLength(2000, { message: 'Character limit exceeded' })
    description: string;
  
    @ApiProperty()
    @IsString({ message: 'Instructor must be string' })
    @IsNotEmpty({ message: 'Instructor can not be empty' })
    @MaxLength(255, { message: 'Character limit exceeded' })
    instructor: string;
  
    @ApiProperty()
    @IsNumber({maxDecimalPlaces: 0})
    @IsNotEmpty({ message: 'Duration can not be empty' })
    duration: number;
  
    @ApiProperty()
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty({ message: 'Price can not be empty' })
    price: number;

    @ApiProperty()
    @IsString({ message: 'Price type must be string' })
    @IsNotEmpty({ message: 'Price type can not be empty' })
    priceType: string;

    @Type(() => CreateEnrollmentDto)
    enrollments: CreateEnrollmentDto[];
}
