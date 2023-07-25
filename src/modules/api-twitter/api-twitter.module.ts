import { Module } from '@nestjs/common';
import { ApiTwitterController } from './api-twitter.controller';
import { ApiTwitterService } from './api-twitter.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ApiTwitterController],
  providers: [ApiTwitterService],
  imports: [HttpModule]
})
export class ApiTwitterModule {}
