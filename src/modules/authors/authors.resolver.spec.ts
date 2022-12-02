import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedAuthors, mockedSignIn } from 'src/mock/authors.mock';
import { DataSourceOptions } from "typeorm";
import { PostsModule } from '../posts/posts.module';
import { AuthorsModule } from './authors.module';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { ContextsService } from './contexts.service';
import { Author, Context } from './entities';

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

    it('should be defined', () => {
        expect(authorsResolver).toBeDefined();
        expect(authorsService).toBeDefined();
    });

    it('should return an array of authors', async () => {
        const result = new Promise<Array<Author>>((res, rej) => res(mockedAuthors));
        const response = await authorsResolver.getAuthors();
        response.forEach(r => {
            delete r.createdAt;
            delete r.updatedAt;
        });

        expect(instanceToPlain(response)).toStrictEqual(await result);
    });
    
    it('should signin', async () => {
        const result = new Promise<Author>((res, rej) => res(mockedSignIn));
        const response = await authorsResolver.signIn({email: 'asd@asd.com', password: 'test'});
        delete response.createdAt;
        delete response.updatedAt;
        delete response.context;

        expect(instanceToPlain(response)).toStrictEqual(await result);
    });
});