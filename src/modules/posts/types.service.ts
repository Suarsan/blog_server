import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { Type } from './entities';

@Injectable()
export class TypesService {

    constructor(@InjectRepository(Type) private readonly typesRepository: Repository<Type>) {}

    async getTypes(): Promise<Array<Type>> {
        const types: Array<Type> = await this.typesRepository.query(
            `SELECT * from type
            ORDER BY id ASC;`
        );

        return types;
    }

    async create(content): Promise<Type> {
        const typeAlreadyExists: Type = await this.typesRepository.query(
            `SELECT * from type WHERE content = ${content} LIMIT 1;`
        );

        if (typeAlreadyExists) throw new ApolloError('Type already exists')

        const createdType = await this.typesRepository.query(
            `INSERT INTO type (content, "createdAt", "updatedAt") 
            VALUES (${content}, NOW(), NOW())
            RETURNING *;`
        );

        const savedType = await this.typesRepository.save(createdType);

        return savedType;
    }
}
