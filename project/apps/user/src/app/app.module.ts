import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserConfigModule } from '@project/core-user-config';
@Module({
  imports: [UserConfigModule, AuthenticationModule],
  controllers: [],
})
export class AppModule {}
