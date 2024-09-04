import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

import { RFValue } from "../components/Responsive";
import { useTheme } from "../components/ThemeContext";
import getThemeColor from "../configs/colors";

interface ChangeLangModalProps {
	modalChangeLang: boolean;
	setModalChangeLang: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeLangModal({
	modalChangeLang,
	setModalChangeLang,
}: ChangeLangModalProps) {
	const { theme } = useTheme();
	const stylesWithTheme = styles(theme);
	const { i18n } = useTranslation();
	const changeLanguage = async (lang: string) => {
		await AsyncStorage.setItem("selectedLanguage", lang);
		i18n.changeLanguage(lang);
	};

	const languageMappings: Record<string, string> = {
		af: "Afrikaans",
		ar: "العربية",
		bg: "български",
		ca: "Català",
		cs: "Čeština",
		cy: "Cymraeg",
		da: "Dansk",
		de: "Deutsch",
		el: "Ελληνικά",
		en: "English",
		es: "Español",
		fa: "فارسی",
		fi: "Suomi",
		fr: "Français",
		he: "עברית",
		hi: "हिन्दी",
		hr: "Hrvatski",
		hu: "Magyar",
		id: "Bahasa Indonesia",
		is: "Íslenska",
		it: "Italiano",
		ja: "日本語",
		ko: "한국어",
		lt: "Lietuvių",
		lv: "Latviešu",
		ms: "Bahasa Melayu",
		mt: "Malti",
		nb: "Norsk (Bokmål)",
		nl: "Nederlands",
		pl: "Polski",
		ptBR: "Português (BR)",
		ptPT: "Português (PT)",
		ro: "Română",
		ru: "Русский",
		sk: "Slovenčina",
		sl: "Slovenščina",
		srLatn: "Srpski (Latinica)",
		sv: "Svenska",
		sw: "Kiswahili (Latin)",
		th: "ไทย",
		tr: "Türkçe",
		uk: "Українська",
		ur: "اردو",
		vi: "Tiếng Việt",
		zh: "中文",
		zhHans: "简体中文",
		zhHant: "繁體中文",
	};

	const languages: string[] = Object.keys(languageMappings);

	return (
		<Modal
			testID="modal-change-lang"
			visible={modalChangeLang}
			onRequestClose={() => setModalChangeLang(false)}
			transparent
		>
			<TouchableOpacity
				testID="modal-background"
				style={stylesWithTheme.modalContainer}
				onPress={() => setModalChangeLang(false)}
			>
				<ScrollView style={stylesWithTheme.scrollContainer}>
					{languages.map((languageCode) => (
						<TouchableOpacity
							testID={`language-button-${languageCode}`}
							style={stylesWithTheme.languageButton}
							onPress={() => {
								changeLanguage(languageCode);
								setModalChangeLang(false);
							}}
							key={languageCode}
						>
							<Text style={stylesWithTheme.languageText}>
								{languageMappings[languageCode]}
							</Text>
						</TouchableOpacity>
					))}
					<TouchableOpacity
						testID="language-button-klingon"
						style={[
							stylesWithTheme.languageButton,
							stylesWithTheme.marginBotton35,
						]}
						onPress={() => changeLanguage("klingon")}
					>
						<Text style={stylesWithTheme.languageText}>Klingon</Text>
					</TouchableOpacity>
				</ScrollView>
			</TouchableOpacity>
		</Modal>
	);
}

const styles = (theme: "dark" | "light") =>
	StyleSheet.create({
		modalContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "rgba(0, 0, 0, 0.5)", // Um fundo semi-transparente para o modal
		},
		scrollContainer: {
			width: "80%", // Largura do conteúdo do ScrollView
			backgroundColor: getThemeColor(theme, "background"), // Cor de fundo do ScrollView
			borderRadius: 4,
			maxHeight: RFValue(450),
			padding: RFValue(20),
		},
		languageButton: {
			padding: RFValue(10),
			borderBottomWidth: 1,
			borderBottomColor: getThemeColor(theme, "border"), // Cor da linha separadora		borderWidth: 1,
		},
		languageText: {
			fontSize: RFValue(18),
			fontWeight: "bold",
			color: getThemeColor(theme, "text"),
		},
		marginBotton35: { marginBottom: 35 },
	});
