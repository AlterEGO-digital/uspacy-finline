import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT, API_URL } from '../../../const';
import { IGeneratePaymentLinkDto, IPaymentAccount, PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';

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
		getPaymentAccountsList: builder.query<IPaymentAccount[], void>({
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
		getCurrencyList: builder.query<PaymentCurrencyEnum[], void>({
			queryFn: () => {
				return {
					data: ['UAH', 'USD', 'EUR'] as PaymentCurrencyEnum[],
				};
			},
		}),
		getRecieptDeliveryList: builder.query<RecieptDeliveryEnum[], void>({
			queryFn: () => {
				return {
					data: ['None', 'Email', 'SMS', 'Viber'] as RecieptDeliveryEnum[],
				};
			},
		}),
	}),
});

export const { useGeneratePaymentLinkMutation, useGetPaymentAccountsListQuery, useGetCurrencyListQuery, useGetRecieptDeliveryListQuery } = paymentApi;
