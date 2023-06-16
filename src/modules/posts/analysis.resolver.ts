import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AnalysisService } from './analysis.service';
import { Analysis } from './entities';

@Resolver()
export class AnalysisResolver {

    constructor(private readonly analysisService: AnalysisService) {}

    @Query('getAnalysis')
    async getAnalysis(): Promise<Array<Analysis>> {
        const analysis: Array<Analysis> = await this.analysisService.getAnalysis();

        if (!(analysis?.length > 0)) throw new ApolloError('Analysis not found');

        return analysis;
    }

}
