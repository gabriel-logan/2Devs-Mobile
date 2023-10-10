import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import base64 from 'react-native-base64';
import Icon from 'react-native-vector-icons/FontAwesome';

import Clipboard from '@react-native-clipboard/clipboard';

export default function Base64Page() {
	const [inputText, setInputText] = useState('');
	const [base64Text, setBase64Text] = useState('');
	const [decodedText, setDecodedText] = useState('');

	const encodeToBase64 = () => {
		const encoded = base64.encode(inputText);
		setBase64Text(encoded);
	};

	const decodeFromBase64 = () => {
		const decoded = base64.decode(base64Text);
		setDecodedText(decoded);
	};

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Digite o texto"
					onChangeText={(text) => setInputText(text)}
					value={inputText}
				/>
				<TouchableOpacity onPress={() => copyToClipboard(inputText)}>
					<Icon name="copy" size={20} color="#007AFF" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={encodeToBase64}>
				<Text style={styles.buttonText}>Codificar para Base64</Text>
			</TouchableOpacity>
			{base64Text !== '' && (
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>Código Base64: {base64Text}</Text>
					<TouchableOpacity onPress={() => copyToClipboard(base64Text)}>
						<Icon name="copy" size={20} color="#007AFF" />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Cole o código Base64 aqui"
					onChangeText={(text) => setBase64Text(text)}
					value={base64Text}
				/>
				<TouchableOpacity onPress={() => copyToClipboard(base64Text)}>
					<Icon name="copy" size={20} color="#007AFF" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={decodeFromBase64}>
				<Text style={styles.buttonText}>Decodificar para Texto</Text>
			</TouchableOpacity>
			{decodedText !== '' && (
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>Texto Decodificado: {decodedText}</Text>
					<TouchableOpacity onPress={() => copyToClipboard(decodedText)}>
						<Icon name="copy" size={20} color="#007AFF" />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: '#007AFF',
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	resultContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	resultText: {
		flex: 1,
		fontSize: 16,
	},
});
