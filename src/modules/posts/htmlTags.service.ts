import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { HtmlTag } from './entities';
import { GET_HTMLTAGS, GET_HTMLTAG_BY_CONTENT, INSERT_HTMLTAG } from './htmlTags.query';

@Injectable()
export class HtmlTagsService {

    constructor(@InjectRepository(HtmlTag) private readonly htmlTagsRepository: Repository<HtmlTag>) {}

    async getHtmlTags(): Promise<Array<HtmlTag>> {
        return await this.htmlTagsRepository.query(GET_HTMLTAGS());
    }
    
    async create(content: string): Promise<HtmlTag> {
        const htmlTagAlreadyExists: HtmlTag = (await this.htmlTagsRepository.query(GET_HTMLTAG_BY_CONTENT(), [content]))[0];
        if (htmlTagAlreadyExists) throw new ApolloError('Html tag already exists')

        return await this.htmlTagsRepository.query(INSERT_HTMLTAG(), [content]);
    }
}
