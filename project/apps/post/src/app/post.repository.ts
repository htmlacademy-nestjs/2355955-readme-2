import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/core-repository';
import { PostEntity } from './entity/post-entity.type';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  public async findAll(): Promise<PostEntity[]> {
    return Array.from(this.entities.values());
  }
}
