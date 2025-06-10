import React from 'react';
import { Provider as ProviderStore } from 'react-redux';

import { setupStore } from '../../store';

const store = setupStore();

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <ProviderStore store={store}>{children}</ProviderStore>;
};
