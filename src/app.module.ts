import { Module } from '@nestjs/common';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { SharedModule } from './nest-modules/shared-module/shared.module';
import { AuthModule } from './nest-modules/auth-module/auth-module.module';
import { CastMembersModule } from './nest-modules/cast-members-module/cast-members.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CategoriesModule,
    SharedModule,
    AuthModule,
    CastMembersModule
  ]
})
export class AppModule { }