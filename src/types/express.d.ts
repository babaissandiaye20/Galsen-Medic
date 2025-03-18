// types/express.d.ts
declare global {
  namespace Express {
    export interface Request {
      user?: any; // Remplacez "any" par votre type utilisateur si nécessaire
    }
  }
}
export {};
