import Clipboard from "@react-native-clipboard/clipboard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { RFValue } from "../../../../components/Responsive";
import { useTheme } from "../../../../components/ThemeContext";
import getThemeColor from "../../../../configs/colors";
import { Theme } from "../../../../types/themeProps";

type WhichOne = "decimal" | "binary";

export default function BinAndDecimal() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const [decimalText, setDecimalText] = useState("");
	const [binaryText, setBinaryText] = useState("");

	const stylesWithTheme = styles(theme);

	const encodeToBinary = () => {
		const decimalTextNumber = Number(decimalText);
		if (decimalText) {
			if (isNaN(decimalTextNumber)) {
				return Alert.alert(t("Erro"), t("Digite apenas numeros"));
			}
			setBinaryText(decimalTextNumber.toString(16).toUpperCase());
		}
	};

	const decodeFromBinary = () => {
		if (binaryText) {
			const cleanedBinary = binaryText.replace(/\s+/g, ""); // Remove espaços em branco, se houver
			if (!/^[0-9A-Fa-f]+$/.test(cleanedBinary)) {
				return Alert.alert(t("Erro"), t("O valor de entrada não é valido"));
			}
			setDecimalText(parseInt(cleanedBinary, 16).toString()); // Con
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
			setBinaryText(text);
		}
	};

	const cleanToClipboard = (whichOne: WhichOne) => {
		if (whichOne === "decimal") {
			setDecimalText("");
		} else {
			setBinaryText("");
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
						onChangeText={(text) => setDecimalText(text)}
						value={decimalText}
						maxLength={15000}
						keyboardType="numeric"
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard("decimal")}
						>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(decimalText)}
						>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(decimalText, "decimal")}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard("decimal")}
						>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={stylesWithTheme.button}
					onPress={encodeToBinary}
				>
					<Text style={stylesWithTheme.buttonText}>
						{t("Codificar para binario")}
					</Text>
				</TouchableOpacity>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t("Cole ou digite o código binario aqui")}
						placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
						onChangeText={(text) => setBinaryText(text)}
						value={binaryText}
						maxLength={15000}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard("binary")}
						>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(binaryText)}
						>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(binaryText, "binary")}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard("binary")}
						>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={stylesWithTheme.button}
					onPress={decodeFromBinary}
				>
					<Text style={stylesWithTheme.buttonText}>
						{t("Decodificar para decimal")}
					</Text>
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
