import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT, API_URL } from '../../../const';
import { IGeneratePaymentLinkDto, PaymentCurrency, RecieptDeliveryChannel } from '../../../models/payment';

export const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		generatePaymentLink: builder.mutation<void, IGeneratePaymentLinkDto>({
			query: (dto) => ({ url: API_ENDPOINT.generatePaymentLink(), method: 'POST', body: JSON.stringify(dto) }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
		}),
		getPaymentAccountsList: builder.query<void, void>({
			query: () => ({ url: API_ENDPOINT.paymentAccounts(), method: 'GET' }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
		}),
		getCurrencyList: builder.query<PaymentCurrency[], void>({
			queryFn: () => {
				return {
					data: ['UAH', 'USD', 'EUR'],
				};
			},
		}),
		getRecieptDeliveryList: builder.query<RecieptDeliveryChannel[], void>({
			queryFn: () => {
				return {
					data: ['none', 'email', 'sms', 'viber'],
				};
			},
		}),
	}),
});

export const { useGeneratePaymentLinkMutation, useGetPaymentAccountsListQuery, useGetCurrencyListQuery, useGetRecieptDeliveryListQuery } = paymentApi;
