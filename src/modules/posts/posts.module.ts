import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Analysis,
      Paragraph,
      Post,
      Type,
      HtmlTag,
      Tag
    ])
  ],
  providers: [
    PostsService,
    PostsResolver
  ]
})
export class PostsModule {}
