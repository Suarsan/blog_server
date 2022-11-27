import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Author } from '../authors/entities';
import { AddPostInput } from './dtos/addPostInput.dto';
import { Post } from './entities';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

    async getPosts(): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            }
        });

        return posts;
    }
    
    async getPostBySlug(slug: string): Promise<Post> {
        const post: Post = await this.postsRepository.findOne({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { slug }
        });

        return post;
    }

    async getEnabledPostBySlug(slug: string): Promise<Post> {
        const post: Post = await this.postsRepository.findOne({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { slug, enabled: true }
        });

        return post;
    }

    async getPostsByParent(parentId: number): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { parent: { id: parentId }, enabled: true }
        });

        return posts;
    }

    async getPostsByAuthor(firstname: string, lastname: string): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { author: { firstname, lastname }, enabled: true }
        });

        return posts;
    }
    
    async getPostsByType(typeId: number): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { type: { id: typeId }, enabled: true }
        });

        return posts;
    }

    async getPostsByTag(tag: string): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { tags: { content: tag }, enabled: true }
        });

        return posts;
    }
    
    async getPostsByAnyTags(tags: Array<string>): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { tags: { content: In(tags) }, enabled: true }
        });

        return posts;
    }

    async getPostsByTags(tags: Array<string>): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                paragraphs: { position: "ASC" }
            },        
            where: { tags: { content: In(tags) }, enabled: true }
        });

        return posts;
    }

    async getPostsByScore(): Promise<Array<Post>> {
        const posts: Array<Post> = await this.postsRepository.find({
            relations: ['author', 'type', 'paragraphs', 'paragraphs.htmlTag', 'analysis', 'parent', 'children', 'tags'],
            order: {
                analysis: { score: "ASC" },
                paragraphs: { position: "ASC" }
            }
        });

        return posts;
    }

    async create(addPostInput: AddPostInput, author: Author) {

        const post = await this.postsRepository.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            enabled: true,
            slug: addPostInput.slug,
            title: addPostInput.title,
            metaTitle: addPostInput.metaTitle,
            metaDescription: addPostInput.metaDescription,
            image: addPostInput.image,
            readTime: addPostInput.readTime,
            type_id: addPostInput.type.id,
            author_id: author.id,
            parent_id: addPostInput.parentId,
        });

        const savedPost = await this.postsRepository.save(post);

        return savedPost;
    }
}
