import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { ConversionService, RequestService } from '../../common';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  const mockCourse = {
    createdBy: null,
    updatedBy: null,
    createdAt: '2023-12-16T08:07:31.000Z',
    updatedAt: '2023-12-16T08:07:31.000Z',
    title: 'English speaking',
    description: 'IELTS band 7',
    instructor: 'Rashed',
    duration: 33,
    price: 34.9,
    id: '7FAB433E-F36B-1410-8FE8-00B16347797C',
    version: 1,
    isActive: 1,
    priceType: 'USD',
    totalEnrollments: 0,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CourseEntity],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ConversionService,
          useValue: {
            toDto: jest.fn(),
            toEntity: jest.fn(),
          },
        },
        {
          provide: RequestService,
          useValue: {
            forCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const newCourse = {
        title: 'English speaking',
        description: 'IELTS band 7',
        instructor: 'Rashed',
        duration: 33,
        price: 34.9,
      };

      service.create = jest.fn().mockResolvedValueOnce(mockCourse);
      const result = await service.create(newCourse as unknown as CreateCourseDto);
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(mockCourse);
    });
  });
});
