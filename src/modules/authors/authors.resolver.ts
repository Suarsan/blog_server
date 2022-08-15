import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { SignUpInput } from './dtos/signUpInput.dto';
import { Author } from './entities';

@Resolver('Author')
export class AuthorsResolver {

    constructor(private readonly authorsService: AuthorsService) {}

    @Mutation('signUp')
    async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<Author> {
        return this.authorsService.signUp(signUpInput.email, signUpInput.password, signUpInput.firstname, signUpInput.lastname);
    }

    @Query('getAuthors')
    async getAuthors(): Promise<Array<Author>> {
        return this.authorsService.getAuthors();
    }

}
