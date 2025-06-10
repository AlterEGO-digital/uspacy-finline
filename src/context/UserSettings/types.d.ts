import { IFunnel } from '@uspacy/sdk/lib/models/crm-funnel';
import React from 'react';

import { IUserSettings } from '../../models/userSettings';

export interface IProps {
	children?: React.ReactNode;
	userSettings?: IUserSettings;
}

type FunnelOption = {
	id: IFunnel['id'];
	label: IFunnel['title'];
};
type StageOption = {
	id: IFunnel['stages'][number]['id'];
	label: IFunnel['stages'][number]['title'];
};
export interface IUserSettingsContext {
	userSettings?: IUserSettings;
	dealStatus: string;
	funnels: FunnelOption[];
	getStagesByFunnel: (funnel: FunnelOption) => StageOption[];
	getFunnelById: (id: FunnelOption['id']) => FunnelOption;
	getStageById: (id: StageOption['id'], funnel: FunnelOption) => StageOption;
	getFunnelStagePairByStage: (id: string) => { funnel: FunnelOption; stage: StageOption };
	isLoading: boolean;
	error?: string;
}
