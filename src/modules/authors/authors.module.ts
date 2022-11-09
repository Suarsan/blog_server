import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContextsModule } from '../contexts/contexts.module';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { Author } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author
    ]),
    ContextsModule
  ],
  providers: [
    AuthorsResolver,
    AuthorsService
  ]
})
export class AuthorsModule {}
