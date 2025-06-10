import { SettingsFormValues } from '../types';

export const getInitialFormValues = (): SettingsFormValues => {
	const accountFallback = [{ endpointsKey: '', posId: '', label: '', apiKey: '', apiSecret: '' }];

	return {
		paymentAccounts: accountFallback,
		funnel: { label: '', id: '' },
		stage: { label: '', id: '' },
	};
};
