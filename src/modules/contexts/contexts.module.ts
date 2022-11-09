import { Module } from '@nestjs/common';
import { Context } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContextsService } from './contexts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Context
    ])
  ],
  providers: [ContextsService],
  exports: [ContextsService]
})
export class ContextsModule {}
