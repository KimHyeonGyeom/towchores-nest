import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UndefinedToNullInterceptor } from '../../interceptors/undefinedToNull.interceptor';
import { PostService } from './post.service';
import { ApiOperation } from '@nestjs/swagger';
import { addPostRequestDto } from './dto/addPost.request.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: '게시글 등록' })
  async addPost(
    @Body() body: addPostRequestDto,
    @Request() req,
    @UploadedFiles() files,
  ) {
    await this.postService.addPost({
      user_id: req.token_user_id,
      title: body.title,
      content: body.content,
      latitude: body.latitude,
      longitude: body.longitude,
      area: body.area,
      images: files,
    });
  }
}
