import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDeal } from '../models/deal';
import { appActions, selectDeal } from '../store/reducers/app/slice';

export const useDeal = () => {
	const dispatch = useDispatch();
	const deal = useSelector(selectDeal);

	const hydrateDeal = useCallback(
		(newDeal: IDeal) => {
			dispatch(appActions.hydrateDeal({ deal: newDeal }));
		},
		[dispatch],
	);

	const clearDeal = useCallback(() => {
		dispatch(appActions.clearDeal());
	}, [dispatch]);

	return {
		deal,
		clearDeal,
		hydrateDeal,
	};
};
