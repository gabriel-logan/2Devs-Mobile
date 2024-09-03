import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import CheckBox from "@react-native-community/checkbox";
import { cpfIsValid } from "multiform-validator";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { RFValue } from "../../../components/Responsive";
import { useTheme } from "../../../components/ThemeContext";
import getThemeColor from "../../../configs/colors";

export default function CpfGeneratorPage() {
	const { t } = useTranslation();
	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [generatedCpf, setGeneratedCpf] = useState("");
	const [cpfWithPeriod, setCpfWithPeriod] = useState(false);

	const formatCpf = (cpf: string) => {
		if (cpf && cpf.length === 11) {
			return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
				6,
				9
			)}-${cpf.slice(9)}`;
		}
		return cpf;
	};

	const generateRandomCpf = () => {
		let randomCpf: string;
		do {
			randomCpf = Math.floor(Math.random() * 99999999999)
				.toString()
				.padStart(11, "0");
		} while (!cpfIsValid(randomCpf).isValid);
		if (cpfWithPeriod) {
			setGeneratedCpf(formatCpf(randomCpf));
		} else {
			setGeneratedCpf(randomCpf);
		}
	};

	const copyToClipboard = () => {
		if (generatedCpf) {
			Clipboard.setString(generatedCpf);
		}
	};

	useEffect(() => {
		(async () => {
			const cpfGeneratedWithPeriod = await AsyncStorage.getItem(
				"cpfGeneratedWithPeriod"
			);
			if (cpfGeneratedWithPeriod) {
				setCpfWithPeriod(JSON.parse(cpfGeneratedWithPeriod));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t("Gerador de CPF")}</Text>
			<View style={stylesWithTheme.card}>
				<View style={stylesWithTheme.section}>
					<Text style={stylesWithTheme.paragraph}>
						{t("Gerar com pontuação ?")}
					</Text>
					<CheckBox
						style={stylesWithTheme.checkbox}
						value={cpfWithPeriod}
						onValueChange={async (cleanAlwaysChange) => {
							setCpfWithPeriod(cleanAlwaysChange.valueOf());
							await AsyncStorage.setItem(
								"cpfGeneratedWithPeriod",
								JSON.stringify(cleanAlwaysChange.valueOf())
							);
						}}
					/>
					{/** color={cpfWithPeriod ? '#5446bf' : undefined} checkbox old color */}
				</View>
				<Text style={stylesWithTheme.label}>{t("CPF Gerado:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={generatedCpf}
					editable={false}
					placeholder={t("Clique no botão abaixo")}
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
				/>
				<Button
					title={t("Gerar CPF")}
					onPress={generateRandomCpf}
					color="#007BFF"
				/>
				<View style={stylesWithTheme.copyButtonContainer}>
					<TouchableOpacity onPress={copyToClipboard}>
						<FontAwesome name="copy" size={RFValue(32)} color="#007BFF" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = (theme: "dark" | "light") =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: getThemeColor(theme, "background"),
			alignItems: "center",
			justifyContent: "center",
		},
		title: {
			fontSize: RFValue(28), // Responsive font size
			fontWeight: "bold",
			marginBottom: RFValue(20), // Responsive margin
			color: getThemeColor(theme, "title"),
		},
		card: {
			width: "80%",
			backgroundColor: getThemeColor(theme, "cardBackground"),
			borderRadius: RFValue(10), // Responsive border radius
			padding: RFValue(20), // Responsive padding
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2, // Responsive shadow offset
			},
			shadowOpacity: 0.2,
			shadowRadius: 2, // Responsive shadow radius
			elevation: 3, // Responsive elevation
		},
		label: {
			fontSize: RFValue(20), // Responsive font size
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, "text"),
		},
		input: {
			height: RFValue(50), // Responsive height
			borderWidth: 1, // Responsive border width
			borderColor: getThemeColor(theme, "border"),
			padding: RFValue(10), // Responsive padding
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, "text"),
			textAlign: "center",
			textAlignVertical: "center",
			fontSize: RFValue(16),
			backgroundColor: getThemeColor(theme, "inputBackground"),
		},
		copyButtonContainer: {
			alignItems: "center",
			marginTop: RFValue(20), // Responsive margin
		},
		section: {
			flexDirection: "row",
			alignItems: "center",
		},
		paragraph: {
			fontSize: RFValue(15),
			color: getThemeColor(theme, "text"),
		},
		checkbox: {
			margin: 8,
		},
	});
