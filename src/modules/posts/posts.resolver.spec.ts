import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedPost, mockedPosts, mockedPostsByAuthorLeonXIII, mockedPostsByTagRestaurants, mockedPostsByTagsRestaurantAndNone, mockedPostsByType4, mockedPostsOrderedByAnalysisScore, mockedPostWithParent112 } from 'src/mock/posts.mock';
import { DataSourceOptions } from "typeorm";
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { PostsModule } from './posts.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

describe('PostsResolver', () => {
    let postsResolver: PostsResolver;
    let postsService: PostsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
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
                }
                ),
                TypeOrmModule.forFeature([
                    Analysis,
                    Paragraph,
                    Post,
                    Type,
                    HtmlTag,
                    Tag,
                    Author
                ])
            ],
            providers: [PostsResolver, PostsService]
        }).compile();
        postsService = module.get<PostsService>(PostsService);
        postsResolver = module.get<PostsResolver>(PostsResolver);
    });

    it('should return an array of posts', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPosts));
        let response = await postsResolver.getPosts();
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return a post by slug', async () => {
        const result = new Promise<Post>((res, rej) => res(mockedPost));
        let response = await postsResolver.getPostBySlug('medios-de-transporte-para-recorrer-la-vera');
        response = cleanTimestamps(response) as Post;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return a enabled post by slug', async () => {
        const result = new Promise<Post>((res, rej) => res(mockedPost));
        let response = await postsResolver.getEnabledPostBySlug('medios-de-transporte-para-recorrer-la-vera');
        response = cleanTimestamps(response) as Post;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by parent', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostWithParent112));
        let response = await postsResolver.getPostsByParent(112);
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by author', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByAuthorLeonXIII));
        let response = await postsResolver.getPostsByAuthor('León', 'XIII');
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by type', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByType4));
        let response = await postsResolver.getPostsByType(4);
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by tag', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagRestaurants));
        let response = await postsResolver.getPostsByTag('restaurants');
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by any of tags array', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagsRestaurantAndNone));
        let response = await postsResolver.getPostsByAnyTags(['none', 'restaurants']);
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts by tags array', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagsRestaurantAndNone));
        let response = await postsResolver.getPostsByTags(['none', 'restaurants']);
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

    it('should return an array of posts ordered by analysis score', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsOrderedByAnalysisScore));
        let response = await postsResolver.getPostsByScore();
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

});

function cleanTimestamps(input: Post | Array<Post>): Post | Array<Post> {
    let posts = Array.isArray(input) ? [...input] : [input];
    posts.forEach(r => {
        delete r.createdAt;
        delete r.updatedAt;
        delete r.author.createdAt;
        delete r.author.updatedAt;
        delete r.type?.createdAt;
        delete r.type?.updatedAt;
        delete r.analysis?.createdAt;
        delete r.analysis?.updatedAt;
        r.paragraphs.forEach(p => {
            delete p.createdAt;
            delete p.updatedAt;
            delete p.htmlTag.createdAt;
            delete p.htmlTag.updatedAt;
        });
        r.tags.forEach(t => {
            delete t.createdAt;
            delete t.updatedAt;
        });
        delete r.parent?.createdAt;
        delete r.parent?.updatedAt;
        delete r.parent?.type?.createdAt;
        delete r.parent?.type?.updatedAt;
        r?.children.forEach(c => {
            delete c.createdAt;
            delete c.updatedAt;
        });
    });
    return posts.length > 1 ? posts : posts[0];
}