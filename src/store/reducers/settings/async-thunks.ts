import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_ENDPOINT } from '../../../const';
import { api } from '../../../helpers/api';
import { getToken } from '../../../helpers/db';
import { getErrorMessage } from '../../../helpers/errors';
import { IDealStatus, IDealStatusDto, ISettingsDto } from '../../../models/settings';

export const fetchDealStatus = createAsyncThunk<IDealStatus | null, void, { rejectValue: { message: string } }>(
	'settings/fetchDealStatus',
	async (_, thunkAPI) => {
		try {
			const token = await getToken();
			const response = await api.get<IDealStatus>(API_ENDPOINT.dealStatus(), {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error: Anything) {
			return thunkAPI.rejectWithValue(getErrorMessage(error));
		}
	},
);

export const saveSettings = createAsyncThunk<void, ISettingsDto, { rejectValue: { message: string } }>(
	'settings/saveSettings',
	async (dto, thunkAPI) => {
		try {
			const token = await getToken();
			await api.post(API_ENDPOINT.saveSettings(), dto.accounts, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error: Anything) {
			return thunkAPI.rejectWithValue(getErrorMessage(error));
		}
	},
);

export const saveDealStatus = createAsyncThunk<IDealStatus, IDealStatusDto, { rejectValue: { message: string } }>(
	'settings/saveDealStatus',
	async (dto, thunkAPI) => {
		try {
			const token = await getToken();
			await api.post(API_ENDPOINT.saveDealStatus(), dto, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return { status: dto.status };
		} catch (error: Anything) {
			return thunkAPI.rejectWithValue(getErrorMessage(error));
		}
	},
);
