import { Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

export const PaymentFormSkeleton = () => {
	return (
		<Stack height="100%" sx={{ pt: 1, width: '536px', mx: 'auto' }}>
			<Grid container spacing={1}>
				{[12, 8, 4, 6, 6, 12].map((xs, index) => (
					<Grid item xs={xs} key={index}>
						<Stack spacing={0.5}>
							<Skeleton variant="text" animation="wave" sx={{ height: 16, width: '30%' }} />

							<Skeleton variant="rounded" animation="wave" sx={{ height: 56, width: '100%', borderRadius: 1 }} />
						</Stack>
					</Grid>
				))}
			</Grid>

			<Stack pt={3} width="100%">
				<Skeleton variant="rounded" animation="wave" sx={{ height: 40, width: '100%', borderRadius: 1 }} />
			</Stack>
		</Stack>
	);
};
