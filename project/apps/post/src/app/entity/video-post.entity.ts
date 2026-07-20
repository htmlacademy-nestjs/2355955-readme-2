import { Entity } from '@project/core';
import { PostStatus, PostType, VideoPost } from '@project/types';

export class VideoPostEntity implements VideoPost, Entity<string> {
  public id?: string;
  public userId: string;
  public type: PostType.Video = PostType.Video;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public title: string;
  public videoUrl: string;

  constructor(post: Omit<VideoPost, 'type'>) {
    this.id = post.id;
    this.userId = post.userId;
    this.status = post.status ?? PostStatus.Published;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.isRepost = post.isRepost ?? false;
    this.originalPostId = post.originalPostId;
    this.originalPostUserId = post.originalPostUserId;
    this.title = post.title;
    this.videoUrl = post.videoUrl;
  }

  public toPOJO() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      status: this.status,
      tags: this.tags,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
      isRepost: this.isRepost,
      originalPostId: this.originalPostId,
      originalPostUserId: this.originalPostUserId,
      title: this.title,
      videoUrl: this.videoUrl,
    };
  }
}
