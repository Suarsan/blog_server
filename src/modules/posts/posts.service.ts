import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
            where: { slug, enabled: true }
        });

        return post;
    }

    // async getHtmlTags(): Promise<Array<HtmlTag>> {
    //     const authors: Array<HtmlTag> = await this.htmltagsRepository.find();

    //     return authors;
    // }

    // async getHtmlTagByContent(content): Promise<HtmlTag> {
    //     const htmltag: HtmlTag = await this.htmltagsRepository.findOne({ where: { content }});
    //     return htmltag;
    // }
    
    // async create(content: string): Promise<HtmlTag> {
    //     const htmltag: HtmlTag = await this.htmltagsRepository.create({ 
    //         content,
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //     });

    //     const savedHtmltag = this.htmltagsRepository.save(htmltag);

    //     return savedHtmltag;
    // }
}
