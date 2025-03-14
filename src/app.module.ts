import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { ValidationService } from './validation/validation.service';
import { ValidationModule } from './validation/validation.module';


@Module({
  imports: [PrismaModule, PrivilegeModule, ValidationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ValidationService],
})
export class AppModule {}
