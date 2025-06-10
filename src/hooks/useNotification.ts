import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useNotification = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation('translation');

	const errorNotification = useCallback(
		(message?: string) => {
			enqueueSnackbar(message ? message : t('translation:common.errors.unknown'), {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		},
		[enqueueSnackbar, t],
	);
	const successNotification = useCallback(
		(message?: string) => {
			enqueueSnackbar(message ? message : t('translation:common.success'), {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		},
		[enqueueSnackbar, t],
	);

	return { errorNotification, successNotification };
};
