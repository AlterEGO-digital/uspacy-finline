import { CircularProgress, List, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSettings } from '../../hooks/useSettings';
import { LoadingBrandButton } from '../ui/BrandButton';
import { PaymentAccount } from './PaymentAccount';

type PaymentAccountsListProps = {
	disabled?: boolean;
};

export const PaymentAccountsList = ({ disabled }: PaymentAccountsListProps) => {
	const { accounts, isLoading, error, refetch } = useSettings();
	const { t } = useTranslation('settings');

	const hasAccounts = accounts?.length > 0;

	if (isLoading && !error) {
		return (
			<Stack sx={{ minHeight: '200px', alignItems: 'center', justifyContent: 'center' }}>
				<CircularProgress size="1.5rem" />
			</Stack>
		);
	}

	if (!hasAccounts && !isLoading && !error) {
		return (
			<Stack sx={{ minHeight: '200px', alignItems: 'center', justifyContent: 'center' }}>
				<Typography>{t('settings:settingsForm.emptyPaymentAccounts')}</Typography>
			</Stack>
		);
	}
	if (error) {
		return (
			<Stack sx={{ minHeight: '200px', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
				<Typography>{t('settings:settingsForm.errorPaymentAccounts')}</Typography>

				<LoadingBrandButton type="button" sx={{ fontSize: '0.65rem' }} loading={isLoading} onClick={refetch} disabled={disabled}>
					{t('settings:settingsForm.actions.refetchPaymentAccounts')}
				</LoadingBrandButton>
			</Stack>
		);
	}

	return (
		<>
			{hasAccounts && (
				<List
					sx={{
						minHeight: '200px',
						...(disabled && {
							'& *': {
								pointerEvents: 'none',
								opacity: '0.5',
								cursor: 'default',
							},
						}),
					}}
				>
					{accounts.map((account) => {
						return <PaymentAccount key={account.id} account={account} />;
					})}
				</List>
			)}
		</>
	);
};
