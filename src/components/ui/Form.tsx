import {
	Autocomplete,
	Box,
	IconButton,
	InputAdornment,
	InputLabel,
	styled,
	SxProps,
	TextField,
	TextFieldProps,
	Theme,
	Typography,
} from '@mui/material';
import React, { forwardRef, useState } from 'react';

import VisibilityOn from '../../static/images/eye-01.svg';
import VisibilityOff from '../../static/images/eye-off-01.svg';

export const TextInput = styled(TextField)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,

	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			border: '1px solid #dfe1e6',
			boxShadow: '0 1px 1px rgba(0,0,0,.08)',
		},
		'&:hover fieldset': {
			border: '1px solid #dfe1e6',
			boxShadow: '0 1px 1px rgba(0,0,0,.08)',
		},
		'&.Mui-disabled fieldset': {
			border: '1px solid #dfe1e6',
			boxShadow: '0 1px 1px rgba(0,0,0,.08)',
		},
		'&.Mui-focused fieldset': {
			border: `2px solid ${theme.palette.background.brand}`,
			boxShadow: '0 1px 1px rgba(0,0,0,.08)',
		},
		'&.Mui-focused.Mui-error fieldset': {
			border: `2px solid ${theme.palette.error.main}`,
			boxShadow: '0 1px 1px rgba(0,0,0,.08)',
		},
		'&.Mui-error fieldset': {
			border: `1px solid ${theme.palette.error.main}`,
		},

		'&.Mui-error .MuiInputBase-input': {
			'&::placeholder': {
				color: theme.palette.error.main,
			},
		},
	},

	'& .MuiInputBase-input': {
		...theme.typography.body1,
		color: theme.palette.text.primary,
		'&::placeholder': {
			color: theme.palette.text.secondary,
		},
	},
}));

export const TextInputLabel = styled(InputLabel)(() => ({
	textAlign: 'left',
	fontFamily: 'Inter',
	fontStyle: 'normal',
	fontWeight: 500,
	fontSize: 12,
	lineHeight: '24px',
	color: '#7A869A',
	'& .MuiFormLabel-asterisk': {
		color: '#aa2b2b',
	},
	left: -14,
	top: -42,
}));

export const Combobox = Autocomplete;

interface FieldsetProps {
	title?: React.ReactNode;
	color?: string;
	titleSize?: string;
	borderWidth?: number;
	borderRadius?: number;
	children: React.ReactNode;
	sx?: SxProps<Theme>;
	disabled?: boolean;
}

export const Fieldset = ({ title, color = '#ffffff', titleSize = '0.75rem', children, sx = {}, disabled, ...props }: FieldsetProps) => {
	return (
		<Box
			component="fieldset"
			sx={{
				position: 'relative',
				border: 'none',
				m: 0,
				'&:after': {
					content: '""',
					position: 'absolute',
					width: 'calc(100% - 16px)',
					height: '1px',
					backgroundColor: 'grey.400',
					top: '-17px',
				},
				...sx,
			}}
			{...props}
		>
			{title && (
				<Typography
					component="legend"
					sx={{
						color: color,
						fontSize: titleSize,
						position: 'relative',
						backgroundColor: 'background.brand',
						padding: '8px 12px',
						borderRadius: '4px',
						zIndex: 2,
						'&:after': {
							content: '""',
							position: 'absolute',
							width: '8px',
							height: '100%',
							top: 0,
							right: '-8px',
							backgroundColor: '#ffffff',
							zIndex: 1,
						},
						'& *': {
							position: 'relative',
							zIndex: 3,
							opacity: disabled ? '0.5' : '1',
						},
						...(disabled && {
							'&:before': {
								content: '""',
								position: 'absolute',
								width: '100%',
								height: '100%',
								top: 0,
								left: 0,
								backgroundColor: '#ffffff',
								borderRadius: 'inherit',
								zIndex: 2,
								opacity: disabled ? '0.5' : '1',
							},
						}),
					}}
				>
					{title}
				</Typography>
			)}
			{children}
		</Box>
	);
};

export const PasswordTextInput = forwardRef(({ disabled, ...props }: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<TextInput
			ref={ref}
			type={isVisible ? 'text' : 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position="start">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setIsVisible((prev) => !prev)}
							onMouseDown={handleMouseDownPassword}
							edge="end"
							disabled={disabled}
						>
							{isVisible ? <VisibilityOff /> : <VisibilityOn />}
						</IconButton>
					</InputAdornment>
				),
			}}
			disabled={disabled}
			{...props}
		/>
	);
});

PasswordTextInput.displayName = 'PasswordTextInput';
