import { CircularProgress, IconButton, ListItem, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';

import { getErrorMessage } from '../../helpers/errors';
import { useNotification } from '../../hooks/useNotification';
import { usePaymentAccount } from '../../hooks/usePaymentAccount';
import { IPaymentAccount } from '../../models/payment';
import DeleteIcon from '../../static/images/trash-bin-01.svg';
import { DangerousActionDialog } from '../ui/DangerousActionDialog';

type PaymentAccountProps = {
	account: IPaymentAccount;
};
export const PaymentAccount = ({ account }: PaymentAccountProps) => {
	const { deletePaymentAccount, isLoading, isError, error } = usePaymentAccount();
	const { errorNotification } = useNotification();

	useEffect(() => {
		if (isError) {
			errorNotification(getErrorMessage(error));
		}
	}, [isError]);

	return (
		<ListItem
			secondaryAction={
				<DangerousActionDialog
					onProceed={() => {
						deletePaymentAccount(account.id);
					}}
					trigger={
						<IconButton edge="end" color="error" size="small" disabled={isLoading}>
							{isLoading ? <CircularProgress size="1rem" color="inherit" /> : <DeleteIcon />}
						</IconButton>
					}
				/>
			}
			sx={{ position: 'relative' }}
		>
			<ListItemText primary={account.label} />
		</ListItem>
	);
};
