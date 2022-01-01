import {
  Body,
  Controller,
  Get,
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
    const post = await this.postService.addPost({
      user_id: req.token_user_id,
      title: body.title,
      content: body.content,
      latitude: body.latitude,
      longitude: body.longitude,
      area: body.area,
      images: files,
      hashtags: body.hashtags as Array<any>,
    });

    return { post: post };
  }

  @Get('/')
  @ApiOperation({ summary: '게시글 상세조회' })
  async getPost(@Query() query, @Request() req) {
    const post = await this.postService.getPost({
      post_id: query.post_id,
      user_id: req.token_user_id,
    });

    return { post: post };
  }
}
