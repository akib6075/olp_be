import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { ConversionService } from '../../common/services/conversion.service';
import { RequestService } from '../../common/services/request.service';
import { SystemException } from '../../common/exceptions/system.exception';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly coursesRepository: Repository<EnrollmentEntity>,
    private readonly conversionService: ConversionService,
    private readonly requestService: RequestService,
  ) {}
  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<CreateEnrollmentDto> {
    try {
      let enrollmentDto: CreateEnrollmentDto = createEnrollmentDto;
      enrollmentDto = this.requestService.forCreate(enrollmentDto);
      const dtoToEntity = await this.conversionService.toEntity<
        EnrollmentEntity,
        CreateEnrollmentDto
      >(enrollmentDto);
      const enrollment = this.coursesRepository.create(dtoToEntity);
      await this.coursesRepository.save(enrollment);
      return this.conversionService.toDto<
        EnrollmentEntity,
        CreateEnrollmentDto
      >(enrollment);
    } catch (error) {
      throw new SystemException(error);
    }
  }
}
