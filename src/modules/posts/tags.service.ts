import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities';

@Injectable()
export class TagsService {

    constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

    async getTags(): Promise<Array<Tag>> {
        const tags: Array<Tag> = await this.tagsRepository.find();

        return tags;
    }

}
