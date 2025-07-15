import { IDeal } from '../../../models/deal';
import { AppAction, CLEAR_DEAL, HYDRATE_DEAL } from './actions';

export type AppState = {
	deal: IDeal | null;
};

const initialState: AppState = {
	deal: null,
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
		default:
			return state;
	}
};
