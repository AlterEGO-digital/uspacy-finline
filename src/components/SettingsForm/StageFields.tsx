import { FormControl, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUserSettingsContext } from '../../context/UserSettings';
import { FunnelOption } from '../../context/UserSettings/types';
import { useDealStatus } from '../../hooks/useDealStatus';
import { TextInput, TextInputLabel } from '../ui/Form';

type Props = {
	disabled?: boolean;
};

function getKey(path: string) {
	return `settings:settingsForm.${path}`;
}

const fallback = { id: '', label: '' };

export const FunnelField = ({ disabled }: Props) => {
	const { funnels, isLoading, getStagesByFunnel, getFunnelById } = useUserSettingsContext();
	const { formState, setValue } = useFormContext();
	const { t } = useTranslation('settings');

	useEffect(() => {
		if (funnels.length) {
			const defaultFunnel = funnels[0];
			const stages = getStagesByFunnel(defaultFunnel);
			const [defaultStage] = stages;

			setValue('funnel', defaultFunnel);
			setValue('stage', defaultStage);
			return;
		}
	}, [funnels]);

	const isDisabled = disabled || isLoading;

	return (
		<Controller
			name="funnel"
			render={({ field: { value, onChange, ...restField } }) => {
				const error = (formState?.errors?.[restField.name]?.message as string) ?? '';

				return (
					<FormControl fullWidth error={!!error} disabled={isDisabled}>
						<TextInputLabel>{t(getKey('labels.funnel'))}</TextInputLabel>
						<TextInput
							{...restField}
							select
							id="funnel"
							value={value?.id || ''}
							onChange={(e) => {
								const selectedId = e.target.value;

								if (selectedId === '') {
									onChange({ ...fallback });
									setValue('stage', { ...fallback });
									return;
								}

								const selected = getFunnelById(Number(selectedId));
								const stages = getStagesByFunnel(selected);
								const [defaultStage] = stages;

								onChange(selected || { ...fallback });
								setValue('stage', defaultStage);
							}}
							error={!!error}
							helperText={t(error)}
							placeholder={t(getKey('placeholders.funnel'))}
							disabled={isDisabled}
							SelectProps={{ displayEmpty: true }}
						>
							<MenuItem value="">{t(getKey('placeholders.funnel'))}</MenuItem>

							{funnels?.map((funnel) => {
								return (
									<MenuItem key={funnel.id} value={funnel.id}>
										{funnel.label}
									</MenuItem>
								);
							})}
						</TextInput>
					</FormControl>
				);
			}}
		/>
	);
};

export const StageField = ({ disabled }: Props) => {
	const { getStagesByFunnel, getStageById, getFunnelStagePairByStage, funnels, isLoading } = useUserSettingsContext();
	const { formState, setValue, watch } = useFormContext();
	const { t } = useTranslation('settings');
	const { status, isLoading: isLoadingDealPaymentStatus } = useDealStatus();

	const funnel = watch('funnel') as FunnelOption;

	useEffect(() => {
		if (status && funnels?.length) {
			const pair = getFunnelStagePairByStage(status);

			setValue('stage', pair.stage);
			setValue('funnel', pair.funnel);
		}
	}, [status, funnels, getFunnelStagePairByStage]);

	const isDisabled = disabled || isLoadingDealPaymentStatus || isLoading;

	return (
		<Controller
			name="stage"
			render={({ field: { value, onChange, ...restField } }) => {
				const error = (formState?.errors?.[restField.name]?.message as string) ?? '';
				const stages = getStagesByFunnel(funnel);

				return (
					<FormControl fullWidth error={!!error} disabled={isDisabled}>
						<TextInputLabel>{t(getKey('labels.stage'))}</TextInputLabel>
						<TextInput
							{...restField}
							select
							value={value?.id || ''}
							onChange={(e) => {
								const selectedId = e.target.value;
								if (selectedId === '') {
									onChange({ ...fallback });
									setValue('funnel', { ...fallback });
									return;
								}
								const selected = getStageById(Number(selectedId), funnel);

								onChange(selected || { ...fallback });
							}}
							id="stage"
							error={!!error}
							helperText={t(error)}
							placeholder={t(getKey('placeholders.stage'))}
							disabled={isDisabled}
							SelectProps={{ displayEmpty: true }}
						>
							<MenuItem value="">{t(getKey('placeholders.stage'))}</MenuItem>

							{stages?.map((stage) => {
								return (
									<MenuItem key={stage.id} value={stage.id}>
										{stage.label}
									</MenuItem>
								);
							})}
						</TextInput>
					</FormControl>
				);
			}}
		/>
	);
};
