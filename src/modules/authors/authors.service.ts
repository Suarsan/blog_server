import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {}

    async signUp(email, password, firstname, lastname): Promise<Author> {
        const author: Author = await this.authorRepository.create({
            email,
            password,
            firstname,
            lastname
        });

        const savedAuthor = this.authorRepository.save(author);

        if (!savedAuthor) {
            throw new NotFoundException('Resource not found');
        }

        return savedAuthor;
    }
    
    async getAuthors(): Promise<Array<Author>> {
        const authors = await this.authorRepository.find();

        return authors;
    }

}

