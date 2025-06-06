import { useCallback } from 'react';

import { IDealStatusDto } from '../models/settings';
import { useGetDealStatusQuery, useSaveDealMutation } from '../store/reducers/settings/api-slice';

export const useDealStatus = () => {
	const { data, isError, isFetching, isLoading, isSuccess, error, refetch } = useGetDealStatusQuery();
	const [saveDealStatusAsync, saveDealStatusRequest] = useSaveDealMutation();

	const saveDealStatus = useCallback(
		async (dto: IDealStatusDto) => {
			return await saveDealStatusAsync(dto);
		},
		[saveDealStatusAsync],
	);

	return {
		status: String(data?.status ?? ''),
		isError,
		isFetching,
		isLoading,
		isSuccess,
		error,
		refetch,
		saveDealStatus,
		isSaving: saveDealStatusRequest.isLoading,
		isSaveError: saveDealStatusRequest.isError,
		isSaved: saveDealStatusRequest.isSuccess,
		saveError: saveDealStatusRequest.error,
	};
};
