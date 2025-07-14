import { IDeal } from '../../../models/deal';
import { AppAction, CLEAR_DEAL, HYDRATE_DEAL, SET_INTEGRATION_TOKEN } from './actions';

export type AppState = {
	deal: IDeal | null;
	integrationToken: string;
};

const initialState: AppState = {
	deal: null,
	integrationToken: '',
};

export const appReducer = (state = initialState, action: AppAction): AppState => {
	switch (action.type) {
		case HYDRATE_DEAL:
			return {
				...state,
				deal: action.payload.deal,
			};
		case CLEAR_DEAL:
			return {
				...state,
				deal: null,
			};
		case SET_INTEGRATION_TOKEN:
			return {
				...state,
				integrationToken: action.payload.token,
			};
		default:
			return state;
	}
};
