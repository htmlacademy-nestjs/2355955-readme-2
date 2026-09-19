import { BaseMongoRepository } from '@project/core-repository';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user-model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    super(userModel, UserEntity.fromObject);
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.userModel.findOne({ email }).exec();
    if (!document) {
      return null;
    }
    return this.createEntityFromDocument(document);
  }
}
