export const isStage = ['https://stage3.staging.uspacy.tech', 'http://localhost:8080'].includes(window.location.origin);
export const API_URL = isStage ? 'https://test-sendpulse.alterego.biz.ua/sendpulse/v1' : 'https://sendpulse.alterego.digital/sendpulse/v1';

export const API_ENDPOINT = {
	generatePaymentLink: () => '/payment',
	paymentAccounts: () => '/payment',
	getSettings: () => '/tokens/getTokenInfo',
	saveSettings: () => '/tokens/addToken',
};
