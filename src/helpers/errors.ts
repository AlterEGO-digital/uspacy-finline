import { isAxiosError } from 'axios';

export const getErrorMessage = (err: unknown) => {
	if (err instanceof Error) {
		return err.message ?? '';
	}
	if (isAxiosError(err)) {
		return err.response.data?.message || err.response.data;
	}

	return 'Something went wrong';
};
