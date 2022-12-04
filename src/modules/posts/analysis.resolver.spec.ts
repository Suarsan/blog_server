import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { mockedAnalysis } from 'src/mock/analysis.mock';
import { DataSourceOptions } from 'typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { Author } from '../authors/entities';
import { AnalysisResolver } from './analysis.resolver';
import { AnalysisService } from './analysis.service';
import { Analysis, HtmlTag, Paragraph, Post, Tag, Type } from './entities';
import { PostsModule } from './posts.module';

describe('AnalysisResolver', () => {
  let analysisResolver: AnalysisResolver;
  let analysisService: AnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostsModule,
        AuthorsModule,
        TypeOrmModule.forRootAsync({
            async useFactory() {
                const dbConfig = {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'admin',
                    password: 'my-weak-password',
                    database: 'blog_lavera',
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: true
                } as DataSourceOptions;
                return dbConfig;
            }
        }),
        TypeOrmModule.forFeature([
            HtmlTag,
            Analysis,
            Paragraph,
            Post,
            Type,
            HtmlTag,
            Tag,
            Author
        ])
      ],
      providers: [AnalysisResolver, AnalysisService],
    }).compile();

    analysisResolver = module.get<AnalysisResolver>(AnalysisResolver);
    analysisService = module.get<AnalysisService>(AnalysisService);
  });

  it('should be defined', () => {
    expect(analysisResolver).toBeDefined();
    expect(analysisService).toBeDefined();
  });

  it('should return an array of analysis', async () => {
    const result = new Promise<Array<Analysis>>((res, rej) => res(mockedAnalysis));
    let response = await analysisResolver.getAnalysis();
    response = cleanTimestamps(response) as Array<Analysis>;
    expect(instanceToPlain(response)).toStrictEqual(await result);
  });

});

function cleanTimestamps(input: Analysis | Array<Analysis>): Analysis | Array<Analysis> {
  let analysis = Array.isArray(input) ? [...input] : [input];
  analysis.forEach(r => {
      delete r.createdAt;
      delete r.updatedAt;
      
  });
  return analysis.length > 1 ? analysis : analysis[0];
}
