import { uspacySdk } from '@uspacy/sdk';
import { IResponseJwt } from '@uspacy/sdk/lib/models/jwt';

import { isDev } from '../const';
import { setToken } from './db';

export const login = (email: string, password: string): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		if (!isDev) return resolve();
		if (!email || !password) return reject(new Error('invalid credentials'));
		try {
			const res = (await uspacySdk.authService.login({ email, password })) as { data: IResponseJwt };
			await setToken(res.data?.jwt);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};
