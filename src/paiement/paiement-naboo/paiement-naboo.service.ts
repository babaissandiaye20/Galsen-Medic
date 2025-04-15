import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IPaiementResult } from '../paiement.interface';

dotenv.config();

@Injectable()
export class PaiementNabooService {
  private readonly apiKey = `Bearer ${process.env.NABOO_API_KEY}`;

  async createTransaction(params: {
    montant: number,
    method: 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY',
    description: string
  }): Promise<IPaiementResult> {
    const payload = {
      method_of_payment: [params.method],
      products: [{
        name: "Consultation",
        category: "Santé",
        amount: Math.floor(params.montant),
        quantity: 1,
        description: params.description,
      }],
      success_url: `${process.env.API_BASE_URL}/paiement/success`,
      error_url: `${process.env.API_BASE_URL}/paiement/error`,
      is_escrow: false,
      is_merchant: true,
    };

    try {
      const { data } = await axios.put(
        'https://api.naboopay.com/api/v1/transaction/create-transaction',
        payload,
        { headers: this.getHeaders() }
      );

      return {
        paiementUrl: data.checkout_url,
        orderId: data.order_id,
        montant: data.amount_to_pay,
        statut: data.transaction_status
      };
    } catch (err) {
      console.error('Erreur Naboo:', err?.response?.data || err.message);
      throw new ConflictException('Erreur création transaction Naboo');
    }

  }

  async getOneTransaction(orderId: string): Promise<any> {
    try {
      const { data } = await axios.get(
        `https://api.naboopay.com/api/v1/transaction/get-one-transaction?order_id=${orderId}`,
        { headers: this.getHeaders() }
      );
      return data;
    } catch {
      throw new NotFoundException('Transaction introuvable');
    }
  }

  async deleteTransaction(orderId: string): Promise<string> {
    try {
      const { data } = await axios.delete(
        'https://api.naboopay.com/api/v1/transaction/delete-transaction',
        {
          headers: this.getHeaders(),
          data: { order_id: orderId }
        }
      );
      return data.message;
    } catch {
      throw new ConflictException('Erreur suppression de transaction');
    }
  }

  async cashout(params: {
    full_name: string,
    phone_number: string,
    amount: number,
    method: 'WAVE' | 'ORANGE_MONEY'
  }): Promise<any> {
    const url = `https://api.naboopay.com/api/v1/cashout/${params.method.toLowerCase()}`;
    try {
      const { data } = await axios.post(url, {
        full_name: params.full_name,
        phone_number: params.phone_number,
        amount: params.amount
      }, {
        headers: this.getHeaders()
      });

      return data;
    } catch {
      throw new ConflictException('Erreur de cashout');
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.apiKey,
    };
  }
}
