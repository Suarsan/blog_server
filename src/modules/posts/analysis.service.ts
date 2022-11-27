import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisInput } from './dtos/analysisInput.dto';
import { Analysis, Type } from './entities';

@Injectable()
export class AnalysisService {

    constructor(@InjectRepository(Type) private readonly analysisRepository: Repository<Analysis>) {}

    async getAnalysis(): Promise<Array<Analysis>> {

        const analysis: Array<Analysis> = await this.analysisRepository.find();

        return analysis;
    }

    async create(analysisInput: AnalysisInput, postId): Promise<Analysis> {

        const createdAnalysis = await this.analysisRepository.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            score: analysisInput.score,
            pros: analysisInput.pros,
            cons: analysisInput.cons,
            postId
        });

        const savedAnalysis = await this.analysisRepository.save(createdAnalysis);

        delete savedAnalysis.postId;

        return savedAnalysis;
    }
}
