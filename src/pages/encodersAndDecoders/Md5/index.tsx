import { useState, useEffect } from 'react';

import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Clipboard from 'expo-clipboard';
import Checkbox from 'expo-checkbox';

import { useTheme } from '../../../components/ThemeContext';

import getThemeColor from '../../../configs/colors';

import { RFValue } from '../../../components/Responsive';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';

import { MD5 } from 'crypto-js';

import styles from './styles';

export default function Md5Page() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const [inputText, setInputText] = useState('');
	const [cleanAlways, setCleanAlways] = useState(false);
	const [considerSpace, setConsiderSpace] = useState(false);

	const stylesWithTheme = styles(theme);

	const encodeToMd5 = (text: string) => {
		const valor = MD5(text).toString();
		setInputText(valor);
	};

	const copyToClipboard = async (textToCopy: string | null) => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
		}
	};

	const cutToClipboard = async (textToCopy: string | null) => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
		}
		setInputText('');
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getStringAsync();
		setInputText(text);
	};

	const cleanToClipboard = () => setInputText('');

	useEffect(() => {
		(async () => {
			const md5AlwaysClean = await AsyncStorage.getItem('md5AlwaysCleanAfterGenerate');
			if (md5AlwaysClean) {
				setCleanAlways(JSON.parse(md5AlwaysClean));
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
							'md5AlwaysCleanAfterGenerate',
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
						<TouchableOpacity style={stylesWithTheme.buttonCopy} onPress={() => pasteToClipboard()}>
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
							onPress={() => cutToClipboard(inputText)}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity style={stylesWithTheme.buttonCopy} onPress={() => cleanToClipboard()}>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={() => encodeToMd5(inputText)}>
					<Text style={stylesWithTheme.buttonText}>{t('Codificar para Md5')}</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

{
	/**
				<View style={stylesWithTheme.inputContainer}>
					<TextInput
						style={stylesWithTheme.input}
						placeholder={t('Cole ou digite o código Md5 aqui')}
						placeholderTextColor={getThemeColor(theme, 'placeHolderColor')}
						onChangeText={(text) => setMd5Text(text)}
						value={md5Text}
						multiline
					/>
					<View style={stylesWithTheme.divButtonCopy}>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => pasteToClipboard('md5')}
						>
							<FontAwesome name="paste" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => copyToClipboard(md5Text)}
						>
							<FontAwesome name="copy" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cutToClipboard(md5Text, 'md5')}
						>
							<FontAwesome name="cut" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
						<TouchableOpacity
							style={stylesWithTheme.buttonCopy}
							onPress={() => cleanToClipboard('md5')}
						>
							<FontAwesome name="trash-o" size={RFValue(26)} color="#007AFF" />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={stylesWithTheme.button} onPress={decodeFromMd5}>
					<Text style={stylesWithTheme.buttonText}>{t('Decodificar para Texto')}</Text>
				</TouchableOpacity> */
}
