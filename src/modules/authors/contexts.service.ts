import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Context, Author } from './entities';
import { security } from '../../utils/security.utils';

@Injectable()
export class ContextsService {

    constructor(@InjectRepository(Context) private readonly contextRepository: Repository<Context>) {}

    async create(author: Author): Promise<Context> {
        const ctx = await security.hash(`${Math.random()}${new Date()}${author.email}${author.password}`);
        const context: Context = (await this.contextRepository.query(
            `INSERT INTO context(context, author_id, "createdAt", "updatedAt") 
            VALUES ('${ctx}', ${author.id}, 'NOW', 'NOW') 
            RETURNING *;`
        ))[0];

        return context;
    }

}

