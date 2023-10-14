import { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Switch, useColorScheme } from 'react-native';

import { Image } from 'expo-image';
import * as Linking from 'expo-linking';

import { useTheme } from '../components/ThemeContext';

import getThemeColor from '../configs/colors';

import { RFValue, width } from '../components/Responsive';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';

import ChangeLangModal from './ChangeLandModal';

import { StatusBar } from 'expo-status-bar';

export default function Main() {
	const { t } = useTranslation();
	const { theme, toggleTheme } = useTheme();
	const systemTheme = useColorScheme() as typeof theme;

	// Estado para rastrear o tema selecionado
	const [selectedTheme, setSelectedTheme] = useState<typeof theme | 'system'>(theme);

	const [modalChangeLang, setModalChangeLang] = useState(false);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, 'background'), // Usando a paleta de cores para o fundo da página
		},
		logo: {
			width: RFValue(256),
			height: RFValue(128),
			marginBottom: RFValue(30),
		},
		headerText: {
			fontSize: RFValue(24),
			fontWeight: 'bold',
			marginBottom: RFValue(20),
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
		button: {
			backgroundColor: getThemeColor(theme, 'primary'), // Usando a paleta de cores para o botão primário
			paddingVertical: RFValue(15),
			paddingHorizontal: RFValue(40),
			borderRadius: RFValue(25),
			marginBottom: RFValue(20),
		},
		buttonText: {
			color: '#fff',
			fontSize: RFValue(16),
			fontWeight: 'bold',
			textAlign: 'center',
		},
		themeContainer: {
			marginTop: RFValue(40),
			alignItems: 'center',
			width: width(100),
		},
		themeTitle: {
			fontSize: RFValue(20),
			fontWeight: 'bold',
			marginBottom: RFValue(15),
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
		themeOption: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '70%',
			marginBottom: RFValue(15),
			paddingHorizontal: RFValue(20),
		},
		themeText: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
	});

	const handleThemeChange = async (selectedTheme: typeof theme | 'system') => {
		if (selectedTheme === 'system') {
			if (systemTheme) {
				toggleTheme(systemTheme);
			} else {
				toggleTheme('light');
			}
			// Define o tema com base no sistema (usando useColorScheme)
		} else {
			toggleTheme(selectedTheme);
		}

		setSelectedTheme(selectedTheme);
		await AsyncStorage.setItem('themeSelected', selectedTheme);
	};

	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	useEffect(() => {
		(async () => {
			const getThemeCoice = (await AsyncStorage.getItem('themeSelected')) as typeof theme | null;
			if (getThemeCoice) {
				setSelectedTheme(getThemeCoice);
			}
		})();
	}, []);
	return (
		<View style={styles.container}>
			<StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
			<Image
				source={
					theme === 'light'
						? require('../../assets/marca.svg')
						: require('../../assets/marcalight.svg')
				}
				placeholder={blurhash}
				contentFit="cover"
				transition={350}
				style={styles.logo}
			/>
			<Text style={styles.headerText}>{t('Bem-vindo ao 2Devs')}</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					Linking.openURL('https://play.google.com/store/apps/details?id=com.gabriellogan.toDevs')
				}
			>
				<Text style={styles.buttonText}>{t('Avalie o aplicativo')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => setModalChangeLang(true)}>
				<Text style={styles.buttonText}>{t('Alterar idioma')}</Text>
			</TouchableOpacity>

			<ChangeLangModal modalChangeLang={modalChangeLang} setModalChangeLang={setModalChangeLang} />

			<View style={styles.themeContainer}>
				<Text style={styles.themeTitle}>{t('Escolha o Tema:')}</Text>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>{t('Tema claro')}</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						value={selectedTheme === 'light'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('light')}
					/>
				</View>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>{t('Tema escuro')}</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						value={selectedTheme === 'dark'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('dark')}
					/>
				</View>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>{t('Tema do sistema')}</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						value={selectedTheme === 'system'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('system')}
					/>
				</View>
			</View>
		</View>
	);
}
