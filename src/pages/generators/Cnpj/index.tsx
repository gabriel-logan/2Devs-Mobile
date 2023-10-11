import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import Checkbox from 'expo-checkbox';

import { cnpjIsValid } from 'multiform-validator';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { RFValue } from '../../../components/Responsive';
import getThemeColor from '../../../configs/colors';
import { useTheme } from '../../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function CnpjGeneratorPage() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [generatedCnpj, setGeneratedCnpj] = useState('');
	const [cnpjWithPeriod, setCnpjWithPeriod] = useState(false);

	const formatCnpj = (Cnpj: string) => {
		if (Cnpj && Cnpj.length === 14) {
			return `${Cnpj.slice(0, 2)}.${Cnpj.slice(2, 5)}.${Cnpj.slice(5, 8)}/${Cnpj.slice(
				8,
				12,
			)}-${Cnpj.slice(12)}`;
		}
		return Cnpj;
	};

	const generateRandomCnpj = () => {
		let randomCnpj: string;
		do {
			randomCnpj = generateRandomDigits();
		} while (!cnpjIsValid(randomCnpj).isValid);
		if (cnpjWithPeriod) {
			setGeneratedCnpj(formatCnpj(randomCnpj));
		} else {
			setGeneratedCnpj(randomCnpj);
		}
	};

	function generateRandomDigits(): string {
		let randomDigits = '';
		for (let i = 0; i < 14; i++) {
			const randomDigit = Math.floor(Math.random() * 10); // Gera um dígito aleatório de 0 a 9
			randomDigits += randomDigit.toString();
		}
		return randomDigits;
	}

	const copyToClipboard = async () => {
		if (generatedCnpj) {
			await Clipboard.setStringAsync(generatedCnpj);
		}
	};

	useEffect(() => {
		(async () => {
			const cnpjWithPeriod = await AsyncStorage.getItem('cnpjGeneratedWithPeriod');
			if (cnpjWithPeriod) {
				setCnpjWithPeriod(JSON.parse(cnpjWithPeriod));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t('Gerador de CNPJ')}</Text>
			<View style={stylesWithTheme.card}>
				<View style={stylesWithTheme.section}>
					<Text style={stylesWithTheme.paragraph}>{t('Gerar com pontuação ?')}</Text>
					<Checkbox
						style={stylesWithTheme.checkbox}
						value={cnpjWithPeriod}
						onValueChange={async (cleanAlwaysChange) => {
							setCnpjWithPeriod(cleanAlwaysChange.valueOf());
							await AsyncStorage.setItem(
								'cnpjGeneratedWithPeriod',
								JSON.stringify(cleanAlwaysChange.valueOf()),
							);
						}}
						color={cnpjWithPeriod ? '#5446bf' : undefined}
					/>
				</View>
				<Text style={stylesWithTheme.label}>{t('CNPJ Gerado:')}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={generatedCnpj}
					editable={false}
					placeholder={t('Clique no botão abaixo')}
					placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
				/>
				<Button title={t('Gerar CNPJ')} onPress={generateRandomCnpj} color="#007BFF" />
				<View style={stylesWithTheme.copyButtonContainer}>
					<TouchableOpacity onPress={copyToClipboard}>
						<FontAwesome name="copy" size={RFValue(32)} color="#007BFF" />
					</TouchableOpacity>
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: getThemeColor(theme, 'background'),
			alignItems: 'center',
			justifyContent: 'center',
		},
		title: {
			fontSize: RFValue(28), // Responsive font size
			fontWeight: 'bold',
			marginBottom: RFValue(20), // Responsive margin
			color: getThemeColor(theme, 'title'),
		},
		card: {
			width: '80%',
			backgroundColor: getThemeColor(theme, 'cardBackground'),
			borderRadius: RFValue(10), // Responsive border radius
			padding: RFValue(20), // Responsive padding
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2, // Responsive shadow offset
			},
			shadowOpacity: 0.2,
			shadowRadius: 2, // Responsive shadow radius
			elevation: 3, // Responsive elevation
		},
		label: {
			fontSize: RFValue(20), // Responsive font size
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, 'text'),
		},
		input: {
			height: RFValue(50), // Responsive height
			borderWidth: 1, // Responsive border width
			borderColor: getThemeColor(theme, 'border'),
			padding: RFValue(10), // Responsive padding
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, 'text'),
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: RFValue(16),
			backgroundColor: getThemeColor(theme, 'inputBackground'),
		},
		copyButtonContainer: {
			alignItems: 'center',
			marginTop: RFValue(20), // Responsive margin
		},
		section: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		paragraph: {
			fontSize: 15,
			color: getThemeColor(theme, 'text'),
		},
		checkbox: {
			margin: 8,
		},
	});
