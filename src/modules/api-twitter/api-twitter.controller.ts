import { Controller, Get } from '@nestjs/common';
import { ApiTwitterService } from './api-twitter.service';

@Controller('api-twitter')
export class ApiTwitterController {

    constructor(private apiTwitterService: ApiTwitterService) {}

    @Get('oauth-url')
    getOAuthUrl() {
        return this.apiTwitterService.tweet('Hello');
    }

}
