import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { deletePaymentAccount as deletePaymentAccountAction } from '../store/reducers/payment/async-thunks';
import { selectDeleteError, selectIsDeleting } from '../store/reducers/payment/selectors';

export const usePaymentAccount = () => {
	const [isLocalLoading, setIsLocalLoading] = useState(false);

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsDeleting);
	const error = useAppSelector(selectDeleteError);
	const isError = !!error;

	const deletePaymentAccount = useCallback(async (candidateId: string) => {
		try {
			setIsLocalLoading(true);
			await dispatch(deletePaymentAccountAction(candidateId));
		} finally {
			setIsLocalLoading(false);
		}
	}, []);

	return {
		deletePaymentAccount,
		isLoading,
		isError,
		error,
		isLocalLoading,
	};
};
