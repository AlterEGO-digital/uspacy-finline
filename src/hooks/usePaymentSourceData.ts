import { useGetCurrencyListQuery, useGetPaymentAccountsListQuery, useGetRecieptDeliveryListQuery } from '../store/reducers/payment/api-slice';

export const usePaymentSourceData = () => {
	const accauntPayment = useGetPaymentAccountsListQuery();
	const currencyPayment = useGetCurrencyListQuery();
	const recieptDelivery = useGetRecieptDeliveryListQuery();

	const isLoading =
		accauntPayment.isLoading ||
		accauntPayment.isFetching ||
		currencyPayment.isLoading ||
		currencyPayment.isFetching ||
		recieptDelivery.isLoading ||
		recieptDelivery.isFetching;
	const isError =
		accauntPayment.isError ||
		accauntPayment.isError ||
		currencyPayment.isError ||
		currencyPayment.isError ||
		recieptDelivery.isError ||
		recieptDelivery.isError;
	const error =
		accauntPayment.error ||
		accauntPayment.error ||
		currencyPayment.error ||
		currencyPayment.error ||
		recieptDelivery.error ||
		recieptDelivery.error;

	return {
		accounts: accauntPayment.data ?? [],
		currency: currencyPayment.data ?? [],
		isLoading,
		isError,
		error,
	};
};
