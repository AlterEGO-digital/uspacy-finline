export type RecieptDeliveryChannel = 'email' | 'sms' | 'viber' | 'none';
export type PaymentCurrency = 'UAH' | 'USD' | 'EUR';

export interface IGeneratePaymentLinkDto {
	description: string;
	amount: number;
	currency: string;
	email: string;
	phone: string;
	payment_account: string;
	receipt_delivery: RecieptDeliveryChannel;
}
