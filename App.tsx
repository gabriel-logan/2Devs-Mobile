import "react-native-gesture-handler";

import {NavigationContainer} from "@react-navigation/native";

import ThemeProvider from "./src/components/ThemeContext";

import Routes from "./src/Routes";

import "./src/utils/translations/i18n";

export default function App() {
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</ThemeProvider>
	);
}
