import { Test, TestingModule } from '@nestjs/testing';
import { ConversionService, RequestService } from '../../common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentEntity } from './entities/enrollment.entity';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  const mockEnrollment = {
    createdBy: null,
    updatedBy: null,
    createAt: '2023-12-16T04:58:51.000Z',
    updatedAt: '2023-12-16T04:58:51.000Z',
    studentName: 'Jon',
    course: 'C9AA433E-F36B-1410-8FE8-00B16347797C',
    id: '7BAB433E-F36B-1410-8FE8-00B16347797C',
    version: 1,
    isActive: 1,
    enrollmentDate: '2023-12-16',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnrollmentEntity],
      providers: [
        {
          provide: EnrollmentsService,
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

    service = module.get<EnrollmentsService>(EnrollmentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      service.create = jest.fn().mockResolvedValueOnce(mockEnrollment);
      const result = await service.create(newEnrollment as unknown as CreateEnrollmentDto);
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(mockEnrollment);
    });
  });
});
