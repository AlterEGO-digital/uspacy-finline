import { Box } from '@mui/material';
import React from 'react';

import LogoIcon from '../../static/images/finline-logo-02.svg';

export const Logo = () => {
	return (
		<Box sx={{ backgroundColor: (theme) => theme.palette.grey['300'], p: 2, display: 'flex', alignItems: 'center' }}>
			<LogoIcon style={{ width: '160px', height: '24px' }} />
		</Box>
	);
};
