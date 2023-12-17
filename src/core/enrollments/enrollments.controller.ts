import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../../common/services/response.service';

@ApiTags("Enrollments")
@Controller('v1/enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService,private readonly responseService: ResponseService) {}
  @ApiOkResponse({
    type: CreateEnrollmentDto,
    status: HttpStatus.OK,
    description: 'New enrollment created'
  })
  @ApiOperation({ summary: 'Create a new enrollment', description: 'Create a new enrollment' })
  
  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    const data = this.enrollmentsService.create(createEnrollmentDto);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'Successful',
      data,
    );
  }
}
