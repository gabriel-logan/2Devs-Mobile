import React, {useState} from "react";

import {Text, View, TextInput, Button, TouchableOpacity} from "react-native";

import {isCreditCardValid, isEmpty, isNumber} from "multiform-validator";

import Clipboard from "@react-native-clipboard/clipboard";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import {RFValue} from "../../../components/Responsive";

import getThemeColor from "../../../configs/colors";

import {useTheme} from "../../../components/ThemeContext";

import {useTranslation} from "react-i18next";

import styles from "./styles";

export default function CreditCardValidatorPage() {
	const {t} = useTranslation();

	const {theme} = useTheme();

	const [creditCardInput, setCreditCardInput] = useState("");
	const [creditCardIsValidResult, setCreditCardIsValidResult] = useState<boolean>();

	const stylesWithTheme = styles(theme, creditCardIsValidResult);

	const validateCreditCard = () => {
		// Remove todos os não dígitos do input
		const cleanedCreditCardInput = creditCardInput.replace(/\D/g, "");

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

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getString();
		setCreditCardInput(text);
	};

	const cleanToClipboard = () => {
		setCreditCardInput("");
	};

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t("Validador de Cartão de crédito")}</Text>
			<View style={stylesWithTheme.card}>
				<Text style={stylesWithTheme.label}>{t("Digite ou cole um Cartão de crédito:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					onChangeText={text => setCreditCardInput(text)}
					value={creditCardInput}
					placeholder="5545 9874 2450 4172"
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
					keyboardType="numeric"
					maxLength={21}
				/>
				<Button title={t("Validar Cartão de crédito")} onPress={validateCreditCard} />
				<View style={stylesWithTheme.divButtonCopy}>
					<TouchableOpacity style={stylesWithTheme.buttonCopy} onPress={pasteToClipboard}>
						<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
					</TouchableOpacity>
					<TouchableOpacity
						style={stylesWithTheme.buttonCopy}
						onPress={() => copyToClipboard(creditCardInput)}>
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
							}>
							{creditCardIsValidResult
								? t("Cartão de crédito Válido")
								: t("Cartão de crédito Inválido")}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}
