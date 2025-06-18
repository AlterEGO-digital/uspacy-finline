import { useCallback, useState } from 'react';

import { IDealStatusDto, ISettingsDto } from '../models/settings';
import { useAppDispatch, useAppSelector } from '../store';
import { saveDealStatus as saveDealStatusAction, saveSettings as saveSettingsAction } from '../store/reducers/settings/async-thunks';
import { selectIsSavingSettings, selectIsSettingsSaved, selectSettingsError, selectSettingsRequestId } from '../store/reducers/settings/selectors';
import { useDealStatus } from './useDealStatus';
import { usePaymentAccountsList } from './usePaymentAccountsList';

export const useSettings = () => {
	const [isLongProcessing, setIsLongProcessing] = useState(false);
	const dispatch = useAppDispatch();
	const isSaving = useAppSelector(selectIsSavingSettings);
	const settingsError = useAppSelector(selectSettingsError);
	const isSettingsSaved = useAppSelector(selectIsSettingsSaved);
	const requestId = useAppSelector(selectSettingsRequestId);
	const isSavingError = !!settingsError;

	const dealStatus = useDealStatus();
	const { data: accounts, ...accountsRequest } = usePaymentAccountsList();

	const save = useCallback(
		async (settingsDto: ISettingsDto, statusDto: IDealStatusDto) => {
			setIsLongProcessing(true);

			try {
				await dispatch(saveSettingsAction(settingsDto)).unwrap();
				await dispatch(saveDealStatusAction(statusDto)).unwrap();
			} finally {
				setIsLongProcessing(false);
			}
		},
		[dispatch],
	);

	return {
		accounts,
		dealPaymentStatus: dealStatus.status,
		save,
		isError: accountsRequest.isError,
		isLoading: accountsRequest.isLoading,
		error: accountsRequest.error,
		isSaving: isLongProcessing || isSaving,
		isSaved: isSettingsSaved,
		isSaveFailed: isSavingError,
		saveError: settingsError,
		refetch: accountsRequest.refetch,
		requestId,
	};
};
