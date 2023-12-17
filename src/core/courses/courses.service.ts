import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConversionService,
  RequestService,
  SystemException,
  isActive,
} from '../../common';
import { Like, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
    private readonly conversionService: ConversionService,
    private readonly requestService: RequestService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    let courseDto: CreateCourseDto = createCourseDto;
    courseDto = this.requestService.forCreate(courseDto);
    const dtoToEntity = await this.conversionService.toEntity<
      CourseEntity,
      CreateCourseDto
    >(courseDto);
    const course = this.coursesRepository.create(dtoToEntity);
    await this.coursesRepository.save(course);
    return this.conversionService.toDto<CourseEntity, CreateCourseDto>(course);
  }

  async findAll(
    page: number,
    limit: number,
    type: number,
    field: string,
    search: string,
    models: string[],
  ): Promise<[CreateCourseDto[], number]> {
    try {
      let condition;
      console.log('sd',type);
      
        switch (type) {
          case 0: //start with search value
            condition = field ? { [field]: Like(search + '%') } : { ...isActive };
            break;
          case 1: //end with search value
            condition = field ? { [field]: Like('%' + search) } : { ...isActive };
            break;
          case 2: //any position
            condition = field ? { [field]: Like('%' + search + '%') } : { ...isActive };
            break;
          default: //find by exact value
            condition = field
              ? { [field]: search }
              : { ...isActive };
            break;
        }
      
      const datas = await this.coursesRepository.findAndCount({
        where: condition,
        relations: models,
        skip: (page - 1) * limit,
        take: limit,
        order: { updatedAt: 'DESC' },
      });

      return this.conversionService.toPagination<CourseEntity, CreateCourseDto>(
        datas,
      );
    } catch (error) {
      throw new SystemException(error);
    }
  }

  async findOne(id: string) {
    const data = await this.coursesRepository.findOne({
      where: {
        id: id,
        ...isActive,
      },
    });
    return this.conversionService.toDto<CourseEntity, CreateCourseDto>(data);
  }
}
