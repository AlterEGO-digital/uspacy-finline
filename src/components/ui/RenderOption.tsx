import { AutocompleteProps, Box } from '@mui/material';
import React from 'react';

import { ComboboxRenderableOption } from '../PaymentForm/types';

type RenderOptionFn = AutocompleteProps<ComboboxRenderableOption, false, false, true, 'div'>['renderOption'];

const RenderOption: RenderOptionFn = (props, option, { inputValue }) => {
	return (
		<Box
			component="li"
			{...props}
			sx={{
				textAlign: 'left',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				width: '100%',
				p: 1,
				...(inputValue === option.id && { backgroundColor: 'action.selected', fontWeight: 'bold' }),
			}}
		>
			<Box width="100%" sx={{}}>
				<Box component="div" sx={{ font: 'medium' }}>
					{option.label}
				</Box>
				<Box component="div" color="text.secondary" sx={{ fontSize: '12px' }}>
					{option.owner}
				</Box>
			</Box>
		</Box>
	);
};

export const RenderEmailOption = RenderOption;
export const RenderPhoneOption = RenderOption;
