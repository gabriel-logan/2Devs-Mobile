import {useState} from 'react';

import {View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Clipboard from '@react-native-clipboard/clipboard';

import {useTheme} from '../../../../components/ThemeContext';

import getThemeColor from '../../../../configs/colors';

import {RFValue} from '../../../../components/Responsive';

import {useTranslation} from 'react-i18next';

import {Theme} from '../../../../types/themeProps';

type WhichOne = 'text' | 'hex';

export default function AsciiAndHexPage() {
	const {t} = useTranslation();

	const {theme} = useTheme();

	const [asciiText, setAsciiText] = useState('');
	const [hexText, setHexText] = useState('');

	const stylesWithTheme = styles(theme);

	const encodeToHex = () => {
		if (asciiText) {
			let hex = '';
			for (let i = 0; i < asciiText.length; i++) {
				hex += ('00' + asciiText.charCodeAt(i).toString(16)).slice(-2);
				if (i < asciiText.length - 1) {
					hex += ' '; // Adiciona um espaço entre os pares de dígitos hexadecimais
				}
			}
			setHexText(hex);
		}
	};

	const decodeFromHex = () => {
		if (hexText) {
			let ascii = '';
			let hexTextClean = hexText.trim().replace(/[^0-9a-fA-F:]/g, ''); // Remove caracteres não hexadecimais e colons

			// Remove colons da string
			hexTextClean = hexTextClean.replace(/:/g, '');
			hexTextClean = hexTextClean.replace(/,/g, '');

			for (let i = 0; i < hexTextClean.length; i += 2) {
				ascii += String.fromCharCode(parseInt(hexTextClean.substr(i, 2), 16));
			}
			setAsciiText(ascii);
		}
	};

	const copyToClipboard = (textToCopy: string | null) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
		}
	};

	const cutToClipboard = (textToCopy: string | null, whichOne: WhichOne) => {
		if (textToCopy) {
			Clipboard.setString(textToCopy);
			cleanToClipboard(whichOne);
		}
	};

	const pasteToClipboard = async (whichOne: WhichOne) => {
		const text = await Clipboard.getString();
		if (whichOne === 'text') {
			setAsciiText(text);
		} else {
			setHexText(text);
		}
	};

	const cleanToClipboard = (whichOne: WhichOne) => {
		if (whichOne === 'text') {
			setAsciiText('');
		} else {
			setHexText('');
		}
	};

	return (
		<View style={stylesWithTheme.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t('Cole ou digite o texto aqui')}
						placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
						onChangeText={text => setAsciiText(text)}
						value={asciiText}
						multiline
						maxLength={15000}
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard('text')}>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(asciiText)}>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(asciiText, 'text')}>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard('text')}>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={encodeToHex}>
					<Text style={stylesWithTheme.buttonText}>{t('Codificar para Hex')}</Text>
				</TouchableOpacity>
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t('Cole ou digite o código Hex aqui')}
						placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
						onChangeText={text => setHexText(text)}
						value={hexText}
						maxLength={15000}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard('hex')}>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(hexText)}>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(hexText, 'hex')}>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard('hex')}>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={decodeFromHex}>
					<Text style={stylesWithTheme.buttonText}>{t('Decodificar para Texto')}</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, 'background'),
		},
		inputContainer: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: RFValue(10),
		},
		input: {
			flex: 1,
			height: RFValue(200),
			borderColor: 'gray',
			borderWidth: 0.5,
			borderRadius: 4,
			textAlignVertical: 'top',
			padding: RFValue(10),
			color: getThemeColor(theme, 'text'),
			backgroundColor: getThemeColor(theme, 'cardBackground'),
		},
		button: {
			backgroundColor: '#007AFF',
			padding: RFValue(10),
			borderRadius: 5,
			margin: RFValue(10),
		},
		buttonText: {
			color: 'white',
			textAlign: 'center',
		},
		divButtonCopy: {
			position: 'absolute',
			right: RFValue(15),
		},
		buttonCopy: {
			marginVertical: RFValue(10),
		},
	});
