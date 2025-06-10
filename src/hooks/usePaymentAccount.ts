import { useCallback } from 'react';

import { useDeletePaymentAccountMutation } from '../store/reducers/payment/api-slice';

export const usePaymentAccount = () => {
	const [deleteAsync, deleteRequest] = useDeletePaymentAccountMutation();

	const deletePaymentAccount = useCallback(
		async (id: string) => {
			await deleteAsync(id);
		},
		[deleteAsync],
	);

	return {
		deletePaymentAccount,
		isLoading: deleteRequest.isLoading,
		isError: deleteRequest.isError,
		isSuccess: deleteRequest.isSuccess,
		error: deleteRequest.error,
	};
};
