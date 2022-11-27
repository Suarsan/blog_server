import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Context, Author } from './entities';
import { security } from '../../utils/security.utils';

@Injectable()
export class ContextsService {

    constructor(@InjectRepository(Context) private readonly contextRepository: Repository<Context>) {}

    async create(author: Author): Promise<Context> {
        const context: Context = await this.contextRepository.create({
            context: await security.hash(`${Math.random()}${new Date()}${author.email}${author.password}`),
            author: { id: author.id },
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedContext = this.contextRepository.save(context);

        return savedContext;
    }

}

