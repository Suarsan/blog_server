import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { Type } from './entities';
import { GET_TYPES, GET_TYPE_BY_CONTENT, INSERT_TYPE } from './types.query';

@Injectable()
export class TypesService {

    constructor(@InjectRepository(Type) private readonly typesRepository: Repository<Type>) {}

    async getTypes(): Promise<Array<Type>> {
        const types: Array<Type> = await this.typesRepository.query(GET_TYPES());

        return types;
    }

    async create(content: string): Promise<Type> {
        const typeAlreadyExists: Type = (await this.typesRepository.query(GET_TYPE_BY_CONTENT(), [content]))[0];
        if (typeAlreadyExists) throw new ApolloError('Type already exists')

        return await this.typesRepository.query(INSERT_TYPE(), [content]);
    }
}
