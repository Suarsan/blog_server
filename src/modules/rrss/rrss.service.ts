import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RrssConnection, RrssDiffusion, RrssType } from './entities';
import { DELETE_RRSS_CONNECTION, DELETE_RRSS_DIFFUSION, GET_RRSS_CONNECTION, GET_RRSS_CONNECTIONS, GET_RRSS_CONNECTION_BY_ID, GET_RRSS_DIFFUSION, GET_RRSS_DIFFUSIONS, GET_RRSS_DIFFUSION_BY_UUID, GET_RRSS_TYPE, GET_RRSS_TYPES, INSERT_RRSS_CONNECTION, INSERT_RRSS_DIFFUSION, UPDATE_RRSS_CONNECTION } from './rrss.query';
import { exec } from 'child_process';

@Injectable()
export class RrssService {

    constructor(@InjectRepository(RrssType) private readonly rrssTypeRepository: Repository<RrssType>) {}

    async getRrssTypes(): Promise<Array<RrssType>> {

        const rrssTypes: Array<RrssType> = await this.rrssTypeRepository.query(GET_RRSS_TYPES());

        return rrssTypes;
    }
    
    async getRrssType(id: number): Promise<RrssType> {

        const rrssType: RrssType = (await this.rrssTypeRepository.query(GET_RRSS_TYPE(), [id]))[0];

        return rrssType;
    }

    async getRrssConnections(): Promise<Array<RrssConnection>> {

        const rrssConnections: Array<RrssConnection> = await this.rrssTypeRepository.query(GET_RRSS_CONNECTIONS());

        return rrssConnections;
    }
   
    async getRrssDiffusions(): Promise<Array<RrssDiffusion>> {

        const rrssDiffusions: Array<RrssDiffusion> = await this.rrssTypeRepository.query(GET_RRSS_DIFFUSIONS());

        return rrssDiffusions;
    }

    async getRrssConnection(name: string): Promise<RrssConnection> {

        const rrssConnection: RrssConnection = (await this.rrssTypeRepository.query(GET_RRSS_CONNECTION(), [name]))[0];

        return rrssConnection;
    }
    async getRrssConnectionById(id: number): Promise<RrssConnection> {

        const rrssConnection: RrssConnection = (await this.rrssTypeRepository.query(GET_RRSS_CONNECTION_BY_ID(), [id]))[0];

        return rrssConnection;
    }
    async getRrssDiffusion(name: string): Promise<RrssDiffusion> {

        const rrssDiffusion: RrssDiffusion = (await this.rrssTypeRepository.query(GET_RRSS_DIFFUSION(), [name]))[0];

        return rrssDiffusion;
    }
    async getRrssDiffusionByUuid(uuid: string): Promise<RrssDiffusion> {

        const rrssDiffusion: RrssDiffusion = (await this.rrssTypeRepository.query(GET_RRSS_DIFFUSION_BY_UUID(), [uuid]))[0];

        return rrssDiffusion;
    }
    async createRrssConnection(name: string, tokens: string, rrssTypeId: number): Promise<RrssConnection> {

        const rrssType: RrssConnection = (await this.rrssTypeRepository.query(INSERT_RRSS_CONNECTION(), [name, tokens, rrssTypeId]))[0];

        return rrssType;
    }
    
    async createRrssDiffusion(name: string, content: string, date: Date, uuid: string, rrssConnectionId: number): Promise<RrssDiffusion> {

        const rrssDiffusion: RrssDiffusion = (await this.rrssTypeRepository.query(INSERT_RRSS_DIFFUSION(), [name, content, date, uuid, rrssConnectionId]))[0];

        return rrssDiffusion;
    }

    async updateRrssConnection(id: number, name: string, tokens: string, rrssTypeId: number): Promise<RrssConnection> {

        const rrssType: RrssConnection = await this.rrssTypeRepository.query(UPDATE_RRSS_CONNECTION(), [id, name, tokens, rrssTypeId]);

        return rrssType;
    }
    
    async deleteRrssConnection(id: number): Promise<RrssConnection> {

        const rrssType: RrssConnection = await this.rrssTypeRepository.query(DELETE_RRSS_CONNECTION(), [id]);

        return rrssType;
    }
    
    async deleteRrssDiffusion(id: number): Promise<RrssDiffusion> {

        const rrssDiffusion: RrssDiffusion = await this.rrssTypeRepository.query(DELETE_RRSS_DIFFUSION(), [id]);

        return rrssDiffusion;
    }

    async createAtJob(date, uuid) {
        exec(`echo "curl localhost:5001/api-twitter/publish?uuid=${uuid}" | at -t ${date.toLocaleString().replace(/[-T:]/g, '').substring(2)}`, (err, stdout, stderr) => {
            if (err) {
                console.log('err: ' + err);
            } else {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
            }
        })
    }
}
