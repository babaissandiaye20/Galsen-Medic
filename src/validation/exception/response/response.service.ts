import { Injectable } from '@nestjs/common';
import {Response} from './response.interface';

@Injectable()
export class ResponseService {
  success<T>(data: T, message = 'Opération réussie'): Response<T> {
    return {
      statusCode: 200,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  created<T>(data: T, message = 'Ressource créée avec succès'): Response<T> {
    return {
      statusCode: 201,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  // Ajout du type void pour les méthodes qui ne retournent pas de données
  badRequest(errors: string[], message = 'Requête invalide'): Response<void> {
    return {
      statusCode: 400,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };
  }

  forbidden(message = 'Accès interdit'): Response<void> {
    return {
      statusCode: 403,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  notFound(message = 'Ressource non trouvée'): Response<void> {
    return {
      statusCode: 404,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  internalError(message = 'Erreur interne du serveur'): Response<void> {
    return {
      statusCode: 500,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}