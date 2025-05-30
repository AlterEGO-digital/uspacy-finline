export const isStage = ['https://stage3.staging.uspacy.tech', 'http://localhost:8080'].includes(window.location.origin);
export const API_URL = isStage ? '' : '';

export const API_ENDPOINT = {
	generatePaymentLink: () => '/payment',
	paymentAccounts: () => '/payment',
	getSettings: () => '/settings',
	saveSettings: () => '/tokens/addToken',
};
