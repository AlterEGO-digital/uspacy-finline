import { valibotResolver } from '@hookform/resolvers/valibot';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Stack } from '@mui/material';
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getErrorMessage } from '../../helpers/errors';
import { useDeal } from '../../hooks/useDeal';
import { useNotification } from '../../hooks/useNotification';
import { usePaymentLink } from '../../hooks/usePaymentLink';
import { usePaymentSourceData } from '../../hooks/usePaymentSourceData';
import { adaptToPaymentLinkDto } from '../../store/reducers/payment/mapper';
import { LoadingBrandButton } from '../ui/BrandButton';
import { DealNotFoundView } from '../ui/DealNotFoundView';
import { Combobox, TextInput, TextInputLabel } from '../ui/Form';
import { PaymentAccountsNotFoundView } from '../ui/PaymentAccountsNotFoundView';
import { PaymentFormSkeleton } from '../ui/PaymentFormSkeleton';
import { PaymnetLinkGenerationSuccess } from '../ui/PaymnetLinkGenerationSuccess';
import { RenderEmailOption, RenderPhoneOption } from '../ui/RenderOption';
import { getInitialPaymentFormState } from './helpers/formState';
import { getCurrencyLabel } from './helpers/labels';
import { getSelectedOptionStyles } from './helpers/styles';
import { PaymentAmountField } from './PaymentAmountField';
import { GeneratePaymentFormSchema, GeneratePaymentFormValues } from './types';

interface IProps {
	initial: GeneratePaymentFormValues;
	onSubmit: (values: GeneratePaymentFormValues) => void;
	disabled?: boolean;
	loading?: boolean;
}

