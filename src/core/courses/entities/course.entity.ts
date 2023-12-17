import { CustomBaseEntity } from '../../../common/entities/core/custom-base.entity';
import { EnrollmentEntity } from '../../../core/enrollments/entities/enrollment.entity';
import { AfterUpdate, Column, Entity, Index, OneToMany } from 'typeorm';

@Entity({ name: 'olp_courses', schema: 'dbo' })
@Index('courses-idx', ['id', 'title'])
export class CourseEntity extends CustomBaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false,
    default: 'Invalid Data',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    default: 'Invalid Data',
    length: 2000,
  })
  description: string;

  @Column({
    name: 'instructor',
    type: 'varchar',
    nullable: false,
    default: 'Invalid Data',
  })
  instructor: string;

  @Column({ name: 'duration', type: 'int', nullable: false, default: 0 })
  duration: number;

  @Column({ name: 'price', type: 'float', nullable: false, default: 0.0 })
  price: number;

  @Column({
    name: 'price_type',
    type: 'varchar',
    nullable: false,
    default: 'USD',
  })
  priceType: string;

  @Column({
    name: 'total_enrollments',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  totalEnrollments: number;

  @OneToMany(
    () => EnrollmentEntity,
    (enrollmentEntity) => enrollmentEntity.course,
  )
  enrollments: EnrollmentEntity[];
}
