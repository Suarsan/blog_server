import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { RrssService } from './rrss.service';
import { Author } from '../authors/entities';
import { AddRrssConnectionInput } from './dtos/addRrssConnection.dto';
import { AuthorsService } from '../authors/authors.service';
import { RrssConnection, RrssDiffusion, RrssType } from './entities';
import { DeleteRrssConnectionInput } from './dtos/deleteRrssConnection.dto';
import { UpdateRrssConnectionInput } from './dtos/updateRrssConnection.dto';
import { security } from 'src/utils/security.utils';
import { AddRrssDiffusionInput } from './dtos/addRrssDiffusion.dto';
import { DeleteRrssDiffusionInput } from './dtos/deleteRrssDiffusion.dto';

@Resolver()
export class RrssResolver {

    constructor(private readonly authorsService: AuthorsService,
                private readonly rrssService: RrssService) {}

    @Query('getRrssTypes')
    async getRrssTypes(): Promise<Array<RrssType>> {

        const rrssTypes: Array<RrssType> = await this.rrssService.getRrssTypes();

        if (!(rrssTypes?.length > 0)) throw new ApolloError('Rrss types not found');

        return rrssTypes;
    }
    
    @Query('getRrssConnections')
    async getRrssConnections(): Promise<Array<RrssConnection>> {

        const rrssConnections: Array<RrssConnection> = await this.rrssService.getRrssConnections();

        if (!(rrssConnections?.length > 0)) throw new ApolloError('Rrss connections not found');

        for (let i = 0; i < rrssConnections.length; i++) {
            const rrssType = await this.rrssService.getRrssType(rrssConnections[i].type_id);
            if (rrssType) {
                rrssConnections[i].type = rrssType;
            }
        }

        return rrssConnections;
    }
    
    @Query('getRrssDiffusions')
    async getRrssDiffusions(): Promise<Array<RrssDiffusion>> {

        const rrssDiffusions: Array<RrssDiffusion> = await this.rrssService.getRrssDiffusions();

        if (!(rrssDiffusions?.length > 0)) throw new ApolloError('Rrss diffusions not found');

        for (let i = 0; i < rrssDiffusions.length; i++) {
            const rrssConnection = await this.rrssService.getRrssConnectionById(rrssDiffusions[i]["rrss-connection_id"]);
            if (rrssConnection) {
                rrssDiffusions[i].rrssConnection = rrssConnection;
                const rrssType = await this.rrssService.getRrssType(rrssConnection.type_id);
                rrssDiffusions[i].rrssConnection.type = rrssType;
            }
        }

        return rrssDiffusions;
    }

    @Query('getRrssConnection')
    async getRrssConnection(@Args('name') name: string): Promise<RrssConnection> {

        const rrssConnection: RrssConnection = await this.rrssService.getRrssConnection(name);

        if (!rrssConnection) throw new ApolloError('Rrss connection not found');

        const rrssType = await this.rrssService.getRrssType(rrssConnection.type_id);
        if (!rrssType) throw new ApolloError('Rrss type not found');

        rrssConnection.type = rrssType;

        return rrssConnection;
    }
    
    @Query('getRrssDiffusion')
    async getRrssDiffusion(@Args('uuid') uuid: string): Promise<RrssDiffusion> {

        const rrssDiffusion: RrssDiffusion = await this.rrssService.getRrssDiffusion(uuid);

        if (!rrssDiffusion) throw new ApolloError('Rrss diffusion not found');

        const rrssConnection = await this.rrssService.getRrssType(rrssDiffusion['rrss-connection_id']);

        if (!rrssConnection) throw new ApolloError('Rrss connection not found');

        rrssDiffusion.rrssConnection = rrssConnection;

        return rrssDiffusion;
    }
    
    @Mutation('addRrssConnection')
    async addRrssConnection(@Args('addRrssConnectionInput') addRrssConnectionInput: AddRrssConnectionInput): Promise<RrssConnection> {

        const author: Author = await this.authorsService.getAuthorByContext(addRrssConnectionInput.context);

        if (!author) throw new ApolloError('Authentication error');

        const rrssType: RrssType = await this.rrssService.getRrssType(addRrssConnectionInput.typeId);

        if (!rrssType) throw new ApolloError('Rrss type not found');

        const createdRrssConnection: RrssConnection = await this.rrssService.createRrssConnection(
            addRrssConnectionInput.name, 
            addRrssConnectionInput.tokens, 
            rrssType.id
        );

        if (!createdRrssConnection) throw new ApolloError('Rrss connection can not be created');

        return createdRrssConnection;
    }

