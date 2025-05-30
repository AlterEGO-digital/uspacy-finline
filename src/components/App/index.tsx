import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';

import { AppProvider } from '../../context/AppProvider';
import Providers from '../../Providers';
import PaymentForm from '../PaymentForm';
import { Logo } from '../ui/Logo';
import { AppProps, IProps } from './types';

const App: React.FC = () => {
	return (
		<Paper elevation={3} sx={{ maxWidth: '600px', mx: 'auto', p: 4, borderRadius: 3 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',

					gap: 3,
				}}
			>
				<Logo />
				<PaymentForm />
			</Box>
		</Paper>
	);
};

const AppWrap: React.FC<IProps & AppProps> = ({ userSettings, contacts, amount, dealId }) => {
	const deal = useMemo(() => ({ amount, contacts, dealId }), [amount, contacts, dealId]);

	return (
		<Providers userSettings={userSettings}>
			<AppProvider deal={deal}>
				<App />
			</AppProvider>
		</Providers>
	);
};

export default AppWrap;
