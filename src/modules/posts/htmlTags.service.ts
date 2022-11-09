import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HtmlTag } from './entities';

@Injectable()
export class HtmlTagsService {

    constructor(@InjectRepository(HtmlTag) private readonly htmlTagsRepository: Repository<HtmlTag>) {}

    async getHtmlTags(): Promise<Array<HtmlTag>> {
        const htmlTags: Array<HtmlTag> = await this.htmlTagsRepository.find();

        return htmlTags;
    }
}
