import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import ThemeProvider, { useTheme } from './src/components/ThemeContext';

import Routes from './src/Routes';

import { StatusBar } from 'expo-status-bar';

import './src/utils/translations/i18n';

export default function App() {
	const { theme } = useTheme();

	const [statusTheme, setStatusTheme] = useState<typeof theme>('dark');

	useEffect(() => {
		setStatusTheme(theme);
	}, [theme]);
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Routes />
				<StatusBar style={statusTheme} />
			</NavigationContainer>
		</ThemeProvider>
	);
}
