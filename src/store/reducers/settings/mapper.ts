import { SettingsFormValues } from '../../../components/SettingsForm/types';
import { ISettingsDto } from '../../../models/settings';

export const adoptToSaveSettingsDto = (values: SettingsFormValues): ISettingsDto[] => {
	return values?.paymentAccounts
		.filter((account) => Object.values(account ?? {}).every(Boolean))
		.map((account) => {
			return {
				api_key: account.apiKey,
				api_secret: account.apiSecret,
				endpoint_id: account.endpointsKey,
				pos_id: account.posId,
				name: account.label,
			};
		});
};
