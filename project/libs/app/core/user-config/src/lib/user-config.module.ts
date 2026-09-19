import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from './get-mongoose-options';
import appConfig from './app.config';
import mongoConfig from './mongo.config';
const ENV_USERS_FILE_PATH = 'apps/user/user.env';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_USERS_FILE_PATH,
      cache: true,
      load: [appConfig, mongoConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class UserConfigModule {}
