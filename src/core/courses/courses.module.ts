import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CourseEntity } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionService, RequestService, ResponseService } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    ConversionService,
    ResponseService,
    RequestService,
  ],
})
export class CoursesModule {}