    @Mutation('addRrssDiffusion')
    async addRrssDiffusion(@Args('addRrssDiffusionInput') addRrssDiffusionInput: AddRrssDiffusionInput): Promise<RrssDiffusion> {

        const author: Author = await this.authorsService.getAuthorByContext(addRrssDiffusionInput.context);

        if (!author) throw new ApolloError('Authentication error');

        const rrssConnection: RrssConnection = await this.rrssService.getRrssConnection(addRrssDiffusionInput.rrssConnectionName);

        if (!rrssConnection) throw new ApolloError('Rrss connection not found');

        const uuid = (await security.hash(`${Date().valueOf()}${addRrssDiffusionInput.name}${addRrssDiffusionInput.name}`)).replace(/[$.,-/]/g, '');
        const createdRrssDiffusion: RrssDiffusion = await this.rrssService.createRrssDiffusion(
            addRrssDiffusionInput.name,
            addRrssDiffusionInput.content,
            addRrssDiffusionInput.date,
            uuid,
            rrssConnection.id
        );

        if (!createdRrssDiffusion) throw new ApolloError('Rrss diffusion can not be created');

        this.rrssService.createAtJob(addRrssDiffusionInput.date, uuid);

        return createdRrssDiffusion;
    }
    
    @Mutation('updateRrssConnection')
    async updateRrssConnection(@Args('updateRrssConnectionInput') updateRrssConnectionInput: UpdateRrssConnectionInput): Promise<RrssConnection> {

        const author: Author = await this.authorsService.getAuthorByContext(updateRrssConnectionInput.context);

        if (!author) throw new ApolloError('Authentication error');

        const rrssConnection: RrssConnection = await this.rrssService.getRrssConnection(updateRrssConnectionInput.name);

        if (!rrssConnection) throw new ApolloError('Rrss connection not found');
        
        const rrssType: RrssType = await this.rrssService.getRrssType(updateRrssConnectionInput.typeId);

        if (!rrssType) throw new ApolloError('Rrss type not found');

        const updatedRrssConnection: RrssConnection = await this.rrssService.updateRrssConnection(
            rrssConnection.id,
            updateRrssConnectionInput.name, 
            updateRrssConnectionInput.tokens, 
            rrssType.id
        );

        if (!updatedRrssConnection) throw new ApolloError('Rrss connection can not be updated');

        return updatedRrssConnection;
    }

    @Mutation('deleteRrssConnection')
    async deleteRrssConnection(@Args('deleteRrssConnectionInput') deleteRrssConnectionInput: DeleteRrssConnectionInput): Promise<RrssConnection> {

        const author: Author = await this.authorsService.getAuthorByContext(deleteRrssConnectionInput.context);

        if (!author) throw new ApolloError('Authentication error');

        const rrssConnection: RrssConnection = await this.rrssService.getRrssConnection(deleteRrssConnectionInput.name);
        
        if (!rrssConnection) throw new ApolloError('Rrss connection not found');

        const deletedRrssConnection = await this.rrssService.deleteRrssConnection(rrssConnection.id);

        return deletedRrssConnection;
    }

    @Mutation('deleteRrssDiffusion')
    async deleteRrssDiffusion(@Args('deleteRrssDiffusionInput') deleteRrssDiffusionInput: DeleteRrssDiffusionInput): Promise<RrssDiffusion> {

        const author: Author = await this.authorsService.getAuthorByContext(deleteRrssDiffusionInput.context);

        if (!author) throw new ApolloError('Authentication error');

        const rrssDiffusion: RrssDiffusion = await this.rrssService.getRrssDiffusion(deleteRrssDiffusionInput.name);
        
        if (!rrssDiffusion) throw new ApolloError('Rrss diffusion not found');

        const deletedRrssDiffusion = await this.rrssService.deleteRrssDiffusion(rrssDiffusion.id);

        return deletedRrssDiffusion;
    }
}
