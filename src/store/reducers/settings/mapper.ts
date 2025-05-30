import { SettingsFormValues } from '../../../components/SettingsForm/types';
import { ISettingsDto } from '../../../models/settings';

export const adoptToSaveSettingsDto = (values: SettingsFormValues): ISettingsDto => {
	return {
		apiKey: values.apiKey,
		apiSecret: values.apiSecret,
		paymentAccounts: values.paymentAccounts
			.filter((account) => Object.values(account ?? {}).every(Boolean))
			.map((account) => ({
				endpoints_key: account.endpointsKey,
				name: account.label,
				pos_id: account.posId,
			})),
	};
};
