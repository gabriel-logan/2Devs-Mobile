import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { isCreditCardValid, isEmpty, isNumber } from 'multiform-validator';

import * as Clipboard from 'expo-clipboard';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { RFValue } from '../../../components/Responsive';
import getThemeColor from '../../../configs/colors';
import { useTheme } from '../../../components/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CreditCardValidatorPage() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const [creditCardInput, setCreditCardInput] = useState('');
	const [creditCardIsValidResult, setCreditCardIsValidResult] = useState<boolean>();

	const stylesWithTheme = styles(theme, creditCardIsValidResult);

	const validateCreditCard = () => {
		// Remove todos os não dígitos do input
		const cleanedCreditCardInput = creditCardInput.replace(/\D/g, '');

		if (!isEmpty(cleanedCreditCardInput) && isNumber(cleanedCreditCardInput)) {
			// Valida o número do cartão de crédito
			const creditCardValidated = isCreditCardValid(cleanedCreditCardInput);

			if (creditCardValidated) {
				setCreditCardIsValidResult(true);
			} else {
				setCreditCardIsValidResult(false);
			}
		} else {
			setCreditCardIsValidResult(false);
		}
	};

	const copyToClipboard = async (textToCopy: string | null) => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getStringAsync();
		setCreditCardInput(text);
	};

	const cleanToClipboard = () => {
		setCreditCardInput('');
	};

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t('Validador de Cartão de crédito')}</Text>
			<View style={stylesWithTheme.card}>
				<Text style={stylesWithTheme.label}>{t('Digite ou cole um Cartão de crédito:')}</Text>
				<TextInput
					style={stylesWithTheme.input}
					onChangeText={(text) => setCreditCardInput(text)}
					value={creditCardInput}
					placeholder="5545 9874 2450 4172"
					placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
					keyboardType="numeric"
					maxLength={21}
				/>
				<Button title={t('Validar Cartão de crédito')} onPress={validateCreditCard} />
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity style={stylesWithTheme.buttonCopy} onPress={pasteToClipboard}>
						<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard(creditCardInput)}
					>
						<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity style={stylesWithTheme.buttonCopy} onPress={cleanToClipboard}>
						<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
				</View>
				{creditCardIsValidResult !== undefined && (
					<View style={stylesWithTheme.creditCardStatus}>
						<Text
							style={
								creditCardIsValidResult
									? stylesWithTheme.validCreditCardText
									: stylesWithTheme.invalidCreditCardText
							}
						>
							{creditCardIsValidResult
								? t('Cartão de crédito Válido')
								: t('Cartão de crédito Inválido')}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = (theme: 'dark' | 'light', creditCardIsValidResult?: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: getThemeColor(theme, 'background'),
			alignItems: 'center',
			justifyContent: 'center',
		},
		title: {
			fontSize: RFValue(22), // Responsive font size
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
			fontSize: RFValue(14), // Responsive font size
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
			fontSize: RFValue(14),
			backgroundColor: getThemeColor(theme, 'inputBackground'),
		},
		divButtonCopy: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginVertical: RFValue(15),
		},
		buttonCopy: {},
		creditCardStatus: {
			backgroundColor: creditCardIsValidResult ? '#4CAF50' : '#F44336',
			padding: RFValue(10),
			borderRadius: 5,
			alignItems: 'center',
			justifyContent: 'center',
		},
		validCreditCardText: {
			fontSize: RFValue(18),
			color: '#FFFFFF',
		},
		invalidCreditCardText: {
			fontSize: RFValue(18),
			color: '#FFFFFF',
		},
	});
