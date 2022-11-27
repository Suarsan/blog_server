import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { AnalysisResolver } from './analysis.resolver';
import { AnalysisService } from './analysis.service';
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
    ]),
    AuthorsModule
  ],
  providers: [
    PostsService,
    PostsResolver,
    HtmlTagsResolver,
    HtmlTagsService,
    TypesResolver,
    TypesService,
    TagsResolver,
    TagsService,
    AnalysisResolver,
    AnalysisService
  ]
})
export class PostsModule {}
