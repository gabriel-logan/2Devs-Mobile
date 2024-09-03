import React from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Linking,
} from "react-native";

import { RFValue } from "../../components/Responsive";
import { useTheme } from "../../components/ThemeContext";
import {
	buyMeACoffeeURL,
	privacyURL,
	repoGithubURL,
	termsURL,
} from "../../components/Urls";
import getThemeColor from "../../configs/colors";

export default function GeneralInfoPage() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(15),
			backgroundColor: getThemeColor(theme, "cardBackground"),
		},
		section: {
			marginBottom: RFValue(20),
			backgroundColor: getThemeColor(theme, "background"),
			padding: RFValue(15),
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
		},
		sectionTitle: {
			fontSize: RFValue(24),
			fontWeight: "bold",
			color: getThemeColor(theme, "title"),
		},
		sectionText: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, "text"),
		},
		githubButton: {
			backgroundColor: getThemeColor(theme, "buttonBlack"),
			padding: RFValue(10),
			borderRadius: 5,
			marginTop: RFValue(10),
		},
		githubButtonText: {
			color: getThemeColor(theme, "textInverted"),
			textAlign: "center",
		},
		linkButton: {
			backgroundColor: "#3887db",
			padding: RFValue(10),
			borderRadius: 5,
			marginTop: RFValue(10),
			height: RFValue(45),
			justifyContent: "center",
		},
		buttonText: {
			color: "white",
			textAlign: "center",
			fontSize: RFValue(14),
		},
	});
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t("Informações Gerais")}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>
					{t("Bem-vindo à nossa aplicação de exemplo")}
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>
					{t("Se você precisar de uma validação específica")}
				</Text>
				<Text style={styles.sectionText}>
					{t("Se ocorreu algum erro, entre em contato abaixo")}
				</Text>
				<View>
					<Text style={styles.sectionText}>
						{t("Se quiser contribuir, pode fazer um commit")}
					</Text>
					<Text style={styles.sectionText}>{t("Este codigo opensorce")}</Text>
					<TouchableOpacity
						style={styles.githubButton}
						onPress={() => Linking.openURL(repoGithubURL)}
					>
						<Text style={styles.githubButtonText}>
							{t("Ir para o repositório GitHub")}
						</Text>
					</TouchableOpacity>
					<Text style={[styles.sectionText, { marginTop: 15 }]}>
						{t("Você também pode me ajudar no buymeacoffe")}
					</Text>
					<TouchableOpacity
						style={styles.githubButton}
						onPress={() => Linking.openURL(buyMeACoffeeURL)}
					>
						<Text style={styles.githubButtonText}>{t("Buy me a coffee")}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t("Contatos")}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>
					{t("E-mail: contato@exemplo.com")}
				</Text>
			</View>

			<TouchableOpacity
				style={styles.linkButton}
				onPress={() => Linking.openURL(privacyURL)}
			>
				<Text style={styles.buttonText}>{t("Políticas de Privacidade")}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.linkButton}
				onPress={() => Linking.openURL(termsURL)}
			>
				<Text style={styles.buttonText}>{t("Termos de Uso")}</Text>
			</TouchableOpacity>

			<View style={[styles.section, { marginTop: 10 }]}>
				<Text style={styles.sectionTitle}>{t("Contribuidores")}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>{t("Gabriel Logan")}</Text>
				{/* Adicione outros contribuidores aqui */}
			</View>
		</ScrollView>
	);
}
