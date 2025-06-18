import { useCallback, useEffect } from 'react';

import { IDealStatusDto } from '../models/settings';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchDealStatus, saveDealStatus as saveDealStatusAction } from '../store/reducers/settings/async-thunks';
import {
	selectDealStatus,
	selectDealStatusError,
	selectIsDealStatusSaved,
	selectIsLoading,
	selectIsSavingDealStatus,
} from '../store/reducers/settings/selectors';

export const useDealStatus = () => {
	const dealStatus = useAppSelector(selectDealStatus);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsLoading);
	const isSaving = useAppSelector(selectIsSavingDealStatus);
	const dealStatusError = useAppSelector(selectDealStatusError);
	const isSaved = useAppSelector(selectIsDealStatusSaved);
	const isError = !!dealStatusError;

	useEffect(() => {
		if (!dealStatus && !isLoading) {
			dispatch(fetchDealStatus());
		}
	}, [isLoading, dealStatus]);

	const saveDealStatus = useCallback(async (dto: IDealStatusDto) => {
		return dispatch(saveDealStatusAction(dto));
	}, []);

	const refetch = useCallback(() => {
		dispatch(fetchDealStatus());
	}, []);

	return {
		status: dealStatus,
		isError,
		isLoading,
		error: dealStatusError,
		refetch,
		saveDealStatus,
		isSaving,
		isSaved,
		isSaveError: isError,
		saveError: dealStatusError,
	};
};
