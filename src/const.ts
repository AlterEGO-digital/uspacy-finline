export const isStage = ['https://stage3.staging.uspacy.tech', 'http://localhost:8080'].includes(window.location.origin);
export const API_URL = isStage ? 'http://test-finline.alterego.biz.ua' : 'https://finline.alterego.digital/finline';

const API_PREFIX = 'Laravel/v1';

export const API_ENDPOINT = {
	generatePaymentLink: () => `${API_PREFIX}/link/generate`,
	paymentAccounts: () => `${API_PREFIX}/accounts`,
	saveSettings: () => `${API_PREFIX}/accounts/store`,
	dealStatus: () => `${API_PREFIX}/pay-status`,
	saveDealStatus: () => `${API_PREFIX}/pay-status/store`,
	deletePaymentAccount: (id: string) => `${API_PREFIX}/accounts/destroy/${id}`,
};
