import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from '../../entities/Images';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  providers: [ImageService, ImageRepository],
  controllers: [ImageController],
})
export class ImageModule {}
