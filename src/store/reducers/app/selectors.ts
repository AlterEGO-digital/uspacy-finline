import { IDeal } from '../../../models/deal';
import { RootState } from '../..';

export const selectDeal = (state: RootState): IDeal | null => {
	const deal = state.app.deal;

	if (!deal?.id) {
		return null;
	}

	return deal;
};
