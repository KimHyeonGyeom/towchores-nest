import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from '../entities/Images';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
