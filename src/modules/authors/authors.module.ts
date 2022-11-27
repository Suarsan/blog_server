import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { ContextsService } from './contexts.service';
import { Author, Context } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Context
    ])
  ],
  providers: [
    AuthorsResolver,
    AuthorsService,
    ContextsService
  ],
  exports: [
    AuthorsService
  ]
})
export class AuthorsModule {}
