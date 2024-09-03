import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import CheckBox from "@react-native-community/checkbox";
import { MD5 } from "crypto-js";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
import { RFValue } from "../../../components/Responsive";
import { useTheme } from "../../../components/ThemeContext";
import getThemeColor from "../../../configs/colors";

export default function Md5Page() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const [inputText, setInputText] = useState("");
	const [md5Hash, setMd5Hash] = useState("");
	const [cleanAlways, setCleanAlways] = useState(false);

	const stylesWithTheme = styles(theme);

	const encodeToMd5 = (text: string) => {
		const valor = MD5(text).toString();
		setMd5Hash(valor);
		if (cleanAlways) {
			setInputText("");
		}
	};

	const copyToClipboard = () => {
		if (md5Hash) {
			Clipboard.setString(md5Hash);
		}
	};

	const cutToClipboard = () => {
		if (md5Hash) {
			Clipboard.setString(md5Hash);
		}
		setMd5Hash("");
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getString();
		setInputText(text);
	};

	const cleanToClipboard = () => setMd5Hash("");

	useEffect(() => {
		(async () => {
			const md5AlwaysClean = await AsyncStorage.getItem(
				"md5AlwaysCleanAfterGenerate"
			);
			if (md5AlwaysClean) {
				setCleanAlways(JSON.parse(md5AlwaysClean));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.section}>
				<Text style={stylesWithTheme.paragraph}>
					{t("Apagar apos gerar ?")}
				</Text>
				<CheckBox
					style={stylesWithTheme.checkbox}
					value={cleanAlways}
					onValueChange={async (cleanAlwaysChange) => {
						setCleanAlways(cleanAlwaysChange.valueOf());
						await AsyncStorage.setItem(
							"md5AlwaysCleanAfterGenerate",
							JSON.stringify(cleanAlwaysChange.valueOf())
						);
					}}
					color={cleanAlways ? "#5446bf" : undefined}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t("Cole ou digite o texto aqui")}
						placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
						onChangeText={(text) => setInputText(text)}
						value={inputText}
						multiline
					/>
				</View>
				<TouchableOpacity
					style={stylesWithTheme.button}
					onPress={() => encodeToMd5(inputText)}
				>
					<Text style={stylesWithTheme.buttonText}>
						{t("Codificar para Md5")}
					</Text>
				</TouchableOpacity>
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => pasteToClipboard()}
					>
						<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard()}
					>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => cutToClipboard()}
					>
						<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => cleanToClipboard()}
					>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				<View
					style={{
						backgroundColor: "lightgray",
						padding: 10,
						borderRadius: 5,
						margin: 10,
					}}
				>
					<Text
						style={{ fontSize: RFValue(16), fontWeight: "bold", color: "blue" }}
					>
						{t("MD5 HASH:")} {md5Hash}
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}
