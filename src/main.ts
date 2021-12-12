import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedFilter } from './filter/query-failed.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const port = process.env.PORT || 8080;
  const reflector = app.get(Reflector);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('동네잡일')
    .setDescription('동네잡일 API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new QueryFailedFilter(reflector),
  );

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
  //app.use(bodyParser);
  await app.listen(port);
  console.log(`App listening on the port ${port}`);
}
bootstrap();
