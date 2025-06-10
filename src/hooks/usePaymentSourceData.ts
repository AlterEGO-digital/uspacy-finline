import { useMemo } from 'react';

import { useGetCurrencyListQuery, useGetPaymentAccountsListQuery, useGetRecieptDeliveryListQuery } from '../store/reducers/payment/api-slice';
import { useDeal } from './useDeal';

// TODO: delete once BE is ready. Now it is mok data for testing
const a = [
	{ id: '1', label: 'Fop' },
	{ id: '2', label: 'TOB' },
];

export const usePaymentSourceData = () => {
	const accauntPayment = useGetPaymentAccountsListQuery();
	const currencyPayment = useGetCurrencyListQuery();
	const recieptDelivery = useGetRecieptDeliveryListQuery();
	const { deal } = useDeal();

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

	const emails = useMemo(
		() =>
			deal?.contacts
				?.map((contact) => contact.email.map((email) => ({ id: email.value, label: email.value, owner: contact.title })))
				.flat()
				.filter((email) => !!email.label) ?? [],
		[deal],
	);
	const phones = useMemo(
		() =>
			deal?.contacts?.map((contact) => ({ id: contact.phone, label: contact.phone, owner: contact.title })).filter((phone) => !!phone.label) ??
			[],
		[deal],
	);

	return {
		accounts: accauntPayment.data ?? a,
		currencies: currencyPayment.data ?? [],
		recieptDeliveryTransports: recieptDelivery.data ?? [],
		emails,
		phones,
		isLoading,
		isError,
		error,
	};
};
