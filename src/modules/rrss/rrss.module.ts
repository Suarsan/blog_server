import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RrssConnection, RrssType } from './entities';
import { RrssResolver } from './rrss.resolver';
import { RrssService } from './rrss.service';
import { ApiTwitterService } from './api-twitter.service';
import { AuthorsModule } from '../authors/authors.module';
import { ApiTwitterController } from './api-twitter.controller';

@Module({
  imports: [
    HttpModule,
    AuthorsModule,
    TypeOrmModule.forFeature([
      RrssType,
      RrssConnection
    ])
  ],
  controllers: [
    ApiTwitterController
  ],
  providers: [
    ApiTwitterService,
    RrssResolver,
    RrssService
  ],
})
export class RrssModule {}
