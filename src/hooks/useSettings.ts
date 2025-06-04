import { useCallback } from 'react';

import { ISettingsDto } from '../models/settings';
import { useGetPaymentAccountsListQuery } from '../store/reducers/payment/api-slice';
import { useSaveSettingsMutation } from '../store/reducers/settings/api-slice';

export const useSettings = () => {
	const settings = useGetPaymentAccountsListQuery();
	const [saveAsync, request] = useSaveSettingsMutation();

	const save = useCallback(
		async (dto: ISettingsDto[]) => {
			await saveAsync(dto);
		},
		[saveAsync],
	);

	const isLoading = settings.isLoading || settings.isFetching;
	const isError = settings.isError;
	const error = settings.error;

	return {
		accounts: settings?.data ?? [
			{ id: '1', label: 'tovsad dma sdasdas lasdlasldl dlasldasld wlalwdlsdlkasld kawokaldaskd oawdkaldakkowekafla mdlakdkoarkads' },
			{ id: '2', label: 'fop' },
			{ id: '3', label: 'fop' },
			{ id: '4', label: 'fop' },
			{ id: '5', label: 'fop' },
			{ id: '6', label: 'fop' },
			{ id: '7', label: 'fop' },
			{ id: '8', label: 'fop' },
			{ id: '9', label: 'fop' },
			{ id: '10', label: 'fop' },
		],
		save,
		isError,
		isLoading,
		error,
		isSaving: request.isLoading,
		isSaved: request.isSuccess,
		isSaveFailed: request.isError,
		saveError: request.error,
		refetch: settings.refetch,
	};
};
