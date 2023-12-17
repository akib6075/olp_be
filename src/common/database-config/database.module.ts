
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../../core/courses/entities/course.entity';
import { EnrollmentEntity } from '../../core/enrollments/entities/enrollment.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('MSSQL_HOST'),
        port: +configService.get<number>('MSSQL_PORT'),
        username: configService.get<string>('MSSQL_USER'),
        password: configService.get<string>('MSSQL_PASSWORD'),
        database: configService.get<string>('MSSQL_DATABASE'),
        schema: configService.get<string>('DATABASE_SCHEMA'),
        requestTimeout: 5000,
        extra: {
          trustServerCertificate: true,
        },
        options: {
          encrypt: false,
        },
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
        entities: [
          CourseEntity,
          EnrollmentEntity
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormConfigModule {}
