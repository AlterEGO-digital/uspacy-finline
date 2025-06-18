import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { BrandButton } from './BrandButton';

export const PaymnetLinkGenerationSuccess: React.FC<{ onClick: VoidFunction }> = ({ onClick }) => {
	const { t } = useTranslation('payment');

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onClick();
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Stack sx={{ height: '400px', gap: 3, pt: 2, alignItems: 'center', justifyContent: 'center' }}>
					<Typography component="h2" fontSize="2rem" textAlign="center" fontWeight="600" color="success.main">
						{t('payment:views.success.title')}
					</Typography>

					<div>
						<Typography component="p" sx={{ maxWidth: '65ch', textAlign: 'center', mx: 'auto' }}>
							{t('payment:views.success.reason')}
						</Typography>
						<Typography component="p" sx={{ maxWidth: '65ch', textAlign: 'center', mx: 'auto' }}>
							{t('payment:views.success.description')}
						</Typography>
					</div>

					<BrandButton onClick={handleClick} variant="contained">
						{t('payment:views.success.back')}
					</BrandButton>
				</Stack>
			</Grid>
		</Grid>
	);
};
