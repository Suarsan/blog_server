import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisInput } from './dtos/analysisInput.dto';
import { Analysis, Type } from './entities';

@Injectable()
export class AnalysisService {

    constructor(@InjectRepository(Type) private readonly analysisRepository: Repository<Analysis>) {}

    async getAnalysis(): Promise<Array<Analysis>> {

        const analysis: Array<Analysis> = await this.analysisRepository.query(
            `SELECT id, score, pros, cons from analysis
            ORDER BY id ASC;`
        );

        return analysis;
    }

    async create(analysisInput: AnalysisInput, postId: number): Promise<Analysis> {

        const response = await this.analysisRepository.query(
            `INSERT INTO analysis (
                score, 
                pros, 
                cons, 
                "createdAt",
                "updatedAt", 
                post_id
            ) VALUES (
                '${analysisInput.score}', 
                '${analysisInput.pros}', 
                '${analysisInput.cons}', 
                NOW(), 
                NOW(), 
                '${postId}'
            ) RETURNING *;`
        );

        const savedAnalysis = response && (response.length > 0) ? response[0] : null
        delete savedAnalysis.post_id;

        return savedAnalysis;
    }
}
