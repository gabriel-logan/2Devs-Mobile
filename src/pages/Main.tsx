import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	Text,
	TouchableOpacity,
	Switch,
	useColorScheme,
	StatusBar,
	Linking,
	Alert,
	ScrollView,
} from "react-native";

import ChangeLangModal from "./ChangeLandModal";
import styles from "./styles";
import Loading from "../components/Loading";
import LogoComponent from "../components/LogoComponent";
import { RFValue } from "../components/Responsive";
import { useTheme } from "../components/ThemeContext";
import getThemeColor from "../configs/colors";
import { NavigationPropsTypes } from "../types/navigationProps";

export default function Main({ navigation }: NavigationPropsTypes) {
	const { t } = useTranslation();

	const { theme, toggleTheme } = useTheme();

	const stylesWithTheme = styles(theme);

	const systemTheme = useColorScheme() as typeof theme;

	// Estado do Loading
	const [isLoading, setIsLoading] = useState(true);

	// Estado para rastrear o tema selecionado
	const [selectedTheme, setSelectedTheme] = useState<typeof theme | "system">(
		theme
	);

	const [modalChangeLang, setModalChangeLang] = useState(false);

	const handleThemeChange = async (selectedTheme: typeof theme | "system") => {
		if (selectedTheme === "system") {
			if (systemTheme) {
				toggleTheme(systemTheme);
			} else {
				toggleTheme("light");
			}
			// Define o tema com base no sistema (usando useColorScheme)
		} else {
			toggleTheme(selectedTheme);
		}

		setSelectedTheme(selectedTheme);
		await AsyncStorage.setItem("themeSelected", selectedTheme);
	};

	useEffect(() => {
		(async () => {
			const getThemeCoice = (await AsyncStorage.getItem("themeSelected")) as
				| typeof theme
				| null;
			if (getThemeCoice) {
				setSelectedTheme(getThemeCoice);
			}
			try {
				const termsAccept = await AsyncStorage.getItem("termsAccept");
				if (!termsAccept || !JSON.parse(termsAccept)) {
					navigation.reset({
						index: 0,
						routes: [{ name: "Initial" }],
					});
				}
			} catch (error) {
				Alert.alert(
					t("Alguma coisa errada aconteceu, contate o desenvolvedor")
				);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [navigation, t]);

	// APenas o componente Loading
	if (isLoading) {
		return <Loading />;
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
		>
			<View style={stylesWithTheme.container}>
				<StatusBar
					barStyle={theme === "dark" ? "light-content" : "dark-content"}
					backgroundColor={getThemeColor(theme, "background")}
					animated
				/>

				<LogoComponent
					style={stylesWithTheme.logo}
					width={RFValue(256)}
					height={RFValue(128)}
				/>

				<Text style={stylesWithTheme.headerText}>
					{t("Bem-vindo ao 2Devs")}
				</Text>

				<TouchableOpacity
					style={stylesWithTheme.button}
					onPress={() =>
						Linking.openURL(
							"https://play.google.com/store/apps/details?id=com.gabriellogan.toDevs"
						)
					}
				>
					<Text style={stylesWithTheme.buttonText}>
						{t("Avalie o aplicativo")}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={stylesWithTheme.button}
					onPress={() => setModalChangeLang(true)}
				>
					<Text style={stylesWithTheme.buttonText}>{t("Alterar idioma")}</Text>
				</TouchableOpacity>

				<ChangeLangModal
					modalChangeLang={modalChangeLang}
					setModalChangeLang={setModalChangeLang}
				/>
				<View style={stylesWithTheme.themeContainer}>
					<Text style={stylesWithTheme.themeTitle}>{t("Escolha o Tema:")}</Text>
					<View style={stylesWithTheme.themeOption}>
						<Text style={stylesWithTheme.themeText}>{t("Tema claro")}</Text>
						<Switch
							thumbColor={theme === "dark" ? "#4b95f5" : "#f4f3f4"}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							value={selectedTheme === "light"} // Define o valor do switch com base no tema selecionado
							onValueChange={() => handleThemeChange("light")}
						/>
					</View>
					<View style={stylesWithTheme.themeOption}>
						<Text style={stylesWithTheme.themeText}>{t("Tema escuro")}</Text>
						<Switch
							thumbColor={theme === "dark" ? "#4b95f5" : "#f4f3f4"}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							value={selectedTheme === "dark"} // Define o valor do switch com base no tema selecionado
							onValueChange={() => handleThemeChange("dark")}
						/>
					</View>
					<View style={stylesWithTheme.themeOption}>
						<Text style={stylesWithTheme.themeText}>
							{t("Tema do sistema")}
						</Text>
						<Switch
							thumbColor={theme === "dark" ? "#4b95f5" : "#f4f3f4"}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							value={selectedTheme === "system"} // Define o valor do switch com base no tema selecionado
							onValueChange={() => handleThemeChange("system")}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
