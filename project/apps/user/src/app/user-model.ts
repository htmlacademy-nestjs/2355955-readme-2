import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public lastname!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Prop({
    required: true,
  })
  public createdAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
