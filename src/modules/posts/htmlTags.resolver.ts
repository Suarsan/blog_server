import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { HtmlTag } from './entities';
import { HtmlTagsService } from './htmlTags.service';

@Resolver()
export class HtmlTagsResolver {

    constructor(private readonly htmlTagsService: HtmlTagsService) {}

    @Query('getHtmlTags')
    async getHtmlTags(): Promise<Array<HtmlTag>> {
        const htmlTags: Array<HtmlTag> = await this.htmlTagsService.getHtmlTags();

        if (!(htmlTags.length > 0)) throw new ApolloError('Html tags not found');

        return htmlTags;
    }
}
