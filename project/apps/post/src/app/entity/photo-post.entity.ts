import { Entity } from '@project/core';
import { PhotoPost, PostStatus, PostType } from '@project/types';

export class PhotoPostEntity implements PhotoPost, Entity<string> {
  public id?: string;
  public userId: string;
  public type: PostType.Photo = PostType.Photo;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public photoPath: string;

  constructor(post: Omit<PhotoPost, 'type'>) {
    this.id = post.id;
    this.userId = post.userId;
    this.status = post.status ?? PostStatus.Published;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.isRepost = post.isRepost ?? false;
    this.originalPostId = post.originalPostId;
    this.originalPostUserId = post.originalPostUserId;
    this.photoPath = post.photoPath;
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
      photoPath: this.photoPath,
    };
  }
}
