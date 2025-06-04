export enum PaymentCurrencyEnum {
	'UAH' = 'UAH',
	'USD' = 'USD',
	'EUR' = 'EUR',
}

export enum RecieptDeliveryEnum {
	'Email' = 'Email',
	'SMS' = 'SMS',
	'Viber' = 'Viber',
	'None' = 'None',
}

export interface IGeneratePaymentLinkDto {
	order_id: string;
	description: string;
	amount: string;
	currency: PaymentCurrencyEnum;
	customer_email: string;
	customer_phone: string;
	payment_account: string;
	f_receipt_delivery: string;
}
export interface IRawPaymentAccount {
	name: string;
	id: string;
}
export interface IPaymentAccount {
	label: string;
	id: string;
}
