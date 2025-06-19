import { useCallback } from 'react';

import { IGeneratePaymentLinkDto } from '../models/payment';
import { useAppDispatch, useAppSelector } from '../store';
import { paymentActions } from '../store/reducers/payment';
import { generatePaymentLink as generatePaymentLinkAction } from '../store/reducers/payment/async-thunks';
import { selectGenerateError, selectIsGenerating, selectIsGeneratingSuccess, selectPaymentLink } from '../store/reducers/payment/selectors';

export const usePaymentLink = () => {
	const dispatch = useAppDispatch();
	const paymentLink = useAppSelector(selectPaymentLink);
	const isSuccess = useAppSelector(selectIsGeneratingSuccess);
	const isLoading = useAppSelector(selectIsGenerating);
	const error = useAppSelector(selectGenerateError);
	const isError = !!error;

	const generateLink = async (dto: IGeneratePaymentLinkDto) => {
		return dispatch(generatePaymentLinkAction(dto));
	};

	const reset = useCallback(() => {
		dispatch(paymentActions.resetGeneratingRequest());
	}, []);

	return {
		paymentLink,
		generateLink,
		isLoading,
		error,
		isError,
		isSuccess,
		reset,
	};
};
