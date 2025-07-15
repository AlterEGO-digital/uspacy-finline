import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import React, { ReactNode } from 'react';

import LocalizationProvider from './context/Localization';
import { StoreProvider } from './context/StoreProvider';
import UserSettingsProvider from './context/UserSettings';
import { IUserSettings } from './models/userSettings';
import { theme } from './static/styles/theme';

interface Props {
	children: ReactNode;
	userSettings?: IUserSettings;
}
const Providers: React.FC<Props> = ({ children, userSettings }) => {
	return (
		<ThemeProvider theme={theme}>
			<UserSettingsProvider userSettings={userSettings}>
				<StoreProvider>
					<LocalizationProvider>
						<SnackbarProvider autoHideDuration={2000}>{children}</SnackbarProvider>
					</LocalizationProvider>
				</StoreProvider>
			</UserSettingsProvider>
		</ThemeProvider>
	);
};

export default Providers;
