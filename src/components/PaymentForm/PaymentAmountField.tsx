import { FormControl, FormHelperText } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PaymentCurrencyEnum } from '../../models/payment';
import { TextInput, TextInputLabel } from '../ui/Form';
import { isTestCurrency, VALID_TEST_PAYMENT_AMOUNT } from './helpers/currency';
import { allowDigitsOnly } from './helpers/input';

type PaymentAmountFieldProps = {
	getError: (key: string) => string;
	getTranslationKey: (key: string) => string;
	isDisabled?: boolean;
};

export const PaymentAmountField = ({ getError, getTranslationKey, isDisabled }: PaymentAmountFieldProps) => {
	const { control, watch } = useFormContext();
	const { t } = useTranslation(['payment', 'validation']);
	const currency = watch('currency') as PaymentCurrencyEnum;
	const isReadonly = isTestCurrency(currency);

	return (
		<Controller
			name="amount"
			control={control}
			render={({ field }) => {
				const error = getError(field.name);

				return (
					<FormControl fullWidth error={!!error} disabled={isReadonly || isDisabled}>
						<TextInputLabel>{t(getTranslationKey('labels.amount'))}</TextInputLabel>
						<TextInput
							{...field}
							onKeyDown={allowDigitsOnly}
							error={!!error}
							helperText={t(error)}
							value={isReadonly ? VALID_TEST_PAYMENT_AMOUNT.toFixed(2) : field.value}
							placeholder={t(getTranslationKey('placeholders.amount'))}
							disabled={isReadonly || isDisabled}
						/>

						{isReadonly && <FormHelperText>{t(getTranslationKey('helperText.testPayment'))}</FormHelperText>}
					</FormControl>
				);
			}}
		/>
	);
};
