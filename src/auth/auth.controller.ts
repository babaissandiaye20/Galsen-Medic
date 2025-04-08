import { Controller, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnectUtilisateurDto } from './dto/connect-utilisateur.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: "Authentifier un utilisateur et générer un token JWT" })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  async login(@Body() connectUtilisateurDto: ConnectUtilisateurDto) {
    return this.authService.login(connectUtilisateurDto.email, connectUtilisateurDto.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Déconnexion sécurisée avec blacklist du token" })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie' })
  async logout(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Récupère le token depuis "Bearer <token>"
    return this.authService.logout(token);
  }

  @Post('reset-password')
  @ApiOperation({ summary: "Réinitialiser le mot de passe" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Changer le mot de passe de l'utilisateur" })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }
}
