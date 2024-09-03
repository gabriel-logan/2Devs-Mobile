import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import CheckBox from "@react-native-community/checkbox";
import { isCreditCardValid } from "multiform-validator";
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

export default function CreditCardGeneratorPage() {
	const { t } = useTranslation();
	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [generatedCreditCard, setGeneratedCreditCard] = useState("");
	const [creditCardWithPeriod, setCreditCardWithPeriod] = useState(false);

	const formatCreditCard = (creditCard: string) => {
		// Remova todos os espaços e hifens do número do cartão
		const cleanedCreditCard = creditCard.replace(/[-\s]/g, "");

		// Use expressões regulares para dividir o número do cartão em grupos de 4 dígitos
		const formattedCreditCard = cleanedCreditCard.replace(
			/\d{4}(?=\d)/g,
			"$& "
		);

		return formattedCreditCard;
	};

	const generateRandomCreditCard = () => {
		let randomCreditCard: string;
		do {
			randomCreditCard = generateRandomDigits(16);
		} while (!isCreditCardValid(randomCreditCard));
		if (creditCardWithPeriod) {
			setGeneratedCreditCard(formatCreditCard(randomCreditCard));
		} else {
			setGeneratedCreditCard(randomCreditCard);
		}
	};

	function generateRandomDigits(numDigits: number): string {
		let randomDigits = "";
		for (let i = 0; i < numDigits; i++) {
			const randomDigit = Math.floor(Math.random() * 10); // Gera um dígito aleatório de 0 a 9
			randomDigits += randomDigit.toString();
		}
		return randomDigits;
	}

	const copyToClipboard = async () => {
		if (generatedCreditCard) {
			Clipboard.setString(generatedCreditCard);
		}
	};

	useEffect(() => {
		(async () => {
			const creditCardGeneratedWithPeriod = await AsyncStorage.getItem(
				"creditCardGeneratedWithPeriod"
			);
			if (creditCardGeneratedWithPeriod) {
				setCreditCardWithPeriod(JSON.parse(creditCardGeneratedWithPeriod));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>
				{t("Gerador de Cartão de crédito")}
			</Text>
			<View style={stylesWithTheme.card}>
				<View style={stylesWithTheme.section}>
					<Text style={stylesWithTheme.paragraph}>
						{t("Gerar com espaços ?")}
					</Text>
					<CheckBox
						style={stylesWithTheme.checkbox}
						value={creditCardWithPeriod}
						onValueChange={async (cleanAlwaysChange) => {
							setCreditCardWithPeriod(cleanAlwaysChange.valueOf());
							await AsyncStorage.setItem(
								"creditCardGeneratedWithPeriod",
								JSON.stringify(cleanAlwaysChange.valueOf())
							);
						}}
					/>
				</View>
				<Text style={stylesWithTheme.label}>
					{t("Cartão de crédito Gerado:")}
				</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={generatedCreditCard}
					editable={false}
					placeholder={t("Clique no botão abaixo")}
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
				/>
				<Button
					title={t("Gerar Cartão de crédito")}
					onPress={generateRandomCreditCard}
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
			fontSize: RFValue(24), // Responsive font size
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
