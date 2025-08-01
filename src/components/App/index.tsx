import Box from '@mui/material/Box';
import React, { useMemo } from 'react';

import { AppProvider } from '../../context/AppProvider';
import Providers from '../../Providers';
import PaymentForm from '../PaymentForm';
import { Logo } from '../ui/Logo';
import { AppProps, IProps } from './types';

const App: React.FC = () => {
	return (
		<Box sx={{ maxWidth: '600px', mx: 'auto', p: 4, borderRadius: 3 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',

					gap: 4,
				}}
			>
				<Logo />
				<PaymentForm />
			</Box>
		</Box>
	);
};

const AppWrap: React.FC<IProps & AppProps> = ({ userSettings, contacts, amount, id, title }) => {
	const deal = useMemo(() => ({ amount, contacts, id, title }), [amount, contacts, id, title]);

	return (
		<Providers userSettings={userSettings}>
			<AppProvider deal={deal} key={deal.id}>
				<App />
			</AppProvider>
		</Providers>
	);
};

export default AppWrap;
