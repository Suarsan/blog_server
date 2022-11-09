import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities';
import { AuthorsModule } from './authors.module';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { DataSourceOptions } from "typeorm";
import { Context } from 'src/modules/contexts/entities';
import { ContextsService } from '../contexts/contexts.service';
import { Analysis, HtmlTag, Paragraph, Post, Type } from '../posts/entities';
import { mockedAuthors } from 'src/mock/authors.mock';
import { instanceToPlain } from 'class-transformer';
import { PostsModule } from '../posts/posts.module';

describe('AuthorsResolver', () => {
    let authorsResolver: AuthorsResolver;
    let authorsService: AuthorsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AuthorsModule,
                PostsModule,
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
                    }}
                ),
                TypeOrmModule.forFeature([
                    Author,
                    Context
                ])
            ],
            providers: [
                AuthorsResolver,
                AuthorsService,
                ContextsService
            ]
        }).compile();
        authorsService = module.get<AuthorsService>(AuthorsService);
        authorsResolver = module.get<AuthorsResolver>(AuthorsResolver);
    });

  describe('getAuthors', () => {
    it('should return an array of authors', async () => {
        const result = new Promise<Array<Author>>((res, rej) => res(mockedAuthors));
        const response = await authorsResolver.getAuthors();
        response.forEach(r => {
            delete r.createdAt;
            delete r.updatedAt;
        });

        expect(instanceToPlain(response)).toStrictEqual(await result);
    });
  });
});