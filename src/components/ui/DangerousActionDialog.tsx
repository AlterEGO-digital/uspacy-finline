import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<Anything, Anything>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

type DialogProps = {
	trigger: React.ReactNode;
	onProceed: VoidFunction;
};
export const DangerousActionDialog = ({ trigger, onProceed }: DialogProps) => {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation('translation');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleProceed = () => {
		handleClose();
		onProceed();
	};

	return (
		<React.Fragment>
			<Box sx={{ display: 'contents' }} onClick={handleClickOpen}>
				{trigger}
			</Box>
			<Dialog keepMounted open={open} TransitionComponent={Transition} onClose={handleClose}>
				<DialogTitle>{t('translation:common.alerts.conformDeleteItemTitle')}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t('translation:common.alerts.conformDeleteItemText')}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{t('translation:common.buttons.cancel')}</Button>
					<Button color="error" onClick={handleProceed}>
						{t('translation:common.buttons.confirmDelete')}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
