import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedPost, mockedPosts, mockedPostsByAuthorLeonXIII, mockedPostsByTagRestaurants, mockedPostsByTagsRestaurantAndNone, mockedPostsByType4, mockedPostsOrderedByAnalysisScore, mockedPostWithParent112 } from 'src/mock/posts.mock';
import { DataSourceOptions } from "typeorm";
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { AnalysisResolver } from './analysis.resolver';
import { AnalysisService } from './analysis.service';
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
                }),
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
            providers: [
                PostsResolver,
                PostsService,
                AnalysisResolver,
                AnalysisService]
        }).compile();
        postsService = module.get<PostsService>(PostsService);
        postsResolver = module.get<PostsResolver>(PostsResolver);
    });

    it('should be defined', () => {
        expect(postsResolver).toBeDefined();
        expect(postsService).toBeDefined();
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

    // it('should return an array of posts by tag', async () => {
    //     const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagRestaurants));
    //     let response = await postsResolver.getPostsByTag('restaurants');
    //     response = cleanTimestamps(response) as Array<Post>;
    //     expect(instanceToPlain(response)).toStrictEqual(await result);
    // });

    // it('should return an array of posts by any of tags array', async () => {
    //     const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagsRestaurantAndNone));
    //     let response = await postsResolver.getPostsByAnyTags(['none', 'restaurants']);
    //     response = cleanTimestamps(response) as Array<Post>;
    //     expect(instanceToPlain(response)).toStrictEqual(await result);
    // });

    // it('should return an array of posts by tags array', async () => {
    //     const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsByTagsRestaurantAndNone));
    //     let response = await postsResolver.getPostsByTags(['none', 'restaurants']);
    //     response = cleanTimestamps(response) as Array<Post>;
    //     expect(instanceToPlain(response)).toStrictEqual(await result);
    // });

    it('should return an array of posts ordered by analysis score', async () => {
        const result = new Promise<Array<Post>>((res, rej) => res(mockedPostsOrderedByAnalysisScore));
        let response = await postsResolver.getPostsByScore();
        response = cleanTimestamps(response) as Array<Post>;
        expect(instanceToPlain(response)).toStrictEqual(await result);
    });

});

function cleanTimestamps(input: Post | Array<Post>): Post | Array<Post> {
    let posts = Array.isArray(input) ? [...input] : [input];
    posts.forEach(post => {
        delete post.createdAt;
        delete post.updatedAt;
        delete post.type_id;
        delete post.parent_id;
        delete post.author_id;
        delete post.author.createdAt;
        delete post.author.updatedAt;
        delete post.type?.createdAt;
        delete post.type?.updatedAt;
        delete post.analysis?.createdAt;
        delete post.analysis?.updatedAt;
        post.paragraphs?.forEach(paragraph => {
            delete paragraph.createdAt;
            delete paragraph.updatedAt;
        });
        post.tags?.forEach(tag => {
            delete tag.createdAt;
            delete tag.updatedAt;
        });
        delete post.parent?.createdAt;
        delete post.parent?.updatedAt;
        delete post.parent?.type_id;
        delete post.parent?.parent_id;
        delete post.parent?.author_id;
        delete post.parent?.type?.createdAt;
        delete post.parent?.type?.updatedAt;
        post?.children?.forEach(children => {
            delete children.createdAt;
            delete children.updatedAt;
            delete children.type_id;
            delete children.parent_id;
            delete children.author_id;
        });
    });
    return posts.length > 1 ? posts : posts[0];
}