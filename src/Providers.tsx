import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import React, { ReactNode, useLayoutEffect } from 'react';

import LocalizationProvider from './context/Localization';
import { StoreProvider } from './context/StoreProvider';
import UserSettingsProvider from './context/UserSettings';
import { useIntegrationToken } from './hooks/useIntegrationToken';
import { IUserSettings } from './models/userSettings';
import { theme } from './static/styles/theme';

interface Props {
	children: ReactNode;
	userSettings?: IUserSettings;
	integrationToken?: string;
}
const Providers: React.FC<Props> = ({ children, userSettings, integrationToken }) => {
	return (
		<ThemeProvider theme={theme}>
			<UserSettingsProvider userSettings={userSettings}>
				<StoreProvider>
					<TokenProvider integrationToken={integrationToken}>
						<LocalizationProvider>
							<SnackbarProvider autoHideDuration={2000}>{children}</SnackbarProvider>
						</LocalizationProvider>
					</TokenProvider>
				</StoreProvider>
			</UserSettingsProvider>
		</ThemeProvider>
	);
};

function TokenProvider({ integrationToken, children }: { integrationToken: string; children: React.ReactNode }) {
	const { setToken } = useIntegrationToken();

	useLayoutEffect(() => {
		if (integrationToken) {
			setToken(integrationToken);
		}
	}, [integrationToken]);

	return <>{children}</>;
}

export default Providers;
