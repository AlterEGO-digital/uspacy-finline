import { ISettings } from '../../../models/settings';
import { SettingsFormValues } from '../types';

export const getInitialFormValues = (settings: ISettings): SettingsFormValues => {
	const accountFallback = [{ endpointsKey: '', posId: '', label: '' }];

	return {
		apiKey: settings?.apiKey ?? '',
		apiSecret: settings?.apiSecret ?? '',
		paymentAccounts:
			settings?.paymentAccounts?.map((account) => ({
				posId: account.pos_id,
				endpointsKey: account.endpoints_key,
				label: account.name,
			})) ?? accountFallback,
	};
};
