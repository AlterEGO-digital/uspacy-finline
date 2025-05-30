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
	id: string;
	description: string;
	amount: string;
	currency: PaymentCurrencyEnum;
	email: string;
	phone: string;
	payment_account: string;
	receipt_delivery: RecieptDeliveryEnum;
}
export interface IPaymentAccount {
	label: string;
	id: string;
}
