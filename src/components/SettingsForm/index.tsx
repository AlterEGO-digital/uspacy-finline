import { valibotResolver } from '@hookform/resolvers/valibot';
import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, Paper, Stack } from '@mui/material';
import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getErrorMessage } from '../../helpers/errors';
import { isNumber } from '../../helpers/typeGuards';
import { useNotification } from '../../hooks/useNotification';
import { useSettings } from '../../hooks/useSettings';
import AddIcon from '../../static/images/plus-circle-01.svg';
import DeleteIcon from '../../static/images/trash-bin-01.svg';
import { adaptToSaveDealStatusDto, adaptToSaveSettingsDto } from '../../store/reducers/settings/mapper';
import { BrandButton, LoadingBrandButton } from '../ui/BrandButton';
import { Fieldset, PasswordTextInput, TextInput, TextInputLabel } from '../ui/Form';
import { getInitialFormValues } from './helpers/formState';
import { PaymentAccountsList } from './PaymentAccountsList';
import { FunnelField, StageField } from './StageFields';
import { SettingsFormSchema, SettingsFormValues } from './types';

interface IProps {
	initial: SettingsFormValues;
	onSubmit: (values: SettingsFormValues) => void;
	disabled?: boolean;
	loading?: boolean;
}

type ExtractStringKeys<T> = T extends string ? T : never;

