import Clipboard from "@react-native-clipboard/clipboard";
import { cnpjIsValid } from "multiform-validator";
import { useState } from "react";
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

export default function CnpjValidatorPage() {
	const { t } = useTranslation();
	const { theme } = useTheme();

	const [cnpjInput, setCnpjInput] = useState("");
	const [cnpjIsValidResult, setCnpjIsValidResult] = useState<boolean>();

	const stylesWithTheme = styles(theme, cnpjIsValidResult);

	const cnpjValidated = cnpjIsValid(cnpjInput);

	const validateCnpj = () => {
		if (cnpjValidated.isValid) {
			setCnpjIsValidResult(true);
		} else {
			setCnpjIsValidResult(false);
		}
	};

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getString();
		setCnpjInput(text);
	};

	const cleanToClipboard = () => {
		setCnpjInput("");
	};

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t("Validador de CNPJ")}</Text>
			<View style={stylesWithTheme.card}>
				<Text style={stylesWithTheme.label}>
					{t("Digite ou cole um CNPJ:")}
				</Text>
				<TextInput
					style={stylesWithTheme.input}
					onChangeText={(text) => setCnpjInput(text)}
					value={cnpjInput}
					placeholder="48.955.245/0001-01"
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
					keyboardType="numeric"
					maxLength={19}
				/>
				<Button title={t("Validar CNPJ")} onPress={validateCnpj} />
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity
						testID="buttonPaste"
						style={stylesWithTheme.buttonCopy}
						onPress={pasteToClipboard}
					>
						<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						testID="buttonCopy"
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard(cnpjInput)}
					>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						testID="buttonClean"
						style={stylesWithTheme.buttonCopy}
						onPress={cleanToClipboard}
					>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				{cnpjIsValidResult !== undefined && (
					<View testID="resultView" style={stylesWithTheme.cnpjStatus}>
						<Text
							style={
								cnpjIsValidResult
									? stylesWithTheme.validCnpjText
									: stylesWithTheme.invalidCnpjText
							}
						>
							{cnpjIsValidResult ? t("CNPJ Válido") : t("CNPJ Inválido")}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = (theme: "dark" | "light", cnpjIsValidResult?: boolean) =>
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
		divButtonCopy: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginVertical: RFValue(15),
		},
		buttonCopy: {},
		cnpjStatus: {
			backgroundColor: cnpjIsValidResult ? "#4CAF50" : "#F44336",
			padding: RFValue(10),
			borderRadius: 5,
			alignItems: "center",
			justifyContent: "center",
		},
		validCnpjText: {
			fontSize: RFValue(18),
			color: "#FFFFFF",
		},
		invalidCnpjText: {
			fontSize: RFValue(18),
			color: "#FFFFFF",
		},
	});
