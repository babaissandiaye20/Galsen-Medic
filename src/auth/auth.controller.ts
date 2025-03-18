import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect' })
  async login(@Body() connectUtilisateurDto: ConnectUtilisateurDto) {
    return this.authService.login(connectUtilisateurDto.email, connectUtilisateurDto.password);
  }

  @Post('logout')
  @ApiOperation({ summary: "Déconnexion de l'utilisateur (à implémenter)" })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie' })
  async logout() {
    return this.authService.logout(); // La logique sera ajoutée plus tard
  }

  @Post('reset-password')
  @ApiOperation({ summary: "Réinitialiser le mot de passe (à implémenter)" })
  @ApiResponse({ status: 200, description: 'Lien de réinitialisation envoyé' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Changer le mot de passe de l'utilisateur (à implémenter)" })
  @ApiResponse({ status: 200, description: 'Mot de passe changé avec succès' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }
}
