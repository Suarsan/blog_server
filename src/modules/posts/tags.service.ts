import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities';

@Injectable()
export class TagsService {

    constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

    async getTags(): Promise<Array<Tag>> {
        const tags: Array<Tag> = await this.tagsRepository.query(
            `SELECT * from tags
            ORDER BY id ASC;`
        );

        return tags;
    }

    async getTag(content: string): Promise<Tag> {
        const tag: Tag = await this.tagsRepository.query(
            `SELECT * from tags
            WHERE content = '${content}';`
        );

        return tag;
    }

    async create(content: string): Promise<Tag> {
        
        const response = await this.tagsRepository.query(
            `INSERT INTO tag (
                content,
                "createdAt",
                "updatedAt"
            ) VALUES (
                '${content}',
                NOW(), 
                NOW()
            ) RETURNING *;`
        );

        const savedTag = response && (response.length > 0) ? response[0] : null;

        return savedTag;
    }

    async createPostTag(post_id: number, tag_id: number) {
        await this.tagsRepository.query(`
            INSERT INTO post__tag (
                post_id,
                tag_id
            ) VALUES (
                ${post_id},
                ${tag_id}
            ) RETURNING *;
        `);
    }

    async deleteTagsByPostId(id: number) {
        await this.tagsRepository.query(`
            DELETE FROM post__tag WHERE post_id = ${id};
        `);
    }
}
