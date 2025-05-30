import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DealNotFoundView = () => {
	const { t } = useTranslation('payment');

	return <Box>{t('payment:deal.notFound')}</Box>;
};
