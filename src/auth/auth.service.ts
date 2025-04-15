import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from '../validation/exception/response/response.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { BlacklistService } from './blacklist/blacklist.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService,
    private responseService: ResponseService,
    private configService: ConfigService,
    private blacklistService: BlacklistService,
  ) {}

  async login(email: string, password: string) {
    const utilisateur = await this.validateUtilisateur(email, password);
    const payload = {
      sub: utilisateur.id,
      email: utilisateur.email,
      privilege: utilisateur.idPrivilege,
    };
    const accessToken = this.jwtService.sign(payload);
    return this.responseService.success(
      { access_token: accessToken },
      'Connexion réussie'
    );
  }

  private async validateUtilisateur(email: string, password: string) {
    const utilisateur = await this.utilisateurService.findByEmail(email);
    if (!utilisateur) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    const isPasswordValid = await bcrypt.compare(password, utilisateur.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    return utilisateur;
  }a

  async logout(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('Clé JWT manquante dans la configuration');
    }

    try {
      const decoded: any = jwt.verify(token, secret);
      const expiresAt = new Date(decoded.exp * 1000);
      await this.blacklistService.blacklistToken(token, expiresAt);

      return this.responseService.success(null, 'Déconnexion réussie');
    } catch (err) {
      return this.responseService.unauthorized
        ? this.responseService.unauthorized('Token invalide ou expiré.')
        : new UnauthorizedException('Token invalide ou expiré.');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.responseService.success(null, 'Un email de réinitialisation a été envoyé');
  }

  async changePassword(utilisateurId: number, changePasswordDto: ChangePasswordDto) {
    return this.responseService.success(null, 'Mot de passe changé avec succès');
  }
}
