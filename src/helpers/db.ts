import { uspacySdk } from '@uspacy/sdk';
import localforage from 'localforage';

import { isDev } from '../const';

export const getOrCreateTable = (storeName: string) => {
	return localforage.createInstance({
		name: 'Uspacy',
		storeName,
	});
};

const table = getOrCreateTable('tokens');

export const setToken = (token: string): Promise<string> => {
	return table.setItem('token', token);
};

export const getToken = async (): Promise<string> => {
	if (isDev) {
		return table.getItem('token');
	}

	const token = await uspacySdk.tokensService.getToken();

	return token;
};

export const setIntegrationToken = async (token: string): Promise<string> => {
	return table.setItem('finline:integration_token', token);
};
export const getIntegrationToken = async (): Promise<string> => {
	const token = await table.getItem<string>('finline:integration_token');

	return token;
};

export const removeToken = (): Promise<void> => {
	return table.removeItem('token');
};
