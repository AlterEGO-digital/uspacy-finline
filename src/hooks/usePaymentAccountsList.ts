import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { fetchPaymentAccounts } from '../store/reducers/payment/async-thunks';
import {
	selectAccountsError,
	selectAccountsUninitialized,
	selectIsAccountsLoading,
	selectPaymentAccounts,
} from '../store/reducers/payment/selectors';

export const usePaymentAccountsList = () => {
	const dispatch = useAppDispatch();

	const data = useAppSelector(selectPaymentAccounts);
	const isLoading = useAppSelector(selectIsAccountsLoading);
	const error = useAppSelector(selectAccountsError);
	const isUninitialized = useAppSelector(selectAccountsUninitialized);
	const isError = !!error;

	useEffect(() => {
		if (isUninitialized) {
			dispatch(fetchPaymentAccounts());
		}
	}, [isUninitialized]);

	const refetch = useCallback(() => {
		dispatch(fetchPaymentAccounts());
	}, []);

	return {
		data,
		isLoading,
		isError,
		error,
		refetch,
	};
};
