import { Injectable } from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from '../validation/exception/response/response.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService,
    private responseService: ResponseService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const utilisateur = await this.validateUtilisateur(email, password);
  
    const payload = { sub: utilisateur.id, email: utilisateur.email, privilege: utilisateur.idPrivilege };
    const accessToken = this.jwtService.sign(payload);
  
    return this.responseService.success(
      { access_token: accessToken },
      'Connexion réussie'
    );
  }
  
  private async validateUtilisateur(email: string, password: string) {
    const utilisateur = await this.utilisateurService.findByEmail(email);
    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }
    const isPasswordValid = await bcrypt.compare(password, utilisateur.password);
    if (!isPasswordValid) {
      throw new Error('Mot de passe incorrect');
    }
    return utilisateur;
  }

  async logout() {
    // La logique sera implémentée plus tard (ex: blacklisting des tokens)
    return this.responseService.success(null, 'Déconnexion réussie');
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    // La logique pour envoyer un email de réinitialisation sera ajoutée plus tard
    return this.responseService.success(null, 'Un email de réinitialisation a été envoyé');
  }

  async changePassword(utilisateurId: number, changePasswordDto: ChangePasswordDto) {
    // La logique pour changer le mot de passe sera implémentée plus tard
    return this.responseService.success(null, 'Mot de passe changé avec succès');
  }
}
