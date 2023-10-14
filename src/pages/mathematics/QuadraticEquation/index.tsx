import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function QuadraticEquationPage() {
	const { t } = useTranslation();

	const [a, setA] = useState('');
	const [b, setB] = useState('');
	const [c, setC] = useState('');
	const [result, setResult] = useState(null);

	const calculateQuadraticEquation = () => {
		// Implemente aqui a lógica para calcular a equação quadrática com os valores de a, b e c.
		// O resultado pode ser armazenado em setResult.
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{t('Digite o valor de A:')}</Text>
			<TextInput
				style={styles.input}
				value={a}
				onChangeText={(text) => setA(text)}
				keyboardType="numeric"
			/>
			<Text style={styles.label}>{t('Digite o valor de B:')}</Text>
			<TextInput
				style={styles.input}
				value={b}
				onChangeText={(text) => setB(text)}
				keyboardType="numeric"
			/>
			<Text style={styles.label}>{t('Digite o valor de C:')}</Text>
			<TextInput
				style={styles.input}
				value={c}
				onChangeText={(text) => setC(text)}
				keyboardType="numeric"
			/>
			<Button title={t('Calcular')} onPress={calculateQuadraticEquation} />
			{result !== null && (
				<Text style={styles.result}>
					{t('O resultado é:')} {result}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
	},
	input: {
		width: 200,
		height: 40,
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 10,
		paddingLeft: 5,
	},
	result: {
		fontSize: 18,
		marginTop: 10,
	},
});
