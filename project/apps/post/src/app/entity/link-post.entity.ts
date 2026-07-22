import { Entity } from '@project/core';
import { LinkPost, PostStatus, PostType } from '@project/types';

export class LinkPostEntity implements LinkPost, Entity<string> {
  public id?: string;
  public userId: string;
  public type: PostType.Link = PostType.Link;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public link: string;
  public description?: string;

  constructor(post: Omit<LinkPost, 'type'>) {
    this.id = post.id;
    this.userId = post.userId;
    this.status = post.status ?? PostStatus.Published;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.isRepost = post.isRepost ?? false;
    this.originalPostId = post.originalPostId;
    this.originalPostUserId = post.originalPostUserId;
    this.link = post.link;
    this.description = post.description;
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
      link: this.link,
      description: this.description,
    };
  }
}
