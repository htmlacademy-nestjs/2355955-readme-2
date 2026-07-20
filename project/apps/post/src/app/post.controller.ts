import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { VideoPostRdo } from './rdo/video-post.rdo';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
    type: VideoPostRdo,
  })
  @Post()
  public async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto);
    return this.postService.toRdo(post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts list',
    type: [VideoPostRdo],
  })
  @Get()
  public async index() {
    const posts = await this.postService.getPosts();
    return posts.map((post) => this.postService.toRdo(post));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post found',
    type: VideoPostRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return this.postService.toRdo(post);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post has been successfully reposted.',
    type: VideoPostRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot repost own post',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Post already reposted',
  })
  @Post(':id/repost')
  public async repost(@Param('id') id: string) {
    const post = await this.postService.repost(id);
    return this.postService.toRdo(post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post has been successfully updated.',
    type: VideoPostRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const post = await this.postService.updatePost(id, dto);
    return this.postService.toRdo(post);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteById(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}
