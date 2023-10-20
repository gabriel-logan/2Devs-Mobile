import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import getThemeColor from '../../../configs/colors';
import {useTheme} from '../../../components/ThemeContext';
import {RFValue} from '../../../components/Responsive';

export default function MmcMdcPage() {
	const {t} = useTranslation();
	const {theme} = useTheme();
	const stylesWithTheme = styles(theme);

	const [input, setInput] = useState('');
	const [arrayOfValues, setArrayOfValues] = useState<number[]>([]);
	const [mmcResult, setMmcResult] = useState<number | null>(null);
	const [mdcResult, setMdcResult] = useState<number | null>(null);

	const handleCalculate = () => {
		if (input.trim()) {
			const values = input.split(',').map(value => parseInt(value.trim(), 10));
			if (values.some(isNaN)) {
				Alert.alert(t('Erro'), t('Digite valores numéricos separados por vírgulas'));
			} else {
				const calculatedMmc = calculateMmc(values);
				const calculatedMdc = calculateMdc(values);
				setMmcResult(calculatedMmc);
				setMdcResult(calculatedMdc);
				setArrayOfValues(values);
			}
		} else {
			Alert.alert(t('Erro'), t('Digite valores válidos, separados por vírgulas'));
		}
	};

	// Função para calcular o MMC de uma array de números
	const calculateMmc = (numbers: Array<number>) => {
		if (numbers.length === 0) {
			return null;
		}
		let result = numbers[0];
		for (let i = 1; i < numbers.length; i++) {
			result = (result * numbers[i]) / calculateMdcTwoNumbers(result, numbers[i]);
		}
		return result;
	};

	// Função para calcular o MDC de dois números
	const calculateMdcTwoNumbers = (a: number, b: number) => {
		while (b !== 0) {
			const temp = b;
			b = a % b;
			a = temp;
		}
		return a;
	};

	// Função para calcular o MDC de uma array de números
	const calculateMdc = (numbers: Array<number>) => {
		if (numbers.length === 0) {
			return null;
		}
		let result = numbers[0];
		for (let i = 1; i < numbers.length; i++) {
			result = calculateMdcTwoNumbers(result, numbers[i]);
		}
		return result;
	};

	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.inputContainer}>
				<Text style={stylesWithTheme.label}>{t('Digite os números a calcular')}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={input}
					onChangeText={value => setInput(value)}
					keyboardType="phone-pad"
					placeholder={t('Ex. 4, 8, 12')}
					placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
				/>
			</View>
			<TouchableOpacity style={stylesWithTheme.button} onPress={handleCalculate}>
				<Text style={stylesWithTheme.buttonText}>{t('Calcular')}</Text>
			</TouchableOpacity>
			<View style={stylesWithTheme.resultContainer}>
				<View style={stylesWithTheme.resultRow}>
					<Text style={stylesWithTheme.resultText}>
						{t('Mmc entre')} {arrayOfValues.join(', ')} {t('=')} {mmcResult}
					</Text>
				</View>
				<View style={stylesWithTheme.resultRow}>
					<Text style={stylesWithTheme.resultText}>
						{t('Mdc entre')} {arrayOfValues.join(', ')} {t('=')} {mdcResult}
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
		inputContainer: {
			marginBottom: RFValue(16),
		},
		label: {
			fontSize: RFValue(16),
			marginBottom: 8,
			color: getThemeColor(theme, 'text'),
		},
		input: {
			height: RFValue(50),
			borderColor: getThemeColor(theme, 'border'),
			borderWidth: 1,
			paddingLeft: 10,
			color: getThemeColor(theme, 'text'),
			borderRadius: 4,
		},
		button: {
			backgroundColor: getThemeColor(theme, 'buttonBackground'),
			alignItems: 'center',
			justifyContent: 'center',
			height: RFValue(50),
			borderRadius: 4,
		},
		buttonText: {
			color: 'white',
			fontSize: RFValue(16),
		},
		resultContainer: {
			marginTop: RFValue(16),
		},
		resultRow: {
			marginVertical: 8,
		},
		resultText: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, 'text'),
		},
	});
