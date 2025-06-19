import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotification } from '../../hooks/useNotification';
import CopyIcon from '../../static/images/copy.svg';
import CopyCheckIcon from '../../static/images/copy-check.svg';
import { BrandButton } from './BrandButton';

export const PaymnetLinkGenerationSuccess: React.FC<{ onClick: VoidFunction; link: string }> = ({ onClick, link }) => {
	const { t } = useTranslation(['translation', 'payment']);
	const [copied, setCopied] = useState(false);
	const { errorNotification, successNotification } = useNotification();
	const timeoutRef = useRef<NullOr<NodeJS.Timeout>>(null);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			successNotification(t('translation:common.copiedToClipboard'));
			timeoutRef.current = setTimeout(() => setCopied(false), 2000);
		} catch {
			errorNotification(t('translation:common.errors.copyToClipboard'));
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onClick();
	};

	return (
		<Stack sx={{ height: '400px', gap: 3, pt: 2, alignItems: 'center', justifyContent: 'center', width: '568px', mx: 'auto' }}>
			<Typography component="h2" fontSize="2rem" textAlign="center" fontWeight="600" color="success.main">
				{t('payment:views.success.title')}
			</Typography>

			<Box sx={{ p: 2, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
				<Stack gap={2}>
					<Typography component="p" fontWeight="600" color="text.secondary">
						{t('payment:views.success.reason')}
					</Typography>
					<Typography
						component="a"
						href={link}
						target="_blank"
						rel="noopeneer noreferrer"
						color="text.secondary"
						sx={{ textDecoration: 'none' }}
					>
						{link}
					</Typography>
					<BrandButton
						disabled={copied}
						endIcon={copied ? <CopyCheckIcon /> : <CopyIcon />}
						sx={{ mx: 'auto', width: '90%', color: '#fff', '&:disabled': { color: '#fff', opacity: '0.5' } }}
						onClick={copyToClipboard}
					>
						{t('translation:common.buttons.copy')}
					</BrandButton>
				</Stack>

				<Stack justifyContent="center" sx={{ position: 'relative', mt: 1, height: '40px', maxWidth: '80%', mx: 'auto' }}>
					<Typography
						component="span"
						color="text.secondary"
						sx={{
							p: 1,
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							backgroundColor: '#fff',
							zIndex: 1,
						}}
					>
						{t('translation:common.or')}
					</Typography>
					<Divider />
				</Stack>

				<Stack gap={2} sx={{ mt: 1 }}>
					<Typography component="p" color="text.secondary" sx={{ maxWidth: '65ch', textAlign: 'center', mx: 'auto' }}>
						{t('payment:views.success.description')}
					</Typography>

					<Button
						onClick={handleClick}
						variant="outlined"
						sx={{
							mx: 'auto',
							width: 'fit-content',
							color: 'background.brand',
							borderColor: 'background.brand',
							'&:hover': {
								borderColor: 'background.brand',
							},
						}}
					>
						{t('payment:views.success.back')}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};
