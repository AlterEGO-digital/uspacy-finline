import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT, API_URL } from '../../../const';
import { ISettingsDto } from '../../../models/settings';

export const settingsApi = createApi({
	reducerPath: 'settingsApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		saveSettings: builder.mutation<void, ISettingsDto[]>({
			query: (dto) => ({ url: API_ENDPOINT.saveSettings(), method: 'POST', body: JSON.stringify(dto) }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
		}),
	}),
});

export const { useSaveSettingsMutation } = settingsApi;
