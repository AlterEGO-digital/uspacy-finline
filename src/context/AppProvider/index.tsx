import React, { useEffect } from 'react';

import { AppProps } from '../../components/App/types';
import { useDeal } from '../../hooks/useDeal';
import { IDeal } from '../../models/deal';

export const AppProvider: React.FC<{ deal: AppProps } & React.PropsWithChildren> = ({ children, deal }) => {
	const { hydrateDeal, clearDeal } = useDeal();

	useEffect(() => {
		if (deal) {
			hydrateDeal(deal as IDeal);
		}
	}, [deal]);

	useEffect(
		() => () => {
			clearDeal();
		},
		[],
	);

	return <>{children}</>;
};
