import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities';

@Injectable()
export class TypesService {

    constructor(@InjectRepository(Type) private readonly typesRepository: Repository<Type>) {}

    async getTypes(): Promise<Array<Type>> {
        const types: Array<Type> = await this.typesRepository.find();

        return types;
    }
}
