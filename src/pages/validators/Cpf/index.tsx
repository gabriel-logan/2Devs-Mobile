import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	Clipboard,
} from 'react-native';
import { cpfIsValid } from 'multiform-validator';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CpfPage() {
	const [cpfInput, setCpfInput] = useState('');
	const [generatedCpf, setGeneratedCpf] = useState('');

	const cpfValidated = cpfIsValid(cpfInput);

	const validateCpf = () => {
		if (cpfValidated.isValid) {
			alert('CPF válido!');
		} else {
			alert('CPF inválido!');
		}
	};

	const generateRandomCpf = () => {
		let randomCpf;
		do {
			randomCpf = Math.floor(Math.random() * 99999999999)
				.toString()
				.padStart(11, '0');
		} while (!cpfIsValid(randomCpf).isValid);
		setGeneratedCpf(randomCpf);
	};

	const copyToClipboard = () => {
		// Copie o CPF gerado para a área de transferência
		if (generatedCpf) {
			Clipboard.setString(generatedCpf);
			alert('CPF copiado para a área de transferência');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Validação e Geração de CPF</Text>
			<View style={styles.inputContainer}>
				<Text>Digite um CPF:</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setCpfInput(text)}
					value={cpfInput}
					placeholder="123.456.789-09"
					keyboardType="numeric"
				/>
				<Button title="Validar CPF" onPress={validateCpf} />
			</View>
			<View style={styles.inputContainer}>
				<Text>CPF Gerado:</Text>
				<TextInput style={styles.input} value={generatedCpf} editable={false} />
				<Button title="Gerar CPF Fictício" onPress={generateRandomCpf} />
				<TouchableOpacity onPress={copyToClipboard}>
					<FontAwesome name="copy" size={24} color="black" />
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 20,
		alignItems: 'center',
	},
	input: {
		width: 200,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 10,
	},
});
