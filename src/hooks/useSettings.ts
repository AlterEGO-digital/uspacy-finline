import { useState } from 'react';

import { IDealStatusDto, ISettingsDto } from '../models/settings';
import { useGetPaymentAccountsListQuery } from '../store/reducers/payment/api-slice';
import { useSaveSettingsMutation } from '../store/reducers/settings/api-slice';
import { useDealStatus } from './useDealStatus';

export const useSettings = () => {
	const [isSavingSettings, setIsSavingSettings] = useState(false);

	const accounts = useGetPaymentAccountsListQuery();
	const dealStatus = useDealStatus();
	const [saveAsync, request] = useSaveSettingsMutation();
	const { saveDealStatus, ...dealStatusRequest } = useDealStatus();

	const save = async (settingsDto: ISettingsDto, statusDto: IDealStatusDto) => {
		try {
			setIsSavingSettings(true);
			await saveAsync(settingsDto);
			accounts.refetch();
			await saveDealStatus(statusDto);
		} finally {
			setIsSavingSettings(false);
		}
	};

	const isLoading = accounts.isLoading || dealStatus.isLoading;
	const isError = accounts.isError;
	const error = accounts.error;

	return {
		accounts: accounts?.data,
		dealPaymentStatus: dealStatus.status,
		save,
		isError,
		isLoading,
		error,
		isSaving: isSavingSettings,
		isSaved: request.isSuccess && dealStatusRequest.isSaved,
		isSaveFailed: request.isError || dealStatusRequest.isSaveError,
		saveError: request.error || dealStatusRequest.saveError,
		refetch: accounts.refetch,
		requestId: request.requestId,
	};
};
