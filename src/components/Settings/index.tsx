import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Providers from '../../Providers';
import SettingsForm from '../SettingsForm';
import { Logo } from '../ui/Logo';
import { IProps } from './types';

const Settings: React.FC = () => {
	const { t } = useTranslation('settings');
	return (
		<Paper elevation={3} sx={{ maxWidth: '600px', mx: 'auto', p: 4, borderRadius: 3 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Logo />
				<Typography component="h1" fontSize="1.5rem" fontWeight={600} pt={4}>
					{t('settings:title')}
				</Typography>
				<SettingsForm />
			</Box>
		</Paper>
	);
};

const SettingsWrap: React.FC<IProps> = ({ userSettings }) => {
	return (
		<Providers userSettings={userSettings}>
			<Settings />
		</Providers>
	);
};

export default SettingsWrap;
