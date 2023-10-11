import { useState, useEffect } from 'react';

import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';

import base64 from 'react-native-base64';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../../../components/ThemeContext';
import getThemeColor from '../../../configs/colors';
import { RFValue } from '../../../components/Responsive';

import Checkbox from 'expo-checkbox';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';

import { isBase64 } from 'multiform-validator';

type WhichOne = 'text' | 'base64';

export default function Base64Page() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const [inputText, setInputText] = useState('');
	const [base64Text, setBase64Text] = useState('');
	const [cleanAlways, setCleanAlways] = useState(false);
	const [considerSpace, setConsiderSpace] = useState(false);

	const stylesWithTheme = styles(theme);

	const encodeToBase64 = () => {
		let encoded: string;
		if (considerSpace) {
			encoded = base64.encode(`${inputText}\n`);
		} else {
			encoded = base64.encode(inputText);
		}
		setBase64Text(encoded);
		if (cleanAlways) {
			setInputText('');
		}
	};

	const decodeFromBase64 = () => {
		const base64TextTrim = base64Text.trim();
		if (base64TextTrim.length > 0) {
			// Check if the trimmed string is not empty
			if (isBase64(base64TextTrim)) {
				const decoded = base64.decode(base64TextTrim);
				setInputText(decoded);
				if (cleanAlways) {
					setBase64Text('');
				}
			} else {
				Alert.alert(t('Erro'), t('O texo não é um codigo base64 valido'));
			}
		} else {
			Alert.alert(t('Erro'), t('O valor de entrada não deve ser uma string vazia'));
		}
	};

	const copyToClipboard = async (textToCopy: string | null) => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
		}
	};

	const cutToClipboard = async (textToCopy: string | null, whichOne: WhichOne) => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
			cleanToClipboard(whichOne);
		}
	};

	const pasteToClipboard = async (whichOne: WhichOne) => {
		const text = await Clipboard.getStringAsync();
		if (whichOne === 'text') {
			setInputText(text);
		} else {
			setBase64Text(text);
		}
	};

	const cleanToClipboard = (whichOne: WhichOne) => {
		if (whichOne === 'text') {
			setInputText('');
		} else {
			setBase64Text('');
		}
	};

	useEffect(() => {
		(async () => {
			const base64AlwaysClean = await AsyncStorage.getItem('base64AlwaysCleanAfterGenerate');
			if (base64AlwaysClean) {
				setCleanAlways(JSON.parse(base64AlwaysClean));
			}
			const considerSpace = await AsyncStorage.getItem('considerSpaceAfterGenerate');
			if (considerSpace) {
				setConsiderSpace(JSON.parse(considerSpace));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.section}>
				<Text style={stylesWithTheme.paragraph}>{t('Apagar apos gerar ?')}</Text>
				<Checkbox
					style={stylesWithTheme.checkbox}
					value={cleanAlways}
					onValueChange={async (cleanAlwaysChange) => {
						setCleanAlways(cleanAlwaysChange.valueOf());
						await AsyncStorage.setItem(
							'base64AlwaysCleanAfterGenerate',
							JSON.stringify(cleanAlwaysChange.valueOf()),
						);
					}}
					color={cleanAlways ? '#5446bf' : undefined}
				/>
			</View>
			<View style={[stylesWithTheme.section, { marginBottom: 15 }]}>
				<Text style={stylesWithTheme.paragraph}>{t('Considerar espaço ?')}</Text>
				<Checkbox
					style={stylesWithTheme.checkbox}
					value={considerSpace}
					onValueChange={async (considerSpace) => {
						setConsiderSpace(considerSpace.valueOf());
						await AsyncStorage.setItem(
							'considerSpaceAfterGenerate',
							JSON.stringify(considerSpace.valueOf()),
						);
					}}
					color={considerSpace ? '#5446bf' : undefined}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t('Cole ou digite o texto aqui')}
						placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
						onChangeText={(text) => setInputText(text)}
						value={inputText}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard('text')}
						>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(inputText)}
						>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(inputText, 'text')}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard('text')}
						>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={encodeToBase64}>
					<Text style={stylesWithTheme.buttonText}>{t('Codificar para Base64')}</Text>
				</TouchableOpacity>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t('Cole ou digite o código Base64 aqui')}
						placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
						onChangeText={(text) => setBase64Text(text)}
						value={base64Text}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard('base64')}
						>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(base64Text)}
						>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(base64Text, 'base64')}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard('base64')}
						>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={decodeFromBase64}>
					<Text style={stylesWithTheme.buttonText}>{t('Decodificar para Texto')}</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: getThemeColor(theme, 'background'),
		},
		inputContainer: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 10,
		},
		input: {
			flex: 1,
			height: 200,
			borderColor: 'gray',
			borderWidth: 0.5,
			borderRadius: 4,
			textAlignVertical: 'top',
			padding: 10,
			color: getThemeColor(theme, 'text'),
			backgroundColor: getThemeColor(theme, 'cardBackground'),
		},
		button: {
			backgroundColor: '#007AFF',
			padding: 10,
			borderRadius: 5,
			margin: 10,
		},
		buttonText: {
			color: 'white',
			textAlign: 'center',
		},
		divButtonCopy: {
			position: 'absolute',
			right: 15,
		},
		buttonCopy: {
			marginVertical: 10,
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
