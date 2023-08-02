import { Controller, Get, Query } from '@nestjs/common';
import { ApiTwitterService } from './api-twitter.service';
import { RrssConnection, RrssDiffusion, RrssType } from './entities';
import { RrssService } from './rrss.service';
import { ApolloError } from 'apollo-server-express';

@Controller('api-twitter')
export class ApiTwitterController {

    constructor(private rrssService: RrssService,
                private apiTwitterService: ApiTwitterService) {}
    
    @Get('publish')
    async publish(@Query() params) {

        const diffusion: RrssDiffusion = await this.rrssService.getRrssDiffusionByUuid(params.uuid);

        if (!diffusion) throw new ApolloError('Rrss diffusion can not be found');

        const rrssConnection: RrssConnection = await this.rrssService.getRrssConnectionById(diffusion['rrss-connection_id']);

        if (!rrssConnection) throw new ApolloError('Rrss connection can not be found');

        const rrssType: RrssType = await this.rrssService.getRrssType(rrssConnection.type_id);

        if (!rrssType) throw new ApolloError('Rrss type can not be found');

        let tokens;
        try {
            tokens = JSON.parse(rrssConnection.tokens);
        } catch(e) { console.dir(e); }

        switch (rrssType.name) {
            case 'twitter':
                this.apiTwitterService.tweet(tokens, diffusion.content);
                break;
        }

        return params;
    }

}
