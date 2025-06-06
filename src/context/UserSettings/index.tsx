import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '@uspacy/store';
import { useAppDispatch, useAppSelector } from '@uspacy/store/lib/hooks/redux';
import { fetchFunnels } from '@uspacy/store/lib/store/crm/funnels/actions';
import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

import { FunnelOption, IProps, IUserSettingsContext, StageOption } from './types';

export const UserSettingsContext = createContext<NullOr<IUserSettingsContext>>(null);
export const useUserSettingsContext = () => {
	const ctx = useContext<IUserSettingsContext>(UserSettingsContext);

	if (!ctx) throw new Error('useUserSettingsContext must be used under UserSettingsContext');

	return ctx;
};

const selectDeals = createDraftSafeSelector(
	(state: RootState) => state.crm,
	(crm) => {
		const { loading, data = [], errorMessage } = crm?.funnels?.['deals'] || {};

		return {
			funnels: data,
			isLoading: loading,
			error: errorMessage,
		};
	},
);

const Provider: React.FC<IProps> = ({ children, userSettings }) => {
	const dispatch = useAppDispatch();
	const { funnels, isLoading, error } = useAppSelector(selectDeals);

	const funnelsState = useMemo(() => {
		return {
			funnelStagesOptionsMap: new Map(funnels.map((funnel) => [funnel.id, funnel.stages])),
			funnelsOptionsMap: new Map(funnels.map((funnel) => [funnel.id, funnel])),
			funnelsOptions: funnels.map((funnel) => ({ id: funnel.id, label: funnel.title })),
		};
	}, [funnels]);

	useEffect(() => {
		dispatch(fetchFunnels('deals'));
	}, []);

	const getStagesByFunnel = useCallback(
		(option: FunnelOption) => {
			return funnelsState.funnelStagesOptionsMap.get(option.id)?.map((stage) => ({ id: stage.id, label: stage.title })) ?? [];
		},
		[funnelsState],
	);
	const getFunnelById = useCallback(
		(id: FunnelOption['id']) => {
			const original = funnelsState.funnelsOptionsMap.get(id);
			return original ? { id: original.id, label: original.title } : ({ label: '', id: 0 } as FunnelOption);
		},
		[funnelsState],
	);
	const getStageById = useCallback(
		(id: StageOption['id'], funnel: FunnelOption) => {
			const original = getStagesByFunnel(funnel);
			return original.find((stage) => stage.id === id);
		},
		[funnelsState, getStagesByFunnel],
	);
	const getFunnelStagePairByStage = useCallback(
		(id: string) => {
			const fallback = { label: '', id: 0 };
			let stage: StageOption = fallback as StageOption;
			const rawFunnel = funnels.find((f) =>
				f.stages.find((s) => {
					const matches = s.id === Number(id);

					if (matches) {
						stage = { id: s.id, label: s.title };
					}

					return matches;
				}),
			);
			const funnel = rawFunnel ? { id: rawFunnel.id, label: rawFunnel.title } : (fallback as FunnelOption);

			return { funnel, stage };
		},
		[funnels],
	);

	const ctx = useMemo(() => {
		return {
			dealStatus: '',
			userSettings,
			funnels: funnelsState.funnelsOptions,
			getStagesByFunnel,
			getFunnelById,
			getStageById,
			getFunnelStagePairByStage,
			error,
			isLoading,
		};
	}, [userSettings, getStagesByFunnel, getFunnelById, getStageById, getFunnelStagePairByStage, funnelsState]);

	return <UserSettingsContext.Provider value={ctx}>{children}</UserSettingsContext.Provider>;
};

export default Provider;