export const PaymentFormComponent: React.FC<IProps> = ({ initial, onSubmit, disabled, loading = false }) => {
	const form = useForm<GeneratePaymentFormValues>({ defaultValues: initial, resolver: valibotResolver(GeneratePaymentFormSchema) });

	const { accounts, currencies, emails, phones } = usePaymentSourceData();
	const { t } = useTranslation(['payment', 'validation']);

	useEffect(() => {
		if (accounts.length) {
			form.setValue('paymentAccount', accounts[0]);
		}
	}, [accounts]);

	const isDisabled = form.formState.isSubmitting || disabled;

	return (
		<FormProvider {...form}>
			<Box
				component="form"
				sx={{ pt: 4, px: 1 }}
				onSubmit={form.handleSubmit((values) => {
					onSubmit(values);
				})}
			>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Controller
							name="description"
							control={form.control}
							render={({ field }) => {
								const error = getError(field.name);
								return (
									<FormControl fullWidth error={!!error} disabled={isDisabled}>
										<TextInputLabel>{t(getKey('labels.description'))}</TextInputLabel>
										<TextInput
											{...field}
											error={!!error}
											helperText={t(error)}
											placeholder={t(getKey('placeholders.description'))}
											disabled={isDisabled}
										/>
									</FormControl>
								);
							}}
						/>
					</Grid>
					<Grid item xs={8}>
						<PaymentAmountField isDisabled={isDisabled} getError={getError} getTranslationKey={getKey} />
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="currency"
							control={form.control}
							render={({ field }) => {
								const error = getError(field.name);
								return (
									<FormControl fullWidth error={!!error} disabled={isDisabled}>
										<TextInputLabel>{t(getKey('labels.currency'))}</TextInputLabel>
										<TextInput
											{...field}
											select
											error={!!error}
											helperText={t(error)}
											id="currency"
											placeholder={t(getKey('placeholders.currency'))}
											disabled={isDisabled}
										>
											{currencies?.map((currency) => {
												return (
													<MenuItem key={currency} value={currency} sx={getSelectedOptionStyles()}>
														{getCurrencyLabel(currency)}
													</MenuItem>
												);
											})}
										</TextInput>
									</FormControl>
								);
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<Controller
							name="email"
							control={form.control}
							render={({ field }) => {
								const error = getError(field.name);
								return (
									<FormControl fullWidth error={!!error} disabled={isDisabled}>
										<TextInputLabel>{t(getKey('labels.email'))}</TextInputLabel>
										<Combobox
											{...field}
											freeSolo
											options={emails}
											disabled={isDisabled}
											onInputChange={(_, data) => {
												field.onChange(data);
											}}
											onChange={(_, value) => {
												field.onChange(value);
											}}
											renderOption={RenderEmailOption}
											renderInput={(params) => (
												<TextInput
													{...params}
													error={!!error}
													helperText={t(error)}
													placeholder={t(getKey('placeholders.email'))}
													disabled={isDisabled}
												/>
											)}
										/>
									</FormControl>
								);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name="phone"
							control={form.control}
							render={({ field }) => {
								const error = getError(field.name);
								return (
									<FormControl fullWidth error={!!error} disabled={isDisabled}>
										<TextInputLabel>{t(getKey('labels.phone'))}</TextInputLabel>

										<Combobox
											{...field}
											freeSolo
											options={phones}
											disabled={isDisabled}
											onInputChange={(_, data) => {
												field.onChange(data);
											}}
											onChange={(_, value) => {
												field.onChange(value);
											}}
											renderOption={RenderPhoneOption}
											renderInput={(params) => (
												<TextInput
													{...params}
													error={!!error}
													helperText={t(error)}
													placeholder={t(getKey('placeholders.phone'))}
													disabled={isDisabled}
												/>
											)}
										/>
									</FormControl>
								);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="paymentAccount"
							control={form.control}
							render={({ field: { value, onChange, ...restField } }) => {
								const error = getError(restField.name);

								return (
									<FormControl fullWidth error={!!error} disabled={isDisabled}>
										<TextInputLabel>{t(getKey('labels.paymentAccount'))}</TextInputLabel>
										<TextInput
											{...restField}
											select
											value={value?.id || ''}
											onChange={(e) => {
												const selectedId = e.target.value;
												const selected = accounts?.find((account) => account.id === selectedId);
												onChange(selected || null);
											}}
											error={!!error}
											helperText={t(error)}
											id="currency"
											placeholder={t(getKey('placeholders.paymentAccount'))}
											disabled={isDisabled}
										>
											{accounts?.map((account) => {
												return (
													<MenuItem key={account.id} value={account.id} sx={getSelectedOptionStyles()}>
														{account.label}
													</MenuItem>
												);
											})}
										</TextInput>
									</FormControl>
								);
							}}
						/>
					</Grid>
				</Grid>

				<Stack pt={3} flexDirection="row" justifyContent="center">
					<LoadingBrandButton fullWidth loading={loading} type="submit" variant="contained" disabled={isDisabled}>
						{t(getKey('submit'))}
					</LoadingBrandButton>
				</Stack>
			</Box>
		</FormProvider>
	);

	function getError(name: string) {
		const errI18nKey = (form.formState.errors[name]?.message ?? '') as string;

		if (!errI18nKey) return '';

		return t(errI18nKey);
	}
	function getKey(path: string) {
		return `payment:paymentForm.${path}`;
	}
};

const CLEAR_ERRORS_IN = 3000;
type View = 'success' | 'idle';

const PaymentForm: React.FC = () => {
	const [view, setView] = useState<View>('idle');
	const timeoutId = useRef<NullOr<NodeJS.Timeout>>(null);

	const { deal } = useDeal();
	const { paymentLink, generateLink, isLoading, error, isSuccess, reset } = usePaymentLink();
	const { accounts, currencies, isLoading: isLoadingSourceData } = usePaymentSourceData();
	const { errorNotification, successNotification } = useNotification();

	const initial = useMemo(() => getInitialPaymentFormState(deal, currencies), [deal, currencies]);
	const isIdleView = view === 'idle';
	const isSuccessView = view === 'success';

	const onGoBack = useCallback(() => {
		reset();
		setView('idle');
	}, []);

	const handleFormSubmit = useCallback(
		async (values: GeneratePaymentFormValues) => {
			const dto = adaptToPaymentLinkDto(values, deal.id);
			await generateLink(dto);
		},
		[deal],
	);

	useEffect(() => {
		if (error) {
			errorNotification(getErrorMessage(error).message);

			timeoutId.current = setTimeout(() => {
				reset();
				timeoutId.current = null;
			}, CLEAR_ERRORS_IN);
		}
	}, [error]);

	useEffect(() => {
		if (isSuccess) {
			successNotification();
			setView('success');
		}
	}, [isSuccess]);

	useEffect(() => {
		reset(); // reset prev state

		return () => {
			setView('idle');
			reset();

			if (timeoutId.current !== null) {
				clearTimeout(timeoutId.current);
				timeoutId.current = null;
			}
		};
	}, []);

	if (!deal) {
		return <DealNotFoundView />;
	}

	if (isLoadingSourceData) {
		return <PaymentFormSkeleton />;
	}

	if (!accounts?.length && !isLoadingSourceData) {
		return <PaymentAccountsNotFoundView />;
	}

	const isLoaded = !isLoadingSourceData && !!accounts?.length;

	return (
		<Suspense fallback={<PaymentFormSkeleton />}>
			<>
				{isLoaded && (
					<>
						{isIdleView && (
							<Stack gap={2}>
								<PaymentFormComponent onSubmit={handleFormSubmit} initial={initial} disabled={isLoading} loading={isLoading} />
								{!!error && (
									<FormHelperText error sx={{ fontSize: '1rem' }}>
										{getErrorMessage(error).message}
									</FormHelperText>
								)}
							</Stack>
						)}
						{isSuccessView && <PaymnetLinkGenerationSuccess link={paymentLink} onClick={onGoBack} />}
					</>
				)}
			</>
		</Suspense>
	);
};

export default PaymentForm;
