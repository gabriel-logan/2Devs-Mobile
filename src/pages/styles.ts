import { StyleSheet } from "react-native";

import { RFValue, width } from "../components/Responsive";
import getThemeColor from "../configs/colors";
import type { Theme } from "../types/themeProps";

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, "background"), // Usando a paleta de cores para o fundo da página
		},
		contentContainerStyle: { flexGrow: 1, justifyContent: "center" },
		logo: {
			marginBottom: RFValue(30),
		},
		headerText: {
			fontSize: RFValue(24),
			fontWeight: "bold",
			marginBottom: RFValue(20),
			color: getThemeColor(theme, "text"), // Usando a paleta de cores para o texto
		},
		button: {
			backgroundColor: getThemeColor(theme, "primary"), // Usando a paleta de cores para o botão primário
			paddingVertical: RFValue(15),
			paddingHorizontal: RFValue(40),
			borderRadius: RFValue(25),
			marginBottom: RFValue(20),
		},
		buttonText: {
			color: "#fff",
			fontSize: RFValue(16),
			fontWeight: "bold",
			textAlign: "center",
		},
		themeContainer: {
			marginTop: RFValue(40),
			alignItems: "center",
			width: width(100),
		},
		themeTitle: {
			fontSize: RFValue(20),
			fontWeight: "bold",
			marginBottom: RFValue(15),
			color: getThemeColor(theme, "text"), // Usando a paleta de cores para o texto
		},
		themeOption: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			width: "70%",
			marginBottom: RFValue(15),
			paddingHorizontal: RFValue(20),
		},
		themeText: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, "text"), // Usando a paleta de cores para o texto
		},
	});

export default styles;
