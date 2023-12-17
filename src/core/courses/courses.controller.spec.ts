import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ResponseService } from '../../common';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CoursesController', () => {
  let controller: CoursesController;
  let courseService: CoursesService;
  let mockResponseService: ResponseService;

  const mockCourse = {
    nonce: 1702714051088,
    status: 200,
    message: 'Successful',
    error: null,
    payload: {
      count: 1,
      data: {
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
      },
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ResponseService,
          useValue: {
            toDtoResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    courseService = module.get<CoursesService>(CoursesService);
    controller = module.get<CoursesController>(CoursesController);
    mockResponseService = module.get<ResponseService>(ResponseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      courseService.create = jest
        .fn()
        .mockResolvedValueOnce(mockCourse);
      mockResponseService.toDtoResponse = jest
        .fn()
        .mockReturnValue(mockCourse);

      const result = await controller.create(
        newCourse as unknown as CreateCourseDto,
      );

      expect(courseService.create).toHaveBeenCalled();
      expect(mockResponseService.toDtoResponse).toHaveBeenCalled();
      expect(result).toEqual(mockCourse);
    });
  });
});
