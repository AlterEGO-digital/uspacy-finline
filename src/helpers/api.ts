import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { API_URL } from '../const';
import { getToken } from './db';

export const api = axios.create({
	baseURL: API_URL,
});

export const baseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: '' },
	): BaseQueryFn<
		{
			url: string;
			method?: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			headers?: AxiosRequestConfig['headers'];
		},
		unknown,
		FetchBaseQueryError
	> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const token = await getToken();
			const result = await api({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					...(headers ?? {}),
				},
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
