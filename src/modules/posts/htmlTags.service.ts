import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { HtmlTag } from './entities';

@Injectable()
export class HtmlTagsService {

    constructor(@InjectRepository(HtmlTag) private readonly htmlTagsRepository: Repository<HtmlTag>) {}

    async getHtmlTags(): Promise<Array<HtmlTag>> {
        const htmlTags: Array<HtmlTag> = await this.htmlTagsRepository.query(
            `SELECT * from "html-tag";`
        );

        return htmlTags;
    }
    
    async create(content): Promise<HtmlTag> {
        const htmlTagAlreadyExists: HtmlTag = await this.htmlTagsRepository.query(
            `SELECT * from "html-tag" WHERE content = ${content};`
        );

        if (htmlTagAlreadyExists) throw new ApolloError('Html tag already exists')


        const createdHtmlTag = await this.htmlTagsRepository.query(
            `INSERT INTO "html-tag" (content, "createdAt", "updatedAt")
            VALUES (${content}, NOW(), NOW())
            RETURNING *;`
        );

        const savedHtmlTag = await this.htmlTagsRepository.save(createdHtmlTag);

        return savedHtmlTag;
    }
}
