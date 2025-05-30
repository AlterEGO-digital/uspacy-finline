export interface IPaymentAccountDto {
	pos_id: string;
	endpoints_key: string;
	name: string;
}
export interface ISettings {
	apiKey: string;
	apiSecret: string;
	paymentAccounts?: IPaymentAccount[];
}

export interface ISettingsDto {
	apiKey: string;
	apiSecret: string;
	paymentAccounts?: IPaymentAccountDto[];
}
