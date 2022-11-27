import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { HtmlTag } from './entities';

@Injectable()
export class HtmlTagsService {

    constructor(@InjectRepository(HtmlTag) private readonly htmlTagsRepository: Repository<HtmlTag>) {}

    async getHtmlTags(): Promise<Array<HtmlTag>> {
        const htmlTags: Array<HtmlTag> = await this.htmlTagsRepository.find();

        return htmlTags;
    }
    
    async create(content): Promise<HtmlTag> {
        const htmlTagAlreadyExists: HtmlTag = await this.htmlTagsRepository.findOne({ where: { content } });

        if (htmlTagAlreadyExists) throw new ApolloError('Html tag already exists')

        const createdHtmlTag = await this.htmlTagsRepository.create({
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedHtmlTag = await this.htmlTagsRepository.save(createdHtmlTag);

        return savedHtmlTag;
    }
}
