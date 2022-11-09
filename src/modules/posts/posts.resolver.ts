import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Post } from './entities';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {

    constructor(private readonly postsService: PostsService) {}

    @Query('getPosts')
    async getPosts(): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPosts();

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }

    @Query('getPostBySlug')
    async getPostBySlug(@Args('slug') slug: string): Promise<Post> {
        const post: Post = await this.postsService.getPostBySlug(slug);

        if (!post) throw new ApolloError('Posts not found');

        return post;
    }
    
    @Query('getEnabledPostBySlug')
    async getEnabledPostBySlug(@Args('slug') slug: string): Promise<Post> {
        const post: Post = await this.postsService.getEnabledPostBySlug(slug);
    
        if (!post) throw new ApolloError('Posts not found');
    
        return post;
    }
    
    @Query('getPostsByParent')
    async getPostsByParent(@Args('parentId') parentId: number): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByParent(parentId);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }
    
    @Query('getPostsByAuthor')
    async getPostsByAuthor(@Args('firstname') firstname: string, @Args('lastname') lastname: string,): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByAuthor(firstname, lastname);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }
   
    @Query('getPostsByType')
    async getPostsByType(@Args('typeId') typeId: number): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByType(typeId);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }
    
    @Query('getPostsByTag')
    async getPostsByTag(@Args('tag') tag: string): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByTag(tag);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }
    
    @Query('getPostsByAnyTags')
    async getPostsByAnyTags(@Args('tags') tags: Array<string>): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByAnyTags(tags);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }
    
    @Query('getPostsByTags')
    async getPostsByTags(@Args('tags') tags: Array<string>): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByTags(tags);

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }

    @Query('getPostsByScore')
    async getPostsByScore(): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsService.getPostsByScore();

        if (!(posts.length > 0)) throw new ApolloError('Posts not found');

        return posts;
    }

    // @Mutation('addPost')
    // async addPost(@Args('post') post: string): Promise<Post> {
    //     // const htmlTag = await this.postsService.getHtmlTagByContent(content);

    //     // if (htmlTag) throw new ApolloError('Html tag already exists')

    //     // const savedHtmlTag = await this.postsService.create(content);

    //     // if (!savedHtmlTag) {
    //     //     throw new NotFoundException('Html tag not found');
    //     // }

    //     // return savedHtmlTag;
    // }
    
    // @Mutation('updatePost')
    // async updatePost(@Args('post') post: string): Promise<Post> {
    //     // const htmlTag = await this.postsService.getHtmlTagByContent(content);

    //     // if (htmlTag) throw new ApolloError('Html tag already exists')

    //     // const savedHtmlTag = await this.postsService.create(content);

    //     // if (!savedHtmlTag) {
    //     //     throw new NotFoundException('Html tag not found');
    //     // }

    //     // return savedHtmlTag;
    // }

    // @Mutation('deletePost')
    // async deletePost(@Args('post') post: string): Promise<Post> {
    //     // const htmlTag = await this.postsService.getHtmlTagByContent(content);

    //     // if (htmlTag) throw new ApolloError('Html tag already exists')

    //     // const savedHtmlTag = await this.postsService.create(content);

    //     // if (!savedHtmlTag) {
    //     //     throw new NotFoundException('Html tag not found');
    //     // }

    //     // return savedHtmlTag;
    // }

    // @Query('getHtmlTags')
    // async getHtmlTags(): Promise<Array<HtmlTag>> {
    //     const htmltags: Array<HtmlTag> = await this.htmltagsService.getHtmlTags();

    //     if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     return htmltags;
    // }

    // @Mutation('addHtmlTag')
    // async addHtmlTag(@Args('content') content: string): Promise<HtmlTag> {
    //     const htmlTag = await this.htmltagsService.getHtmlTagByContent(content);

    //     if (htmlTag) throw new ApolloError('Html tag already exists')

    //     const savedHtmlTag = await this.htmltagsService.create(content);

    //     if (!savedHtmlTag) {
    //         throw new NotFoundException('Html tag not found');
    //     }

    //     return savedHtmlTag;
    // }
}
