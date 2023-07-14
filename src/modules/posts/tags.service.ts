import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities';
import { DELETE_TAGS_BY_POST_ID, GET_TAG, GET_TAGS, INSERT_POST_TAG, INSERT_TAG } from './tags.query';

@Injectable()
export class TagsService {

    constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

    async getTags(): Promise<Array<Tag>> {
        return await this.tagsRepository.query(GET_TAGS());
    }

    async getTag(content: string): Promise<Tag> {
        return await this.tagsRepository.query(GET_TAG(), [content]);
    }

    async create(content: string): Promise<Tag> {
        const response = await this.tagsRepository.query(INSERT_TAG(), [content]);
        const savedTag = response && (response.length > 0) ? response[0] : null;
        return savedTag;
    }

    async createPostTag(post_id: number, tag_id: number) {
        await this.tagsRepository.query(INSERT_POST_TAG(), [post_id, tag_id]);
    }

    async deleteTagsByPostId(id: number) {
        await this.tagsRepository.query(DELETE_TAGS_BY_POST_ID(), [id]);
    }

}
