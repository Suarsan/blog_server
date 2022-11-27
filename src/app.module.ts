import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './modules/authors/authors.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql']
    }),
    AuthorsModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
