import { SettingsFormValues } from '../../../components/SettingsForm/types';
import { IDealStatusDto, ISettingsDto } from '../../../models/settings';

export const adaptToSaveSettingsDto = (values: SettingsFormValues): ISettingsDto => {
	return {
		accounts: values?.paymentAccounts
			.filter((account) => Object.values(account ?? {}).every(Boolean))
			.map((account) => {
				return {
					api_key: account.apiKey,
					api_secret: account.apiSecret,
					endpoint_id: account.endpointsKey,
					pos_id: account.posId,
					name: account.label,
				};
			}),
	};
};

export const adaptToSaveDealStatusDto = (values: SettingsFormValues): IDealStatusDto => {
	return {
		status: String(values?.stage?.id ?? ''),
	};
};
