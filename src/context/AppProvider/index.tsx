import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppProps } from '../../components/App/types';
import { IDeal } from '../../models/deal';
import { appActions } from '../../store/reducers/app/slice';

export const AppProvider: React.FC<{ deal: AppProps } & React.PropsWithChildren> = ({ children, deal }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (deal) {
			dispatch(appActions.hydrateDeal({ deal: deal as IDeal }));
		}
	}, [deal]);

	useEffect(() => {
		return () => {
			dispatch(appActions.clearDeal());
		};
	}, []);

	return <>{children}</>;
};
