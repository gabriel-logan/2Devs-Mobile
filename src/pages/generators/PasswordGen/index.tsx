import { useState, useEffect, useCallback } from 'react';

import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import { ProgressBar } from 'react-native-paper';

import { useTranslation } from 'react-i18next';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import * as Clipboard from 'expo-clipboard';

import { useTheme } from '../../../components/ThemeContext';

import getThemeColor from '../../../configs/colors';

import { RFValue } from '../../../components/Responsive';
import { locale } from 'expo-localization';

export default function PasswordGenerator() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [inputEl, setInputEl] = useState('');

	const [upperCaseCheckEl, setUpperCaseCheckEl] = useState(false);
	const [numberCheckEl, setNumberCheckEl] = useState(false);
	const [symbolCheckEl, setSymbolCheckEl] = useState(false);

	// const securityIndicatorBarEl = document.querySelector('#security-indicator-bar');

	const [passwordLength, setPasswordLength] = useState(16);

	const generatePassword = useCallback(() => {
		let chars = 'abcdefghjkmnpqrstuvwxyz';

		const upperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
		const numberChars = '123456789';
		const symbolChars = '?!@&*()[]';

		if (upperCaseCheckEl) {
			chars += upperCaseChars;
		}

		if (numberCheckEl) {
			chars += numberChars;
		}

		if (symbolCheckEl) {
			chars += symbolChars;
		}

		let password = '';

		for (let i = 0; i < passwordLength; i++) {
			const randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}

		setInputEl(password);
	}, [numberCheckEl, passwordLength, symbolCheckEl, upperCaseCheckEl]);

	const copyToClipboard = async () => {
		if (inputEl) {
			await Clipboard.setStringAsync(inputEl);
		}
	};

	function getStrength() {
		const password = inputEl;
		let strength = 0;

		if (password.length >= 8) {
			strength += 1;
		}

		if (password.length >= 16) {
			strength += 1;
		}

		if (password.length >= 32) {
			strength += 1;
		}

		if (password.match(/[a-z]+/)) {
			strength += 1;
		}

		if (password.match(/[A-Z]+/)) {
			strength += 1;
		}

		if (password.match(/[0-9]+/)) {
			strength += 1;
		}

		if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) {
			strength += 1;
		}

		return strength;
	}

	function getPasswordStrengthColor() {
		const strength = getStrength();

		switch (strength) {
			case 0:
				return '#ff0000'; // red
			case 1:
				return '#ff6600'; // orange
			case 2:
				return '#ffcc00'; // yellow
			case 3:
				return '#70c000'; // light green
			case 4:
				return '#33cc33'; // green
			case 5:
				return '#00ff80'; // bluegreen
			case 6:
				return '#00eeff'; // bluemeio green
			case 7:
				return '#007bff'; // blue
			default:
				return '#ff0000'; // red
		}
	}

	// Função para obter a descrição da força da senha
	function getPasswordStrengthDescription() {
		const strength = getStrength(); // Certifique-se de que você tenha uma função getStrength() que retorne a força da senha.

		switch (strength) {
			case 0:
				return 'Péssima';
			case 1:
				return 'Fraca';
			case 2:
				return 'Moderada';
			case 3:
				return 'Boa';
			case 4:
				return 'Ótima';
			case 5:
				return 'Excelente';
			case 6:
				return 'Excepcional';
			case 7:
				return 'Estrondosa';
			default:
				return 'Desconhecida';
		}
	}

	function estimatePasswordCrackTime(): { time: string; unit: string } {
		const charsetSize = 26 + 26 + 10 + 10; // Letras minúsculas, letras maiúsculas, números, caracteres especiais
		const passwordLength = inputEl.length;
		const attemptsPerSecond = 4000000000; // 4 GHz (ajuste conforme necessário)

		// Suposição de complexidade da senha (número de combinações possíveis)
		const complexity = Math.pow(charsetSize, passwordLength);

		// Tempo estimado em segundos
		let crackTimeSeconds = complexity / attemptsPerSecond;

		// Converter o tempo estimado para unidades mais humanas
		const units: string[] = [
			'segundos',
			'minutos',
			'horas',
			'dias',
			'anos',
			'décadas',
			'centenas de anos',
		];
		let index = 0;
		while (crackTimeSeconds >= 60 && index < units.length - 1) {
			crackTimeSeconds /= 60;
			index++;
		}

		return {
			time: crackTimeSeconds.toFixed(2),
			unit: units[index],
		};
	}

	useEffect(() => {
		generatePassword();
	}, [generatePassword]);
	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.section}>
				<Text style={stylesWithTheme.title}>{t('Gerador de senha')}</Text>
				<Text style={stylesWithTheme.subtitle}>
					{t('Utilize o nosso gerador para criar uma senha forte e segura.')}
				</Text>
			</View>

			<View style={stylesWithTheme.section}>
				<View style={stylesWithTheme.passwordContainer}>
					<View style={stylesWithTheme.passwordInputContainer}>
						<TextInput value={inputEl} editable={false} style={stylesWithTheme.passwordInput} />
					</View>
					<View style={stylesWithTheme.passwordButtonsContainer}>
						<TouchableOpacity onPress={generatePassword}>
							<Ionicons name="reload" style={stylesWithTheme.passwordButton} />
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<ProgressBar progress={getStrength() / 5} color={getPasswordStrengthColor()} />
				</View>
			</View>

			<View style={stylesWithTheme.section}>
				<Text style={stylesWithTheme.title}>{t('Personalizar')}</Text>
				<View style={stylesWithTheme.customizationContainer}>
					<View style={stylesWithTheme.customizationOption}>
						<Text style={stylesWithTheme.customizationOptionText}>
							{t('Tamanho: ')}{' '}
							<Text style={stylesWithTheme.customizationOptionValue}>{passwordLength}</Text>
						</Text>
						<Slider
							value={passwordLength}
							onValueChange={(value) => {
								setPasswordLength(Math.floor(value));
								generatePassword();
							}}
							minimumValue={0}
							maximumValue={64}
							thumbTintColor="#b985e9"
							minimumTrackTintColor="#c9a5ec"
						/>
					</View>
					<View style={stylesWithTheme.customizationOption}>
						<View style={stylesWithTheme.customizationCheckbox}>
							<Text style={stylesWithTheme.customizationCheckboxText}>{t('Maiúsculas')}</Text>
							<Checkbox
								value={upperCaseCheckEl}
								onValueChange={(value) => setUpperCaseCheckEl(value)}
								color={upperCaseCheckEl ? '#b985e9' : undefined}
							/>
						</View>
						<View style={stylesWithTheme.customizationCheckbox}>
							<Text style={stylesWithTheme.customizationCheckboxText}>{t('Números')}</Text>
							<Checkbox
								value={numberCheckEl}
								onValueChange={(value) => setNumberCheckEl(value)}
								color={numberCheckEl ? '#b985e9' : undefined}
							/>
						</View>
						<View style={stylesWithTheme.customizationCheckbox}>
							<Text style={stylesWithTheme.customizationCheckboxText}>
								{t('Caracteres especiais')}
							</Text>
							<Checkbox
								value={symbolCheckEl}
								onValueChange={(value) => setSymbolCheckEl(value)}
								color={symbolCheckEl ? '#b985e9' : undefined}
							/>
						</View>
					</View>
				</View>
			</View>

			<View style={stylesWithTheme.section}>
				<TouchableOpacity onPress={copyToClipboard} style={stylesWithTheme.copyButton}>
					<Text style={stylesWithTheme.copyButtonText}>{t('Copiar senha')}</Text>
				</TouchableOpacity>
			</View>
			<View>
				<View style={{ backgroundColor: getPasswordStrengthColor(), padding: 10 }}>
					<Text style={stylesWithTheme.infoText}>
						{t('Força da Senha')} {t(getPasswordStrengthDescription())}
					</Text>
				</View>
				<View style={{ backgroundColor: getPasswordStrengthColor(), padding: 10, marginTop: 15 }}>
					<Text style={stylesWithTheme.infoText}>
						{t('Tempo estimado para quebrar a senha')}{' '}
						{Number(estimatePasswordCrackTime().time).toLocaleString(locale, {
							maximumFractionDigits: 2,
						})}{' '}
						{t(estimatePasswordCrackTime().unit)}
					</Text>
				</View>
				<View style={{ marginTop: RFValue(15) }}>
					<Text style={stylesWithTheme.infoTextCalc}>
						{t('Os cálculos são baseados em um processador de 4 GHz')}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(16),
			backgroundColor: getThemeColor(theme, 'background'),
		},
		section: {
			marginBottom: RFValue(16),
		},
		title: {
			fontSize: RFValue(24),
			fontWeight: 'bold',
			marginBottom: RFValue(8),
			color: getThemeColor(theme, 'title'),
		},
		subtitle: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, 'secondaryText'),
		},
		passwordContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: RFValue(8),
		},
		passwordInputContainer: {
			flex: 1,
			marginRight: RFValue(8),
		},
		passwordInput: {
			borderWidth: 1,
			borderColor: getThemeColor(theme, 'border'),
			borderRadius: 4,
			padding: RFValue(8),
			fontSize: RFValue(16),
			backgroundColor: getThemeColor(theme, 'inputBackground'),
			color: getThemeColor(theme, 'placeHolderColor'),
		},
		passwordButtonsContainer: {
			flexDirection: 'row',
		},
		passwordButton: {
			fontSize: RFValue(32),
			margin: RFValue(8),
			color: getThemeColor(theme, 'text'),
		},
		customizationContainer: {
			marginTop: RFValue(8),
		},
		customizationOption: {
			marginBottom: RFValue(8),
		},
		customizationOptionText: {
			fontSize: RFValue(16),
			marginBottom: RFValue(8),
			color: getThemeColor(theme, 'text'),
		},
		customizationOptionValue: {
			fontWeight: 'bold',
		},
		customizationCheckbox: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 4,
		},
		customizationCheckboxText: {
			marginRight: RFValue(8),
			color: getThemeColor(theme, 'text'),
		},
		copyButton: {
			backgroundColor: '#b985e9',
			padding: RFValue(14),
			borderRadius: 4,
			alignItems: 'center',
		},
		copyButtonText: {
			color: '#fff',
			fontWeight: 'bold',
			fontSize: RFValue(14),
		},
		infoText: {
			color: 'white',
			fontSize: RFValue(15),
			textAlign: 'center',
			textShadowColor: 'rgba(0, 0, 0, 0.7)', // Cor da sombra
			textShadowOffset: { width: 0.5, height: 0.5 }, // Deslocamento da sombra
			textShadowRadius: 2, // Raio da sombra
			fontWeight: 'bold',
		},
		infoTextCalc: {
			color: getThemeColor(theme, 'text'),
			fontSize: RFValue(15),
		},
	});
