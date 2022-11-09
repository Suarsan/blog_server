import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { HtmlTagsResolver } from './htmlTags.resolver';
import { HtmlTagsService } from './htmlTags.service';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';

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
    PostsResolver,
    HtmlTagsResolver,
    HtmlTagsService,
    TypesResolver,
    TypesService,
    TagsResolver,
    TagsService
  ]
})
export class PostsModule {}
