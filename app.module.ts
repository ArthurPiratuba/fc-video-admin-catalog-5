import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/nest-modules/auth-module/auth-module.module';
import { CastMembersModule } from 'src/nest-modules/cast-members-module/cast-members.module';
import { CategoriesModule } from 'src/nest-modules/categories-module/categories.module';
import { DatabaseModule } from 'src/nest-modules/database-module/database.module';
import { SharedModule } from 'src/nest-modules/shared-module/shared.module';

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
