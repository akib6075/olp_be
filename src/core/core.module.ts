import { Module } from "@nestjs/common";
import { configEnvironment, configTypeorm } from "src/common";
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
	imports: [
		configEnvironment(),
		configTypeorm(),
		CoursesModule,
		EnrollmentsModule,
    ],
	providers: [],
	controllers: [],
	exports: [],
})
export class CoreModule {}