import { registerAs } from '@nestjs/config';

export const visaGatewayConfig = registerAs('visaGateway', () => ({
  apiKey: process.env.VISA_GATEWAY_API_KEY || '',
  apiSecret: process.env.VISA_GATEWAY_API_SECRET || '',
  webhookSecret: process.env.VISA_GATEWAY_WEBHOOK_SECRET || '',
  apiUrl: process.env.VISA_GATEWAY_API_URL || 'https://api.visa-gateway.example.com',
}));