const defaultAccount = { posId: '', endpointsKey: '', label: '', apiKey: '', apiSecret: '' };
export const SettingsFormComponent: React.FC<IProps> = ({ initial, onSubmit, disabled, loading = false }) => {
	const { t } = useTranslation(['settings', 'validation']);

	const form = useForm<SettingsFormValues>({
		defaultValues: initial,
		resolver: valibotResolver(SettingsFormSchema),
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'paymentAccounts',
	});

	const isDisabled = form.formState.isSubmitting || disabled;

	return (
		<FormProvider {...form}>
			<Box
				component="form"
				sx={{ pt: 4, width: '100%' }}
				onSubmit={form.handleSubmit((values) => {
					onSubmit(values);
				})}
			>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Fieldset
							title={
								<Stack direction="row" alignItems="center" gap={1}>
									{t(getKey('fieldset.main'))}
								</Stack>
							}
							titleSize="0.75rem"
							sx={{ pt: 0, pb: 2, px: '8px' }}
							disabled={isDisabled}
						>
							<PaymentAccountsList disabled={isDisabled} />
						</Fieldset>
					</Grid>
					<Grid item xs={12}>
						<Fieldset
							title={
								<Stack direction="row" alignItems="center" gap={1}>
									{t(getKey('fieldset.afterPayment'))}
								</Stack>
							}
							titleSize="0.75rem"
							sx={{ pt: 2, pb: 2, px: '8px' }}
							disabled={isDisabled}
						>
							<Stack gap={4} sx={{ pt: 3, pb: 2 }}>
								<FunnelField disabled={isDisabled} />
								<StageField disabled={isDisabled} />
							</Stack>
						</Fieldset>
					</Grid>
					<Grid item xs={12}>
						<Fieldset
							title={
								<Stack direction="row" alignItems="center" gap={1}>
									{t(getKey('fieldset.accounts'))}
								</Stack>
							}
							titleSize="0.75rem"
							sx={{ pt: 0, pb: 2, px: '8px' }}
							disabled={isDisabled}
						>
							<Stack gap={2} sx={{ pt: 3, pb: 2 }}>
								{fields.map((field, index) => {
									const rootError = form.formState.errors?.['paymentAccounts']?.[index]?.message ?? '';
									const hasRootError = !!rootError;

									return (
										<Paper key={field.id} elevation={3} sx={{ p: 2, position: 'relative' }}>
											<IconButton
												size="small"
												color="error"
												sx={{ position: 'absolute', right: 4, top: 4 }}
												onClick={() => onDeleteAccount(index)}
												disabled={isDisabled}
											>
												<DeleteIcon />
											</IconButton>

											<Stack key={field.id} gap={4} pt={4}>
												<Controller
													name={`paymentAccounts.${index}.label`}
													control={form.control}
													render={({ field: _field }) => {
														const error = getError(_field.name, index);
														return (
															<FormControl fullWidth error={!!error || hasRootError} disabled={isDisabled}>
																<TextInputLabel>{`${index + 1}. ${t(
																	getKey('labels.paymentAccountsName'),
																)}`}</TextInputLabel>
																<TextInput
																	{..._field}
																	onChange={(e) => {
																		if (hasRootError) {
																			onAccountFieldChange(e, _field.name, index);
																			return;
																		}

																		_field.onChange(e);
																	}}
																	error={!!error || hasRootError}
																	helperText={t(error)}
																	placeholder={t(getKey('placeholders.paymentAccountsName'))}
																	disabled={isDisabled}
																/>
															</FormControl>
														);
													}}
												/>

												<Controller
													name={`paymentAccounts.${index}.apiKey`}
													control={form.control}
													render={({ field: _field }) => {
														const error = getError(_field.name, index);
														return (
															<FormControl fullWidth error={!!error || hasRootError} disabled={isDisabled}>
																<TextInputLabel>{t(getKey('labels.apiKey'))}</TextInputLabel>
																<PasswordTextInput
																	{..._field}
																	onChange={(e) => {
																		if (hasRootError) {
																			onAccountFieldChange(e, _field.name, index);
																			return;
																		}

																		_field.onChange(e);
																	}}
																	error={!!error || hasRootError}
																	helperText={t(error)}
																	placeholder={t(getKey('placeholders.apiKey'))}
																	disabled={isDisabled}
																/>
															</FormControl>
														);
													}}
												/>
												<Controller
													name={`paymentAccounts.${index}.apiSecret`}
													control={form.control}
													render={({ field: _field }) => {
														const error = getError(_field.name, index);
														return (
															<FormControl fullWidth error={!!error || hasRootError} disabled={isDisabled}>
																<TextInputLabel>{t(getKey('labels.apiSecret'))}</TextInputLabel>
																<PasswordTextInput
																	{..._field}
																	onChange={(e) => {
																		if (hasRootError) {
																			onAccountFieldChange(e, _field.name, index);
																			return;
																		}

																		_field.onChange(e);
																	}}
																	error={!!error || hasRootError}
																	helperText={t(error)}
																	placeholder={t(getKey('placeholders.apiSecret'))}
																	disabled={isDisabled}
																/>
															</FormControl>
														);
													}}
												/>

												<Stack flexDirection="row" gap={4}>
													<Controller
														name={`paymentAccounts.${index}.posId`}
														control={form.control}
														render={({ field: _field }) => {
															const error = getError(_field.name, index);
															return (
																<FormControl fullWidth error={!!error || hasRootError} disabled={isDisabled}>
																	<TextInputLabel>{t(getKey('labels.paymentAccountsId'))}</TextInputLabel>
																	<PasswordTextInput
																		{..._field}
																		onChange={(e) => {
																			if (hasRootError) {
																				onAccountFieldChange(e, _field.name, index);
																				return;
																			}

																			_field.onChange(e);
																		}}
																		error={!!error || hasRootError}
																		helperText={t(error)}
																		placeholder={t(getKey('placeholders.paymentAccountsId'))}
																		disabled={isDisabled}
																	/>
																</FormControl>
															);
														}}
													/>
													<Controller
														name={`paymentAccounts.${index}.endpointsKey`}
														control={form.control}
														render={({ field: _field }) => {
															const error = getError(_field.name, index);
															return (
																<FormControl fullWidth error={!!error || hasRootError} disabled={isDisabled}>
																	<TextInputLabel>
																		{t(getKey('labels.paymentAccountsEndppointsKey'))}
																	</TextInputLabel>
																	<PasswordTextInput
																		{..._field}
																		onChange={(e) => {
																			if (hasRootError) {
																				onAccountFieldChange(e, _field.name, index);
																				return;
																			}

																			_field.onChange(e);
																		}}
																		error={!!error || hasRootError}
																		helperText={t(error)}
																		placeholder={t(getKey('placeholders.paymentAccountsEndppointsKey'))}
																		disabled={isDisabled}
																	/>
																</FormControl>
															);
														}}
													/>
												</Stack>
											</Stack>

											{hasRootError && (
												<FormHelperText error sx={{ pl: 2, pt: 1 }}>
													{t(rootError)}
												</FormHelperText>
											)}
										</Paper>
									);
								})}
							</Stack>
							<Stack flexDirection="row" justifyContent="flex-end" gap={1} pb={1}>
								<BrandButton onClick={onAddAccount} sx={{ gap: 1 }} variant="contained" disabled={isDisabled}>
									<AddIcon />
									<span>{t(getKey('actions.addPaymentAccountField'))}</span>
								</BrandButton>
								<Button
									onClick={onDeleteAll}
									sx={{ gap: 1, backgroundColor: 'error.light', '&:hover': { backgroundColor: 'error.main' } }}
									variant="contained"
									disabled={isDisabled || fields.length < 2}
								>
									<DeleteIcon />
									<span>{t(getKey('actions.clearAllPaymentAccounts'))}</span>
								</Button>
							</Stack>
						</Fieldset>
					</Grid>
				</Grid>

				<Stack pt={4} flexDirection="row">
					<LoadingBrandButton
						fullWidth
						type="submit"
						variant="contained"
						loading={loading}
						disabled={isDisabled || !form.formState.isDirty}
					>
						{t('settings:save')}
					</LoadingBrandButton>
				</Stack>
			</Box>
		</FormProvider>
	);

	function getError(name: ExtractStringKeys<Parameters<typeof form.getFieldState>[number]>, index?: number) {
		const errors = form.formState.errors;
		let errI18nKey = '';

		if (isNumber(index)) {
			errI18nKey = (form.getFieldState(name)?.error?.message ?? '') as string;
		} else {
			errI18nKey = (errors[name]?.message ?? '') as string;
		}

		if (!errI18nKey) return '';

		return t(errI18nKey);
	}

	function getKey(path: string) {
		return `settings:settingsForm.${path}`;
	}

	function onAccountFieldChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		name: ExtractStringKeys<Parameters<typeof form.getFieldState>[number]>,
		index: number,
	) {
		const value = e.target.value;

		form.setValue(name, value, {
			shouldValidate: true,
			shouldDirty: true,
		});

		form.clearErrors(`paymentAccounts.${index}`);
	}

	function onDeleteAccount(index: number) {
		if (index === 0) {
			form.setValue(`paymentAccounts.${index}`, { ...defaultAccount });
			form.clearErrors(`paymentAccounts.${index}`);
		} else {
			remove(index);
		}
	}
	function onDeleteAll() {
		form.setValue('paymentAccounts', [{ ...defaultAccount }]);
		form.clearErrors('paymentAccounts');
	}

	function onAddAccount() {
		append({ ...defaultAccount });
	}
};

const Settings: React.FC = () => {
	const { errorNotification, successNotification } = useNotification();
	const { save, isSaveFailed, saveError, isSaved, isSaving, requestId } = useSettings();
	const initial = useMemo(() => getInitialFormValues(), []);
	const rerenderKey = isSaved ? '' : requestId; // resets form

	const handleSettingsFormSubmit = useCallback(
		async (values: SettingsFormValues) => {
			const settingsDto = adaptToSaveSettingsDto(values);
			const statusDto = adaptToSaveDealStatusDto(values);

			await save(settingsDto, statusDto);
		},
		[save],
	);

	useEffect(() => {
		if (isSaveFailed) {
			errorNotification(getErrorMessage(saveError));
		}
	}, [isSaveFailed, saveError]);

	useEffect(() => {
		if (isSaved) {
			successNotification();
		}
	}, [isSaved]);

	return (
		<Suspense
			fallback={
				<Box>
					<CircularProgress />
				</Box>
			}
		>
			<SettingsFormComponent key={rerenderKey} initial={initial} onSubmit={handleSettingsFormSubmit} disabled={isSaving} loading={isSaving} />
		</Suspense>
	);
};

export default Settings;
