import { IGeneratePaymentLinkDto } from '../models/payment';
import { useGeneratePaymentLinkMutation } from '../store/reducers/payment/api-slice';

export const usePaymentLink = () => {
	const [generateLinkAsync, { data, isLoading, error, isError, isSuccess, reset }] = useGeneratePaymentLinkMutation();

	const generateLink = async (dto: IGeneratePaymentLinkDto) => {
		return await generateLinkAsync(dto);
	};

	return {
		generateLink,
		isLoading,
		error,
		isError,
		isSuccess,
		data,
		reset,
	};
};
