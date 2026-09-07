import { Entity } from '@project/core-repository';
import { PostStatus, PostType, TextPost } from '@project/types';

export class TextPostEntity implements TextPost, Entity<string> {
  public id?: string;
  public userId: string;
  public type: PostType.Text = PostType.Text;
  public status: PostStatus;
  public tags?: string[];
  public createdAt: Date;
  public publishedAt: Date;
  public isRepost: boolean;
  public originalPostId?: string;
  public originalPostUserId?: string;
  public title: string;
  public announcement: string;
  public text: string;

  constructor(post: Omit<TextPost, 'type'>) {
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
    this.announcement = post.announcement;
    this.text = post.text;
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
      announcement: this.announcement,
      text: this.text,
    };
  }
}
