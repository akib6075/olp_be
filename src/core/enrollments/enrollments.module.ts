import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { ConversionService, ResponseService, RequestService } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentEntity])],
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService,
    ConversionService,
    ResponseService,
    RequestService,
  ],
})
export class EnrollmentsModule {}
