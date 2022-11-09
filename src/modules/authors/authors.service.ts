import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities';
import { security } from 'src/utils/security.utils';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {}

    async signUp(email, password, firstname, lastname): Promise<Author> {
        const author: Author = await this.authorRepository.create({
            email,
            password: await security.hash(password),
            firstname,
            lastname,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedAuthor = this.authorRepository.save(author);

        return savedAuthor;
    }
    
    async getAuthorByEmail(email: string): Promise<Author> {
        const author: Author = await this.authorRepository.findOne({ where: { email } });
        return author;
    }

    async getAuthors(): Promise<Array<Author>> {
        const authors: Array<Author> = await this.authorRepository.find();

        return authors;
    }

}

