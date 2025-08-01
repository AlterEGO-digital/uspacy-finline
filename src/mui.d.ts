import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}

	interface TypeBackground {
		brand?: string;
	}
}
