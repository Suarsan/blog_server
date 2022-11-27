import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedTypes } from 'src/mock/types.mock';
import { DataSourceOptions } from 'typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { PostsModule } from './posts.module';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';

describe('AnalysisResolver', () => {
  let typesResolver: TypesResolver;
  let typesService: TypesService;

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
      providers: [TypesResolver, TypesService],
    }).compile();

    typesResolver = module.get<TypesResolver>(TypesResolver);
    typesService = module.get<TypesService>(TypesService);
  });

  // it('should be defined', () => {
  //   expect(typesResolver).toBeDefined();
  //   expect(typesService).toBeDefined();
  // });

  // it('should return an array of types', async () => {
  //   const result = new Promise<Array<Type>>((res, rej) => res(mockedTypes));
  //   let response = await typesResolver.getPostTypes();
  //   response = cleanTimestamps(response) as Array<Type>;
  //   expect(instanceToPlain(response)).toStrictEqual(await result);
  // });

});

function cleanTimestamps(input: Type | Array<Type>): Type | Array<Type> {
  let types = Array.isArray(input) ? [...input] : [input];
  types.forEach(r => {
      delete r.createdAt;
      delete r.updatedAt;
      
  });
  return types.length > 1 ? types : types[0];
}
