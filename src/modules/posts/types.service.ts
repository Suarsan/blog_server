import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { Type } from './entities';

@Injectable()
export class TypesService {

    constructor(@InjectRepository(Type) private readonly typesRepository: Repository<Type>) {}

    async getTypes(): Promise<Array<Type>> {
        const types: Array<Type> = await this.typesRepository.find();

        return types;
    }

    async addType(content): Promise<Type> {
        const typeAlreadyExists: Type = await this.typesRepository.findOne({ where: { content } });

        if (typeAlreadyExists) throw new ApolloError('Type already exists')

        const createdType = await this.typesRepository.create({
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedType = await this.typesRepository.save(createdType);

        return savedType;
    }
}
