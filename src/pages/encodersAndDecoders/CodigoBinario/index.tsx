import {useState} from "react";
import {useTranslation} from "react-i18next";
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {RFValue} from "../../../components/Responsive";

type WhichOne = "text" | "Binario";

export default function BinaryCodePage() {
	const {t} = useTranslation();

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
		<View style={styles.container}>
			<View>
				<Text style={styles.label}>{t("Texto:")}</Text>
				<TextInput
					style={styles.input}
					multiline
					placeholder={t("Digite o texto aqui")}
					value={inputText}
					onChangeText={setInputText}
					maxLength={3500}
				/>
				<View style={styles.divButtonCopy}>
					<TouchableOpacity style={styles.buttonCopy} onPress={() => copyToClipboard(binaryCode)}>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonCopy} onPress={() => cleanToClipboard("Binario")}>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				<Button title={t("Codificar para Binário")} onPress={encodeToBinary} />
			</View>
			<View>
				<Text style={styles.label}>{t("Código Binário:")}</Text>
				<TextInput
					style={styles.input}
					multiline
					placeholder={t("O código binário será exibido aqui")}
					value={binaryCode}
					onChangeText={setBinaryCode}
				/>
				<View style={styles.divButtonCopy}>
					<TouchableOpacity style={styles.buttonCopy} onPress={() => copyToClipboard(binaryCode)}>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonCopy} onPress={() => cleanToClipboard("Binario")}>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				<Button title={t("Decodificar para Texto")} onPress={decodeFromBinary} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: RFValue(20),
	},
	label: {
		fontSize: RFValue(18),
		marginTop: RFValue(15),
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
