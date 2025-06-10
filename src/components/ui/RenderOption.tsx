import { AutocompleteProps, Box } from '@mui/material';
import React from 'react';

import { ComboboxRenderableOption } from '../PaymentForm/types';

type RenderOptionFn = AutocompleteProps<ComboboxRenderableOption, false, false, true, 'div'>['renderOption'];

const RenderOption: RenderOptionFn = (props, option, { selected }) => {
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
				backgroundColor: selected ? 'background.tags' : '',
			}}
		>
			<Box width="100%">
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
