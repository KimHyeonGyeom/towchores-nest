import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { Users } from './entities/Users';
import {
  I18nModule,
  I18nJsonParser,
  HeaderResolver,
  QueryResolver,
  AcceptLanguageResolver,
  CookieResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { RedisModule } from '@pokeguys/nestjs-redis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),

    RedisModule.forRoot({ uri: process.env.REDIS_URI }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users],
      charset: 'utf8mb4',
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([Users]),
    I18nModule.forRoot({
      //nest-cli.json 파일에서 "watchAssets": true 추가해줘야만 consts.json에서 새로운 key를 추가할 때 dist 파일과 동기화가 됨.
      fallbackLanguage: 'ko',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true, //서버를 다시시작 하지 않고 변경된 key value 값을 가져올 수 있다.
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
