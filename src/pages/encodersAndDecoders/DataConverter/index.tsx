import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "../../../components/ThemeContext";
import getThemeColor from "../../../configs/colors";
import type { Theme } from "../../../types/themeProps";

export default function DataConverterPage() {
	const { theme } = useTheme();
	const stylesWithTheme = styles(theme);
	const { t } = useTranslation();
	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.header}>{t("Pagina para conversoes")}</Text>
			<View style={stylesWithTheme.subContainer}>
				<Text style={stylesWithTheme.subHeader}>
					{t("Modulos disponiveis")}
				</Text>
				<View style={stylesWithTheme.subItem}>
					<Text style={stylesWithTheme.subItemText}>
						{t("Converte entre ascii e hexadecimal")}
					</Text>
				</View>
				<View style={stylesWithTheme.subItem}>
					<Text style={stylesWithTheme.subItemText}>
						{t("Converte entre decimal e hexadecimal")}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: getThemeColor(theme, "cardBackground"),
		},
		header: {
			fontSize: 24,
			fontWeight: "bold",
			marginBottom: 16,
			color: getThemeColor(theme, "title"),
		},
		subContainer: {
			padding: 16,
			backgroundColor: getThemeColor(theme, "background"),
			borderRadius: 8,
		},
		subHeader: {
			fontSize: 20,
			fontWeight: "bold",
			marginBottom: 12,
			color: getThemeColor(theme, "title"),
		},
		subItem: {
			marginBottom: 8,
		},
		subItemText: {
			color: getThemeColor(theme, "text"),
		},
	});
