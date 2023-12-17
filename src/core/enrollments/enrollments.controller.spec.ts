import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from '../../common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

describe('EnrollmentsController', () => {
  let controller: EnrollmentsController;
  let enrollmentsService: EnrollmentsService;
  let mockResponseService: ResponseService;

  const mockEnrollment = {
    nonce: 1702702731273,
    status: 200,
    message: 'Successful',
    error: null,
    payload: {
      count: 1,
      data: {
        createdBy: null,
        updatedBy: null,
        createAt: '2023-12-16T04:58:51.000Z',
        updatedAt: '2023-12-16T04:58:51.000Z',
        studentName: 'Ahmed',
        course: 'C9AA433E-F36B-1410-8FE8-00B16347797C',
        id: '7BAB433E-F36B-1410-8FE8-00B16347797C',
        version: 1,
        isActive: 1,
        enrollmentDate: '2023-12-16',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentsController],
      providers: [
        {
          provide: EnrollmentsService,
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
    enrollmentsService = module.get<EnrollmentsService>(EnrollmentsService);
    controller = module.get<EnrollmentsController>(EnrollmentsController);
    mockResponseService = module.get<ResponseService>(ResponseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for defined controller
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new enrollment', async () => {
      const newEnrollment = {
        studentName: 'Ahmed',
        course: {
          title: 'Nodejs',
          description: 'Web development',
          instructor: 'Javed',
          duration: 10,
          price: 29.99,
          priceType: 'USD',
        },
      };

      enrollmentsService.create = jest
        .fn()
        .mockResolvedValueOnce(mockEnrollment);
      mockResponseService.toDtoResponse = jest
        .fn()
        .mockReturnValue(mockEnrollment);

      const result = await controller.create(
        newEnrollment as unknown as CreateEnrollmentDto,
      );
      
      expect(enrollmentsService.create).toHaveBeenCalled();
      expect(mockResponseService.toDtoResponse).toHaveBeenCalled();
      expect(result).toEqual(mockEnrollment);
    });
  });
});
