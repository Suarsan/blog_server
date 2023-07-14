import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisInput } from './dtos/analysisInput.dto';
import { Analysis, Type } from './entities';
import { DELETE_ANALYSIS, GET_ANALYSIS, INSERT_ANALYSIS } from './analysis.query';

@Injectable()
export class AnalysisService {

    constructor(@InjectRepository(Type) private readonly analysisRepository: Repository<Analysis>) {}

    async getAnalysis(): Promise<Array<Analysis>> {
        return await this.analysisRepository.query(GET_ANALYSIS());
    }

    async create(analysisInput: AnalysisInput, postId: number): Promise<Analysis> {

        const params = [analysisInput.score, analysisInput.pros, analysisInput.cons, postId];
        const response = await this.analysisRepository.query(INSERT_ANALYSIS(), [params]);
        const savedAnalysis = response && (response.length > 0) ? response[0] : null
        delete savedAnalysis.post_id;

        return savedAnalysis;
    }

    async deleteByPost(postId: number) {
        return await this.analysisRepository.query(DELETE_ANALYSIS(), [postId]);
    }
}
