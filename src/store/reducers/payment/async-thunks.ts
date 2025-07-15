import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINT } from '../../../const';
import { api } from '../../../helpers/api';
import { getToken } from '../../../helpers/db';
import { getErrorMessage } from '../../../helpers/errors';
import { IGeneratePaymentLinkDto, IGeneratePaymentLinkResponse } from '../../../models/payment';
import { normalizePaymentAccount } from './mapper';

export const fetchPaymentAccounts = createAsyncThunk('payments/fetchPaymentAccounts', async (_, thunkAPI) => {
	try {
		const token = await getToken();
		const res = await api.get(API_ENDPOINT.paymentAccounts(), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const accounts = res.data.map(normalizePaymentAccount);
		return accounts;
	} catch (error: Anything) {
		return thunkAPI.rejectWithValue(getErrorMessage(error));
	}
});

export const deletePaymentAccount = createAsyncThunk('payments/deletePaymentAccount', async (id: string, thunkAPI) => {
	try {
		const token = await getToken();
		await api.delete(API_ENDPOINT.deletePaymentAccount(id), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return id;
	} catch (error: Anything) {
		return thunkAPI.rejectWithValue(getErrorMessage(error));
	}
});

export const generatePaymentLink = createAsyncThunk('payments/generatePaymentLink', async (dto: IGeneratePaymentLinkDto, thunkAPI) => {
	try {
		const token = await getToken();
		const response = await api.post<IGeneratePaymentLinkResponse>(API_ENDPOINT.generatePaymentLink(), dto, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data?.payLink;
	} catch (error: Anything) {
		return thunkAPI.rejectWithValue(getErrorMessage(error));
	}
});
