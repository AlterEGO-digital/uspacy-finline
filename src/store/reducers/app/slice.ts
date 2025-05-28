import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDeal } from '../../../models/deal';
import { RootState } from '../..';

type State = {
	deal: NullOr<IDeal>;
};
const initialState = {
	deal: null,
} as State;

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		hydrateDeal: (state, action: PayloadAction<{ deal: IDeal }>) => {
			state.deal = action.payload.deal;
		},
		clearDeal: (state) => {
			state.deal = null;
		},
	},
});

export const appActions = appSlice.actions;

export const selectDeal = createDraftSafeSelector(
	(state: RootState) => state.app,
	(state) => state.deal,
);
