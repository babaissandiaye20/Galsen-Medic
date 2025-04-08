import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ResponseService } from '../validation/exception/response/response.service';
import { BlacklistService } from './blacklist/blacklist.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UtilisateurService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    ResponseService,
    BlacklistService,
  ],
  exports: [AuthService, JwtModule], // ✅ Exporter JwtModule pour que d'autres modules puissent l'utiliser
})
export class AuthModule {}
