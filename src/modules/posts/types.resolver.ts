import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { Type } from './entities';
import { TypesService } from './types.service';

@Resolver()
export class TypesResolver {

    constructor(private readonly typesService: TypesService) {}

    @Query('getPostTypes')
    async getPostTypes(): Promise<Array<Type>> {
        const types: Array<Type> = await this.typesService.getTypes();

        if (!(types.length > 0)) throw new ApolloError('Types not found');

        return types;
    }
}
