interface ISettingPaymentAccount {
	api_key: string;
	api_secret: string;
	pos_id: string;
	endpoint_id: string;
	name: string;
}
export interface ISettingsDto {
	accounts: ISettingPaymentAccount[];
}
export interface IDealStatusDto {
	status: string;
}

export interface IDealStatus {
	status: string;
}
