import { useSelector } from 'react-redux';

import { selectDeal } from '../store/reducers/app/slice';

export const useDeal = () => {
	const deal = useSelector(selectDeal);

	return {
		deal,
	};
};
