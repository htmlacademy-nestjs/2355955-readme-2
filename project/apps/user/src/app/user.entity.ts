import { AuthUser } from '@project/types';
import { Entity } from '@project/core-repository';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public avatarPath?: string;
  public passwordHash: string;
  public createdAt: Date;

  constructor(user: AuthUser) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatarPath = user.avatarPath;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      avatarPath: this.avatarPath,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
