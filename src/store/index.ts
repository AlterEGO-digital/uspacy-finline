import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/app';
import { paymentApi } from './reducers/payment/api-slice';
import { settingsApi } from './reducers/settings/api-slice';

const rootReducer = combineReducers({
	app: appReducer,
	[settingsApi.reducerPath]: settingsApi.reducer,
	[paymentApi.reducerPath]: paymentApi.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([paymentApi.middleware, settingsApi.middleware]),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
