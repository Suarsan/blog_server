import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedHtmlTags } from 'src/mock/html-tags.mock';
import { DataSourceOptions } from 'typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { HtmlTagsResolver } from './htmlTags.resolver';
import { HtmlTagsService } from './htmlTags.service';
import { PostsModule } from './posts.module';

describe('HtmlTagsResolver', () => {
  let htmlTagsResolver: HtmlTagsResolver;
  let htmlTagsService: HtmlTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostsModule,
        AuthorsModule,
        TypeOrmModule.forRootAsync({
            async useFactory() {
                const dbConfig = {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'admin',
                    password: 'my-weak-password',
                    database: 'blog_lavera',
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: true
                } as DataSourceOptions;
                return dbConfig;
            }
        }),
        TypeOrmModule.forFeature([
            HtmlTag,
            Analysis,
            Paragraph,
            Post,
            Type,
            HtmlTag,
            Tag,
            Author
        ])
      ],
      providers: [HtmlTagsResolver, HtmlTagsService],
    }).compile();

    htmlTagsResolver = module.get<HtmlTagsResolver>(HtmlTagsResolver);
    htmlTagsService = module.get<HtmlTagsService>(HtmlTagsService);
  });

  it('should be defined', () => {
    expect(htmlTagsResolver).toBeDefined();
  });

  it('should return an array of html tags', async () => {
    const result = new Promise<Array<HtmlTag>>((res, rej) => res(mockedHtmlTags));
    let response = await htmlTagsResolver.getHtmlTags();
    response = cleanTimestamps(response) as Array<HtmlTag>;
    expect(instanceToPlain(response)).toStrictEqual(await result);
  });

});

function cleanTimestamps(input: HtmlTag | Array<HtmlTag>): HtmlTag | Array<HtmlTag> {
  let htmlTags = Array.isArray(input) ? [...input] : [input];
  htmlTags.forEach(r => {
      delete r.createdAt;
      delete r.updatedAt;
      
  });
  return htmlTags.length > 1 ? htmlTags : htmlTags[0];
}
