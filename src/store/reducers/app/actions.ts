import { IDeal } from '../../../models/deal';
export const HYDRATE_DEAL = 'app/HYDRATE_DEAL';
export const CLEAR_DEAL = 'app/CLEAR_DEAL';
export const SET_INTEGRATION_TOKEN = 'app/SET_INTEGRATION_TOKEN';

export const hydrateDeal = (deal: IDeal) =>
	({
		type: HYDRATE_DEAL,
		payload: { deal },
	} as const);

export const clearDeal = () =>
	({
		type: CLEAR_DEAL,
	} as const);
export const setIntegrationToken = (token: string) =>
	({
		type: SET_INTEGRATION_TOKEN,
		payload: { token },
	} as const);

export type AppAction = ReturnType<typeof hydrateDeal> | ReturnType<typeof clearDeal> | ReturnType<typeof setIntegrationToken>;
