import { Box, Button, ButtonProps, keyframes, styled } from '@mui/material';
import React from 'react';

import LoaderIcon from '../../static/images/loader.svg';

export const BrandButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.background.brand,
	'&:hover': {
		backgroundColor: theme.palette.grey['300'],
	},
}));

const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

type LoadingBrandButtonProps = ButtonProps & { loading: boolean };

export const LoadingBrandButton = ({ loading, children, sx, ...props }: LoadingBrandButtonProps) => {
	return (
		<BrandButton variant="contained" sx={{ display: 'grid', gridTemplateAreas: 'stack', ...sx }} {...props}>
			<Box component="span" sx={{ ...(loading && { visibility: 'hidden', gridArea: 'stack' }) }}>
				{children}
			</Box>
			<Box
				component="span"
				sx={{
					display: 'none',
					alignItems: 'center',
					justifyContent: 'center',
					gridArea: 'stack',
					...(loading && { display: 'flex', animation: `${rotate} 1s linear infinite` }),
				}}
			>
				<LoaderIcon />
			</Box>
		</BrandButton>
	);
};
