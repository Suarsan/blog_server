import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author, Context } from './entities';
import { security } from 'src/utils/security.utils';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>,
                @InjectRepository(Context) private readonly contextsRepository: Repository<Context>) {}

    async create(email, password, firstname, lastname): Promise<Author> {
        const hashedPassword = await security.hash(password);
        const author: Author = await this.authorRepository.query(
            `INSERT INTO author(email, password, firstname, lastname, "createdAt", "updatedAt") 
            VALUES ('${email}', '${hashedPassword}', '${firstname}', '${lastname}', 'NOW', 'NOW') 
            RETURNING *`
        );
        return author;
    }
    
    async getAuthorByEmail(email: string): Promise<Author> {
        const author: Author = await this.authorRepository.query(
            `SELECT * from author WHERE email = '${email}' LIMIT 1;`
        );
        return author[0];
    }

    async getAuthors(): Promise<Array<Author>> {
        const authors: Array<Author> = await this.authorRepository.query(
            `SELECT * from author;`
        );

        return authors;
    }

    async getAuthorByContext(context: string): Promise<Author> {
        let response = await this.contextsRepository.query(
            `SELECT DISTINCT ON (author.id) 
            author.id,
            author.email,
            author.firstname,
            author.lastname
            FROM author 
            INNER JOIN context ON author.id = (SELECT author_id FROM context WHERE context = '${context}');`
        );
        
        const author: Author = response && (response.length > 0) ? response[0] : null;

        return author;
    }

}

