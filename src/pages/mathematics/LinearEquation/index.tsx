import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LinearEquationPage() {
	const [equation, setEquation] = useState('');
	const [result, setResult] = useState('');

	const { t } = useTranslation();

	const calculateLinearEquation = () => {
		try {
			const parsedEquation = equation.replace(/\s/g, ''); // Remover espaços em branco
			const [a, b, c] = parsedEquation.split('x+').map(parseFloat);
			if (isNaN(a) || isNaN(b) || isNaN(c)) {
				setResult(t('Equação inválida'));
			} else if (a === 0) {
				setResult(t('Divisão por zero não é permitida'));
			} else {
				const solution = (c - b) / a;
				setResult(t(`Solução: x = ${solution}`));
			}
		} catch (error) {
			setResult(t('Erro ao calcular a equação'));
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{t('Digite a equação linear no formato "ax + b = c"')}</Text>
			<TextInput
				style={styles.input}
				placeholder={t('ax + b = c')}
				onChangeText={(text) => setEquation(text)}
				value={equation}
			/>
			<Button title={t('Calcular')} onPress={calculateLinearEquation} />
			<Text style={styles.result}>{t(result)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	input: {
		width: '80%',
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		marginBottom: 10,
		paddingLeft: 10,
	},
	result: {
		fontSize: 16,
		marginTop: 20,
	},
});
