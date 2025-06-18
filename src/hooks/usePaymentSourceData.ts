import { useMemo } from 'react';

import { getCurrencyList, getRecieptDeliveryList } from '../store/reducers/payment/local-data';
import { useDeal } from './useDeal';
import { usePaymentAccountsList } from './usePaymentAccountsList';

export const usePaymentSourceData = () => {
	const { data, isLoading, isError, error, refetch } = usePaymentAccountsList();
	const { deal } = useDeal();
	const currencies = getCurrencyList();
	const reciepts = getRecieptDeliveryList();

	const emails = useMemo(() => {
		return (
			deal?.contacts
				?.map((contact) => {
					if (!Array.isArray(contact?.email)) return [];

					return contact.email.map((email) => ({ id: email?.value ?? '', label: email?.value ?? '', owner: contact?.title ?? '' }));
				})
				.flat()
				.filter((email) => !!email?.label) ?? []
		);
	}, [deal]);
	const phones = useMemo(
		() =>
			deal?.contacts?.map((contact) => ({ id: contact.phone, label: contact.phone, owner: contact.title })).filter((phone) => !!phone.label) ??
			[],
		[deal],
	);

	return {
		accounts: data,
		currencies,
		recieptDeliveryTransports: reciepts,
		emails,
		phones,
		isLoading,
		isError,
		error,
		refetchAccounts: refetch,
	};
};
