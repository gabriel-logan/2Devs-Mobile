import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from '../../../components/Responsive';
import { useTheme } from '../../../components/ThemeContext';
import getThemeColor from '../../../configs/colors';

export default function LinearEquationPage() {
	const [equation, setEquation] = useState('');
	const [result, setResult] = useState('');
	const { t } = useTranslation();

	const { theme } = useTheme();
	const stylesWithTheme = styles(theme);

	const calculateLinearEquation = () => {
		// Verifique se a entrada é válida
		const regex = /^(-?\d+)\s?x\s?([+-]?\d+)\s?=\s?(-?\d+)$/;
		const match = equation.match(regex);

		if (!match) {
			setResult(t('Equação inválida. Use o formato'));
		} else {
			const a = parseInt(match[1]);
			const b = parseInt(match[2]);
			const c = parseInt(match[3]);

			if (a === 0) {
				setResult(t('a não pode ser zero.'));
			} else {
				const x = (c - b) / a;
				setResult(t('O valor de x é: ') + x);
			}
		}
	};

	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.header}>
				<Text style={stylesWithTheme.headerText}>{t('Digite a equação linear no formato')}</Text>
				<TextInput
					style={stylesWithTheme.input}
					placeholder={t('ax + b = c')}
					onChangeText={(text) => setEquation(text)}
					value={equation}
					placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
				/>
			</View>
			<View style={stylesWithTheme.buttonContainer}>
				<TouchableOpacity style={stylesWithTheme.button} onPress={calculateLinearEquation}>
					<Text style={stylesWithTheme.buttonText}>{t('Calcular')}</Text>
				</TouchableOpacity>
			</View>
			<View style={stylesWithTheme.resultContainer}>
				<Text style={stylesWithTheme.resultText}>{t(result)}</Text>
			</View>
		</View>
	);
}

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, 'background'),
		},
		header: {
			marginBottom: RFValue(20),
		},
		headerText: {
			fontSize: RFValue(16),
			fontWeight: 'bold',
			marginBottom: RFValue(10),
			color: getThemeColor(theme, 'title'),
		},
		input: {
			borderWidth: RFValue(1),
			borderRadius: 5,
			padding: RFValue(10),
			color: getThemeColor(theme, 'text'),
			backgroundColor: getThemeColor(theme, 'inputBackground'),
			borderColor: getThemeColor(theme, 'border'),
		},
		buttonContainer: {
			alignItems: 'center',
			marginTop: RFValue(20),
		},
		button: {
			backgroundColor: '#007AFF',
			padding: RFValue(15),
			borderRadius: 5,
		},
		buttonText: {
			color: 'white',
			fontSize: RFValue(16),
			fontWeight: 'bold',
			textAlign: 'center',
		},
		resultContainer: {
			marginTop: RFValue(20),
		},
		resultText: {
			fontSize: RFValue(16),
			textAlign: 'center',
			color: getThemeColor(theme, 'title'),
		},
	});
