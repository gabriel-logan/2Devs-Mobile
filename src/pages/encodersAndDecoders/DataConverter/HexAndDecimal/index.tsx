import {useState} from "react";

import {View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import Clipboard from "@react-native-clipboard/clipboard";

import {useTheme} from "../../../../components/ThemeContext";

import getThemeColor from "../../../../configs/colors";

import {RFValue} from "../../../../components/Responsive";

import {useTranslation} from "react-i18next";

import {Theme} from "../../../../types/themeProps";

type WhichOne = "decimal" | "hex";

export default function HexAndDecimal() {
	const {t} = useTranslation();

	const {theme} = useTheme();

	const [decimalText, setDecimalText] = useState("");
	const [hexText, setHexText] = useState("");

	const stylesWithTheme = styles(theme);

	const encodeToHex = () => {
		const decimalTextNumber = Number(decimalText);
		if (decimalText) {
			if (isNaN(decimalTextNumber)) {
				return Alert.alert(t("Erro"), t("Digite apenas numeros"));
			}
			setHexText(decimalTextNumber.toString(16).toUpperCase());
		}
	};

	const decodeFromHex = () => {
		if (hexText) {
			const cleanedHex = hexText.replace(/\s+/g, ""); // Remove espaços em branco, se houver
			if (!/^[0-9A-Fa-f]+$/.test(cleanedHex)) {
				return Alert.alert(t("Erro"), t("O valor de entrada não é valido"));
			}
			setDecimalText(parseInt(cleanedHex, 16).toString()); // Con
		}
	};

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	const cutToClipboard = (textToCopy: string | null, whichOne: WhichOne) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
			cleanToClipboard(whichOne);
		}
	};

	const pasteToClipboard = async (whichOne: WhichOne) => {
		const text = await Clipboard.getString();
		if (whichOne === "decimal") {
			setDecimalText(text);
		} else {
			setHexText(text);
		}
	};

	const cleanToClipboard = (whichOne: WhichOne) => {
		if (whichOne === "decimal") {
			setDecimalText("");
		} else {
			setHexText("");
		}
	};

	return (
		<View style={stylesWithTheme.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t("Cole ou digite o numero decimal aqui")}
						placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
						onChangeText={text => setDecimalText(text)}
						value={decimalText}
						maxLength={15000}
						keyboardType="numeric"
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard("decimal")}>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(decimalText)}>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(decimalText, "decimal")}>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard("decimal")}>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={encodeToHex}>
					<Text style={stylesWithTheme.buttonText}>{t("Codificar para Hex")}</Text>
				</TouchableOpacity>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t("Cole ou digite o código Hex aqui")}
						placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
						onChangeText={text => setHexText(text)}
						value={hexText}
						maxLength={15000}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard("hex")}>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(hexText)}>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(hexText, "hex")}>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard("hex")}>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={decodeFromHex}>
					<Text style={stylesWithTheme.buttonText}>{t("Decodificar para decimal")}</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, "background"),
		},
		inputContainer: {
			width: "100%",
			flexDirection: "row",
			alignItems: "center",
			marginBottom: RFValue(10),
		},
		input: {
			flex: 1,
			height: RFValue(200),
			borderColor: "gray",
			borderWidth: 0.5,
			borderRadius: 4,
			textAlignVertical: "top",
			padding: RFValue(10),
			color: getThemeColor(theme, "text"),
			backgroundColor: getThemeColor(theme, "cardBackground"),
		},
		button: {
			backgroundColor: "#007AFF",
			padding: RFValue(10),
			borderRadius: 5,
			margin: RFValue(10),
		},
		buttonText: {
			color: "white",
			textAlign: "center",
		},
		divButtonCopy: {
			position: "absolute",
			right: RFValue(15),
		},
		buttonCopy: {
			marginVertical: RFValue(10),
		},
	});
