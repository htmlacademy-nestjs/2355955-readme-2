import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { fillDto } from '@project/helpers';
import { PostStatus, PostType } from '@project/types';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entity/post-entity.type';
import { VideoPostEntity } from './entity/video-post.entity';
import { TextPostEntity } from './entity/text-post.entity';
import { QuotePostEntity } from './entity/quote-post.entity';
import { PhotoPostEntity } from './entity/photo-post.entity';
import { LinkPostEntity } from './entity/link-post.entity';
import { VideoPostRdo } from './rdo/video-post.rdo';
import { TextPostRdo } from './rdo/text-post.rdo';
import { QuotePostRdo } from './rdo/quote-post.rdo';
import { PhotoPostRdo } from './rdo/photo-post.rdo';
import { LinkPostRdo } from './rdo/link-post.rdo';
import {
  CANNOT_REPOST_OWN_POST,
  POST_ALREADY_REPOSTED,
  POST_NOT_FOUND,
  STUB_REPOSTER_USER_ID,
  STUB_USER_ID,
} from './post.constant';
import dayjs from 'dayjs';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostDto): Promise<PostEntity> {
    const entity = this.createEntity(dto);
    return this.postRepository.save(entity);
  }

  public async getPost(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    return post;
  }

  public async getPosts(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.getPost(id);
    Object.assign(post, dto);
    return this.postRepository.update(id, post);
  }

  public async deletePost(id: string): Promise<void> {
    await this.getPost(id);
    await this.postRepository.deleteById(id);
  }

  public async repost(
    postId: string,
    userId: string = STUB_REPOSTER_USER_ID,
  ): Promise<PostEntity> {
    const original = await this.getPost(postId);

    if (original.userId === userId) {
      throw new BadRequestException(CANNOT_REPOST_OWN_POST);
    }

    const existingRepost = await this.findRepostByUser(userId, postId);

    if (existingRepost) {
      throw new ConflictException(POST_ALREADY_REPOSTED);
    }

    const entity = this.createRepostEntity(original, userId);
    return this.postRepository.save(entity);
  }

  public toRdo(post: PostEntity) {
    const pojo = post.toPOJO();

    switch (post.type) {
      case PostType.Video:
        return fillDto(VideoPostRdo, pojo);
      case PostType.Text:
        return fillDto(TextPostRdo, pojo);
      case PostType.Quote:
        return fillDto(QuotePostRdo, pojo);
      case PostType.Photo:
        return fillDto(PhotoPostRdo, pojo);
      case PostType.Link:
        return fillDto(LinkPostRdo, pojo);
      default:
        throw new BadRequestException('Unknown post type');
    }
  }

  private async findRepostByUser(
    userId: string,
    originalPostId: string,
  ): Promise<PostEntity | null> {
    const posts = await this.postRepository.findAll();

    return (
      posts.find(
        (post) =>
          post.userId === userId && post.originalPostId === originalPostId,
      ) ?? null
    );
  }

  private createEntity(dto: CreatePostDto): PostEntity {
    const now = dayjs().toDate();
    const base = {
      userId: STUB_USER_ID,
      status: PostStatus.Published,
      tags: dto.tags,
      createdAt: now,
      publishedAt: now,
      isRepost: false,
    };

    switch (dto.type) {
      case PostType.Video:
        return new VideoPostEntity({
          ...base,
          title: dto.title!,
          videoUrl: dto.videoUrl!,
        });
      case PostType.Text:
        return new TextPostEntity({
          ...base,
          title: dto.title!,
          announcement: dto.announcement!,
          text: dto.text!,
        });
      case PostType.Quote:
        return new QuotePostEntity({
          ...base,
          quote: dto.quote!,
          author: dto.author!,
        });
      case PostType.Photo:
        return new PhotoPostEntity({
          ...base,
          photoPath: dto.photoPath!,
        });
      case PostType.Link:
        return new LinkPostEntity({
          ...base,
          link: dto.link!,
          description: dto.description,
        });
      default:
        throw new BadRequestException('Unknown post type');
    }
  }

  private createRepostEntity(
    original: PostEntity,
    userId: string,
  ): PostEntity {
    const now = dayjs().toDate();
    const base = {
      userId,
      status: PostStatus.Published,
      tags: original.tags,
      createdAt: now,
      publishedAt: now,
      isRepost: true,
      originalPostId: original.id,
      originalPostUserId: original.userId,
    };

    switch (original.type) {
      case PostType.Video:
        return new VideoPostEntity({
          ...base,
          title: original.title,
          videoUrl: original.videoUrl,
        });
      case PostType.Text:
        return new TextPostEntity({
          ...base,
          title: original.title,
          announcement: original.announcement,
          text: original.text,
        });
      case PostType.Quote:
        return new QuotePostEntity({
          ...base,
          quote: original.quote,
          author: original.author,
        });
      case PostType.Photo:
        return new PhotoPostEntity({
          ...base,
          photoPath: original.photoPath,
        });
      case PostType.Link:
        return new LinkPostEntity({
          ...base,
          link: original.link,
          description: original.description,
        });
      default:
        throw new BadRequestException('Unknown post type');
    }
  }
}
