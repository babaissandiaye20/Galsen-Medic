import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogListener } from '../log-listener/log-listener';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseService } from '../validation/exception/response/response.service'; // adaptez le chemin

@Module({
  imports: [PrismaModule],
  controllers: [LogController],
  providers: [LogService, LogListener, ResponseService],
  exports: [LogService],
})
export class LogModule {}
