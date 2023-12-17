import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigModule } from './common/database-config/database.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './common';

@Module({
  imports: [TypeormConfigModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
