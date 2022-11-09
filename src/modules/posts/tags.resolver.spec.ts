import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedTags } from 'src/mock/tags.mock';
import { DataSourceOptions } from 'typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { PostsModule } from './posts.module';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

describe('TagsResolver', () => {
  let tagsResolver: TagsResolver;
  let tagsService: TagsService;

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
      providers: [TagsResolver, TagsService],
    }).compile();

    tagsResolver = module.get<TagsResolver>(TagsResolver);
    tagsService = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(tagsResolver).toBeDefined();
  });

  it('should return an array of tags', async () => {
    const result = new Promise<Array<Tag>>((res, rej) => res(mockedTags));
    let response = await tagsResolver.getTags();
    response = cleanTimestamps(response) as Array<Tag>;
    expect(instanceToPlain(response)).toStrictEqual(await result);
  });

});

function cleanTimestamps(input: Tag | Array<Tag>): Tag | Array<Tag> {
  let tags = Array.isArray(input) ? [...input] : [input];
  tags.forEach(r => {
      delete r.createdAt;
      delete r.updatedAt;
      
  });
  return tags.length > 1 ? tags : tags[0];
}
