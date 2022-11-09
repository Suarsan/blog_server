import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Tag } from './entities';
import { TagsService } from './tags.service';

@Resolver()
export class TagsResolver {

    constructor(private readonly tagsService: TagsService) {}

    @Query('getTags')
    async getTags(): Promise<Array<Tag>> {
        const tags: Array<Tag> = await this.tagsService.getTags();

        if (!(tags.length > 0)) throw new ApolloError('Tags not found');

        return tags;
    }
}
