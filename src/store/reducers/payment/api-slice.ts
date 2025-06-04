import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT, API_URL } from '../../../const';
import { IGeneratePaymentLinkDto, IPaymentAccount, IRawPaymentAccount, PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';
import { normalizePaymentAccount } from './mapper';

const cacheKey = 'PAYMENTS';
export const paymentApi = createApi({
	reducerPath: 'paymentApi',
	tagTypes: [cacheKey],
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
		deletePaymentAccount: builder.mutation<{ success: boolean }, string>({
			query: (id) => ({ url: API_ENDPOINT.deletePaymentAccount(id), method: 'DELETE' }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
			transformResponse: () => ({ success: true }),
			invalidatesTags: (res) => (res?.success ? [cacheKey] : []),
		}),
		getPaymentAccountsList: builder.query<IPaymentAccount[], void>({
			query: () => ({ url: API_ENDPOINT.paymentAccounts(), method: 'GET' }),
			transformResponse: (res: IRawPaymentAccount[]) => res.map(normalizePaymentAccount),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
			providesTags: [cacheKey],
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

export const {
	useDeletePaymentAccountMutation,
	useGeneratePaymentLinkMutation,
	useGetPaymentAccountsListQuery,
	useGetCurrencyListQuery,
	useGetRecieptDeliveryListQuery,
} = paymentApi;
