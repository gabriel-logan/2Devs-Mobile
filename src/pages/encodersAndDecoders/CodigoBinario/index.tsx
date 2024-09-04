import Clipboard from "@react-native-clipboard/clipboard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	TextInput,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { RFValue } from "../../../components/Responsive";
import { useTheme } from "../../../components/ThemeContext";
import getThemeColor from "../../../configs/colors";
import type { Theme } from "../../../types/themeProps";

type WhichOne = "text" | "Binario";

export default function BinaryCodePage() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [inputText, setInputText] = useState("");
	const [binaryCode, setBinaryCode] = useState("");

	const encodeToBinary = () => {
		const text = inputText;
		let binary = "";
		for (let i = 0; i < text.length; i++) {
			const charCode = text.charCodeAt(i);
			const binaryChar = charCode.toString(2).padStart(8, "0");
			binary += binaryChar + " ";
		}
		setBinaryCode(binary);
	};

	const decodeFromBinary = () => {
		const binary = binaryCode.replace(/ /g, ""); // Remove espaços em branco
		let text = "";
		for (let i = 0; i < binary.length; i += 8) {
			const binaryChar = binary.substr(i, 8);
			const charCode = parseInt(binaryChar, 2);
			text += String.fromCharCode(charCode);
		}
		setInputText(text);
	};

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	const cleanToClipboard = (whichOne: WhichOne) => {
		if (whichOne === "text") {
			setInputText("");
		} else {
			setBinaryCode("");
		}
	};

	return (
		<View style={stylesWithTheme.container}>
			<View>
				<Text style={stylesWithTheme.label}>{t("Texto")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					multiline
					placeholder={t("Digite o texto aqui")}
					placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
					value={inputText}
					onChangeText={setInputText}
					maxLength={3500}
				/>
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity
						testID="encode-buttonCopy"
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard(binaryCode)}
					>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						testID="encode-buttonClean"
						style={stylesWithTheme.buttonCopy}
						onPress={() => cleanToClipboard("text")}
					>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				<Button title={t("Codificar para Binário")} onPress={encodeToBinary} />
			</View>
			<View>
				<Text style={stylesWithTheme.label}>{t("Código Binário:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					multiline
					placeholder={t("O código binário será exibido aqui")}
					placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
					value={binaryCode}
					onChangeText={setBinaryCode}
				/>
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity
						testID="decode-buttonCopy"
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard(binaryCode)}
					>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						testID="decode-buttonClean"
						style={stylesWithTheme.buttonCopy}
						onPress={() => cleanToClipboard("Binario")}
					>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				<Button
					title={t("Decodificar para Texto")}
					onPress={decodeFromBinary}
				/>
			</View>
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
		label: {
			fontSize: RFValue(18),
			marginTop: RFValue(15),
			color: getThemeColor(theme, "text"),
		},
		input: {
			borderWidth: 1,
			borderColor: "#ccc",
			borderRadius: 5,
			padding: RFValue(10),
			marginVertical: RFValue(10),
			fontSize: RFValue(16),
			height: 200,
			textAlignVertical: "top",
			color: getThemeColor(theme, "text"),
		},
		divButtonCopy: {
			position: "absolute",
			right: RFValue(15),
			bottom: 80,
		},
		buttonCopy: {
			marginVertical: RFValue(10),
		},
	});
