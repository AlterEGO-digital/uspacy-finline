import { uspacySdk } from '@uspacy/sdk';

import { setToken } from './db';

const isDev = process.env.NODE_ENV === 'development';

export const login = (email: string, password: string): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		if (!isDev) return resolve();
		if (!email || !password) return reject(new Error('invalid credentials'));
		try {
			const res = await uspacySdk.authService.login({ email, password });
			// @ts-expect-error
			await setToken(res.data.jwt);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};
