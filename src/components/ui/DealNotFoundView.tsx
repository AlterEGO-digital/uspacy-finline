import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DealNotFoundView = () => {
	const { t } = useTranslation('payment');

	return (
		<Stack sx={{ height: '400px', alignItems: 'center', justifyContent: 'center', gap: 2, px: 1 }}>
			<Typography variant="h3">{t('payment:deal.notFound')}</Typography>
		</Stack>
	);
};
