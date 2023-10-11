import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

export default function BinaryCodePage() {
	const { t } = useTranslation();

	const [inputText, setInputText] = useState('');
	const [binaryCode, setBinaryCode] = useState('');

	const encodeToBinary = () => {
		const text = inputText;
		let binary = '';
		for (let i = 0; i < text.length; i++) {
			const charCode = text.charCodeAt(i);
			const binaryChar = charCode.toString(2).padStart(8, '0');
			binary += binaryChar + ' ';
		}
		setBinaryCode(binary);
	};

	const decodeFromBinary = () => {
		const binary = binaryCode.replace(/ /g, ''); // Remove espaços em branco
		let text = '';
		for (let i = 0; i < binary.length; i += 8) {
			const binaryChar = binary.substr(i, 8);
			const charCode = parseInt(binaryChar, 2);
			text += String.fromCharCode(charCode);
		}
		setInputText(text);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{t('Texto:')}</Text>
			<TextInput
				style={styles.input}
				multiline
				placeholder={t('Digite o texto aqui')}
				value={inputText}
				onChangeText={setInputText}
				maxLength={3500}
			/>
			<Button title={t('Codificar para Binário')} onPress={encodeToBinary} />
			<Text style={styles.label}>{t('Código Binário:')}</Text>
			<TextInput
				style={styles.input}
				multiline
				placeholder={t('O código binário será exibido aqui')}
				value={binaryCode}
				onChangeText={setBinaryCode}
			/>
			<Button title={t('Decodificar para Texto')} onPress={decodeFromBinary} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	label: {
		fontSize: 18,
		marginTop: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginVertical: 10,
		fontSize: 16,
		height: 200,
		textAlignVertical: 'top',
	},
});
