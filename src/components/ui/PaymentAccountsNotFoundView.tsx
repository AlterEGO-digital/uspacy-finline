import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const PaymentAccountsNotFoundView = () => {
	const { t } = useTranslation('payment');

	return (
		<Stack sx={{ height: '400px', alignItems: 'center', justifyContent: 'center', gap: 2, px: 1 }}>
			<Typography variant="h1">{t('payment:views.empty.title')}</Typography>
			<Typography variant="body1" sx={{ maxWidth: '65ch', textAlign: 'center' }}>
				{t('payment:views.empty.reason')}
			</Typography>
		</Stack>
	);
};
