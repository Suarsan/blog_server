import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { ContextsService } from '../contexts/contexts.service';
import { AuthorsService } from './authors.service';
import { SignInInput } from './dtos/signInInput.dto';
import { SignUpInput } from './dtos/signUpInput.dto';
import { Author } from './entities';
import { security } from '../../utils/security.utils';
import { NotFoundException } from '@nestjs/common';

@Resolver('Author')
export class AuthorsResolver {

    constructor(private readonly authorsService: AuthorsService,
                private readonly contextsService: ContextsService) {}

    @Query('getAuthors')
    async getAuthors(): Promise<Array<Author>> {
        const authors = await this.authorsService.getAuthors();

        if (!authors) throw new ApolloError('Authors not found');

        return authors;
    }

    @Query('signIn')
    async signIn(@Args('signInInput') signInInput: SignInInput): Promise<Author> {
        const author = await this.authorsService.getAuthorByEmail(signInInput.email);

        if (!author) throw new ApolloError('Authentication error', '401');

        if (!(await security.compareHash(signInInput.password, author.password))) throw new ApolloError('Authentication error', '401')

        const savedContext = await this.contextsService.create(author);

        if (!savedContext) {
            throw new NotFoundException('Resource not found');
        }

        author.context = savedContext;

        return author;
    }


    @Mutation('signUp')
    async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<Author> {
        const author = await this.authorsService.getAuthorByEmail(signUpInput.email);

        if (author) throw new ApolloError('Author already exists')
        
        const savedAuthor = await this.authorsService.signUp(signUpInput.email, signUpInput.password, signUpInput.firstname, signUpInput.lastname);
        
        if (!savedAuthor) {
            throw new NotFoundException('Resource not found');
        }
        
        return savedAuthor;
    }



}
