import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDto } from '../../../common/dto/core/base.dto';
import { CreateCourseDto } from '../../../core/courses/dto/create-course.dto';

export class CreateEnrollmentDto extends BaseDto {
  @ApiProperty()
  @IsString({ message: 'Student name must be string' })
  @IsNotEmpty({ message: 'Student name can not be empty' })
  @MaxLength(255, { message: 'Character limit exceeded' })
  studentName: string;

  @ApiProperty({
    type: String,
    description: 'Must be valid course id',
  })
  @Type(()=>CreateCourseDto)
  course: CreateCourseDto;
}
