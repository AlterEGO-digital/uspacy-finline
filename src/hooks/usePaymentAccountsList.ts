import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { fetchPaymentAccounts } from '../store/reducers/payment/async-thunks';
import {
	selectAccountsError,
	selectAccountsUninitialized,
	selectIsAccountsLoading,
	selectPaymentAccounts,
} from '../store/reducers/payment/selectors';
import { useIntegrationToken } from './useIntegrationToken';

export const usePaymentAccountsList = () => {
	const dispatch = useAppDispatch();

	const { token } = useIntegrationToken();
	const data = useAppSelector(selectPaymentAccounts);
	const isLoading = useAppSelector(selectIsAccountsLoading);
	const error = useAppSelector(selectAccountsError);
	const isUninitialized = useAppSelector(selectAccountsUninitialized);
	const isError = !!error;

	useEffect(() => {
		if (isUninitialized && token) {
			dispatch(fetchPaymentAccounts());
		}
	}, [isUninitialized, token]);

	const refetch = useCallback(() => {
		dispatch(fetchPaymentAccounts());
	}, []);

	return {
		data,
		isLoading: isLoading || !token,
		isError,
		error,
		refetch,
	};
};
