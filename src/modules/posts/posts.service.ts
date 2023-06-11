import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParagraphInput } from './dtos/paragraphInput.dto';
import { Post } from './entities';
import { DELETE_PARAGRAPHS, DELETE_POST, GET_ENABLED_POST_BY_SLUG, GET_POSTS, GET_POSTS_BY_AUTHOR, GET_POSTS_BY_PARENT, GET_POSTS_BY_SCORE, GET_POSTS_BY_TAG, GET_POSTS_BY_TYPE, GET_POST_BY_SLUG, INSERT_PARAGRAPH, INSERT_POST, UPDATE_POST } from './posts.query';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

    async getPosts(): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS()))[0]['array_agg'];
    }
    
    async getPostBySlug(slug: string): Promise<Post> {
        
        const data = (await this.postsRepository.query(GET_POST_BY_SLUG(), [slug]));
        const response = data && (data.length > 0) ? data[0] : null;
        return response ? response['json_build_object'] : null;
    }

    async getEnabledPostBySlug(slug: string): Promise<Post> {
        return (await this.postsRepository.query(GET_ENABLED_POST_BY_SLUG(), [slug]))[0]['json_build_object'];
    }

    async getPostsByParent(parentId: number): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS_BY_PARENT(), [parentId]))[0]['array_agg'];
    }

    async getPostsByAuthor(firstname: string, lastname: string): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS_BY_AUTHOR(), [firstname, lastname]))[0]['array_agg'];
    }
    
    async getPostsByType(typeId: number): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS_BY_TYPE(), [typeId]))[0]['array_agg'];
    }

    async getPostsByTag(tag: string): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS_BY_TAG(), [tag]))[0]['array_agg'];
    }
    
//     async getPostsByAnyTags(tags: Array<string>): Promise<Array<Post>> {
//         const posts: Array<Post> = await this.postsRepository.find({
//             relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
//             order: {
//                 paragraphs: { position: "ASC" }
//             },        
//             where: { tags: { content: In(tags) }, enabled: true }
//         });

//         return posts;
//     }

//     async getPostsByTags(tags: Array<string>): Promise<Array<Post>> {
//         const posts: Array<Post> = await this.postsRepository.find({
//             relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
//             order: {
//                 paragraphs: { position: "ASC" }
//             },        
//             where: { tags: { content: In(tags) }, enabled: true }
//         });

//         return posts;
//     }

    async getPostsByScore(): Promise<Array<Post>> {
        return (await this.postsRepository.query(GET_POSTS_BY_SCORE()))[0]['array_agg'];
    }

    async create(enabled: boolean, slug: string, title: string, metaTitle: string, metaDescription: string, image: string, readTime: number, typeId: string | number, authorId: string | number, parentId: string | number, paragraphs: Array<ParagraphInput>): Promise<Post> {
        
        const params = [enabled, slug, title, metaTitle, metaDescription, image, readTime, typeId || null, authorId || null, parentId || null];
        const data = await this.postsRepository.query(INSERT_POST(), params);
        const createdPost: Post = data && (data.length > 0) ? data[0] : null;

        const createdParagraphs = [];
        paragraphs.map(async p => {
            const params = [p.content, p.classes, p.position, p.htmlTag.id, createdPost.id];
            const createdParagraph = await this.postsRepository.query(INSERT_PARAGRAPH(), params);
            createdParagraphs.push(createdParagraph);
        });
        createdPost.paragraphs = createdParagraphs;

        return createdPost;
    }

    async update(id: number, enabled: boolean, slug: string, title: string, metaTitle: string, metaDescription: string, image: string, readTime: number, typeId: string | number, authorId: string | number, parentId: string | number, paragraphs: Array<ParagraphInput>): Promise<Post> {

        const params = [enabled, slug, title, metaTitle, metaDescription, image, readTime, typeId || null, authorId || null, parentId || null, id];
        const data = await this.postsRepository.query(UPDATE_POST(), params);
        const updatedPost: Post = data && (data.length > 0) ? data[0] : null;

        await this.postsRepository.query(DELETE_PARAGRAPHS(), [id]);

        if (paragraphs && (paragraphs.length > 0)) {
            const createdParagraphs = [];
            paragraphs.map(async p => {
                const params = [p.content, p.classes, p.position, p.htmlTag.id, id];
                const createdParagraph = await this.postsRepository.query(INSERT_PARAGRAPH(), params);
                createdParagraphs.push(createdParagraph);
            });
            updatedPost.paragraphs = createdParagraphs;
        }

        return updatedPost;
    }

    async delete(id: number): Promise<Post> {

        const paragraphs = await this.postsRepository.query(DELETE_PARAGRAPHS(), [id]);
        const data = await this.postsRepository.query(DELETE_POST(), [id]);
        const post: Post = data && (data.length > 0) ? data[0][0] : null;
        post.paragraphs = paragraphs && paragraphs.length ? paragraphs : null;

        return post;
    }

}
