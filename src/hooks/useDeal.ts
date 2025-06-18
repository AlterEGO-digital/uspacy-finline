import { useDispatch, useSelector } from 'react-redux';

import { IDeal } from '../models/deal';
import { clearDeal, hydrateDeal } from '../store/reducers/app/actions';
import { selectDeal } from '../store/reducers/app/selectors';

export const useDeal = () => {
	const dispatch = useDispatch();
	const deal = useSelector(selectDeal);

	return {
		deal,
		hydrateDeal: (entity: IDeal) => dispatch(hydrateDeal(entity)),
		clearDeal: () => dispatch(clearDeal()),
	};
};
