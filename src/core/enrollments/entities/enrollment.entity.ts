
import { CustomBaseEntity } from '../../../common/entities/core/custom-base.entity';
import { CourseEntity } from '../../../core/courses/entities/course.entity';
import {
  AfterInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity({ name: 'olp_enrollments', schema: 'dbo' })
@Index('enrollments-idx', ['id'])
@Unique(['studentName', 'course'])
export class EnrollmentEntity extends CustomBaseEntity {
  @Column({
    name: 'student_name',
    type: 'varchar',
    nullable: false,
    default: 'Invalid Data',
  })
  studentName: string;

  @Column({
    name: 'enrollment_date',
    type: 'date',
    nullable: false,
    default: () => 'GETDATE()',
  })
  enrollmentDate: Date;

  @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.enrollments, {
    nullable: false,
  })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @AfterInsert()
  async updateCourse() {
    let id = this?.course;
    const course = await CourseEntity.findOne({
        where: {
            id: String(id),
            isActive: 1,
        }
    });
    if (course) {
      course.totalEnrollments = Number(course?.totalEnrollments) + 1;
      await CourseEntity.save(course);
    }
  }
}
