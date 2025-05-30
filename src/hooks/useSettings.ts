import { useCallback } from 'react';

import { ISettingsDto } from '../models/settings';
import { useGetSettingsQuery, useSaveSettingsMutation } from '../store/reducers/settings/api-slice';

export const useSettings = () => {
	const settings = useGetSettingsQuery();
	const [saveAsync, request] = useSaveSettingsMutation();

	const save = useCallback(
		async (dto: ISettingsDto) => {
			await saveAsync(dto);
		},
		[saveAsync],
	);

	const isLoading = settings.isLoading || settings.isFetching;
	const isError = settings.isError;
	const error = settings.error;

	return {
		settings: settings.data,
		save,
		isError,
		isLoading,
		error,
		isSaving: request.isLoading,
		isSaved: request.isSuccess,
		isSaveFailed: request.isError,
		saveError: request.error,
	};
};
