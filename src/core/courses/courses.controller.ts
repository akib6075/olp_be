import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IntValidationPipe, ResponseService, UuidValidationPipe } from '../../common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
@ApiTags('Courses')
@Controller('v1/courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly responseService: ResponseService,
  ) {}
  @ApiOkResponse({
    type: CreateCourseDto,
    status: HttpStatus.OK,
    description: 'New course created'
  })
  @ApiOperation({ summary: 'Create a new course', description: 'Put all the valid fields to create a new course' })
  
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    const data = this.coursesService.create(createCourseDto);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'Successful',
      data,
    );
  }
  @ApiQuery({
    name: 'type',
    type: Number,
    required: false
  })
  @ApiQuery({
    name: 'field',
    type: String,
    required: false
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false
  })
  @ApiQuery({
    name: 'models',
    type: [String],
    required: false
  })
  @ApiOkResponse({
    type: [CreateCourseDto],
    status: HttpStatus.OK,
    description: 'List of courses with pagination information'
  })
  @ApiOperation({ summary: 'Get all courses', description: 'Param type value: 0 for start with, 1 for end with, 2 for any position and 3 for exact value retrival. There is no model associated with this table so keep it empty!' })
  @Get()
  findAll(
    @Query('page', new IntValidationPipe) page: number,
    @Query('limit', new IntValidationPipe) limit: number,
    @Query('type') type: number,
    @Query('field') field: string,
    @Query('search') search: string,
    @Query('models') models: string[],
  ) {
    const datas = this.coursesService.findAll(page,limit,type,field,search,models);
    return this.responseService.toPaginationResponse(
      HttpStatus.OK,
      "Successful",
      page,
      limit,
      datas
    );
  }

  @ApiOkResponse({
    type: CreateCourseDto,
    status: HttpStatus.OK,
    description: 'Courses information by id'
  })
  @ApiOperation({ summary: 'Get course by id', description: 'Add valid uuid to retrive course' })
  
  @Get(':id')
  findOne(@Param('id', new UuidValidationPipe) id: string) {
    const data = this.coursesService.findOne(id);
    return this.responseService.toDtoResponse(
      HttpStatus.OK,
      'Successful',
      data,
    );
  }
}
