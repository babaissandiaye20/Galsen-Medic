import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { LogService } from './log.service';

@ApiTags('Logs')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({ summary: 'Liste de tous les logs (Admin seulement)' })
  async findAll(@Request() req) {
    return await this.logService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un log par ID (Admin seulement)' })
  async findById(@Param('id') id: string, @Request() req) {
    return await this.logService.findById(+id, req.user);
  }
}
