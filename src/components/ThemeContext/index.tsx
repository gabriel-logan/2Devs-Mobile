import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { Alert, useColorScheme } from "react-native";

import type {
	Theme,
	ThemeChanges,
	ThemeContextProps,
} from "../../types/themeProps";

const ThemeContext = createContext<ThemeContextProps | string>("light");

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const systemTheme = useColorScheme() as Theme | null;

	const [theme, setTheme] = useState<Theme>(
		systemTheme === "dark" ? "dark" : "light"
	);

	const toggleTheme = async (newTheme: Theme) => {
		setTheme(newTheme);
	};

	const contextValue: ThemeContextProps = {
		theme,
		toggleTheme,
	};

	useEffect(() => {
		(async () => {
			try {
				const themeSelected = (await AsyncStorage.getItem(
					"themeSelected"
				)) as ThemeChanges | null;
				// Verifico se existe algo no storage
				if (themeSelected) {
					// Verifico se o que tem la é igual a sytem para poder setar o tema default do dispositivo
					if (themeSelected === "system") {
						// Verifico SE existe o tema default no dispositivo
						if (systemTheme) {
							// Seto o tema do celular
							setTheme(systemTheme);
						}
					} else {
						// Seto o tema escolhido pelo usuario SE nao tiver nada SYSTEM no storage
						setTheme(themeSelected);
					}
				} // Nao precisa de else pois o estado inicial é light
			} catch {
				Alert.alert(
					"Something strange happened when trying to change the theme, contact the developer"
				);
			}
		})();
	}, [systemTheme]);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext) as ThemeContextProps;

	return context;
};
