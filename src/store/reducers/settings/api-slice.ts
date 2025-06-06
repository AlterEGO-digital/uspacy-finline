import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT } from '../../../const';
import { baseQuery } from '../../../helpers/api';
import { IDealStatus, IDealStatusDto, ISettingsDto } from '../../../models/settings';

export const settingsApi = createApi({
	reducerPath: 'settingsApi',
	baseQuery: baseQuery(),
	endpoints: (builder) => ({
		saveSettings: builder.mutation<void, ISettingsDto>({
			query: (dto) => ({ url: API_ENDPOINT.saveSettings(), method: 'POST', data: dto.accounts }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
		}),
		getDealStatus: builder.query<IDealStatus, void>({
			query: () => ({ url: API_ENDPOINT.dealStatus(), method: 'GET' }),
			transformErrorResponse: (error) => {
				if (error.status === 401 || error.status === 403) {
					return null;
				}

				return {
					message: error.data,
				};
			},
		}),
		saveDeal: builder.mutation<void, IDealStatusDto>({
			query: (dto) => ({ url: API_ENDPOINT.saveDealStatus(), method: 'POST', data: dto }),
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

export const { useSaveSettingsMutation, useGetDealStatusQuery, useSaveDealMutation } = settingsApi;
