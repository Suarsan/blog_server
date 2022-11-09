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
    
    // @Query('getEnabledPostBySlug')
    // async getEnabledPostBySlug(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }
    
    // @Query('getPostsByParent')
    // async getPostsByParent(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }
    
    // @Query('getPostsByAuthor')
    // async getPostsByAuthor(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }

    // @Query('getPostsByType')
    // async getPostsByType(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }
    
    // @Query('getPostsByTag')
    // async getPostsByTag(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }

    // @Query('getPostsByAnyTags')
    // async getPostsByAnyTags(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }

    // @Query('getPostsByTags')
    // async getPostsByTags(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }

    // @Query('getPostsByScore')
    // async getPostsByScore(): Promise<Array<Post>> {
    //     // const htmltags: Array<HtmlTag> = await this.postsService.getHtmlTags();

    //     // if (!(htmltags.length > 0)) throw new ApolloError('Html tags not found');

    //     // return htmltags;
    // }

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
