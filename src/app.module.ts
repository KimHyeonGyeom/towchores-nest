import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { Users } from './entities/Users';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_TYPE as any,
    //   host: process.env.DB_HOST,
    //   port: process.env.DB_PORT as any,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [Users],
    //   charset: 'utf8mb4',
    //   synchronize: false,
    //   logging: true,
    //   keepConnectionAlive: true,
    // }),
    UserModule,
    //TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
