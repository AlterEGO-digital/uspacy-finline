import { isAxiosError } from 'axios';

import { isObject, isString } from './typeGuards';

export const getErrorMessage = (err: unknown) => {
	if (isString(err)) {
		return { message: err };
	}
	if (err instanceof Error) {
		return { message: err.message ?? '' };
	}
	if (isObject(err) && 'message' in err) {
		return { message: err.message as string };
	}
	if (isAxiosError(err)) {
		return { message: err.response.data?.message || err.response?.data };
	}

	return { message: 'Something went wrong' };
};
