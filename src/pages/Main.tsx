import { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, Switch, useColorScheme } from 'react-native';

import { Image } from 'expo-image';
import * as Linking from 'expo-linking';

import { useTheme } from '../components/ThemeContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';

import ChangeLangModal from './ChangeLandModal';

import { StatusBar } from 'expo-status-bar';
import blurhash from '../components/blurhash';

import styles from './styles';

export default function Main() {
	const { t } = useTranslation();

	const { theme, toggleTheme } = useTheme();

	const stylesWithTheme = styles(theme);

	const systemTheme = useColorScheme() as typeof theme;

	// Estado para rastrear o tema selecionado
	const [selectedTheme, setSelectedTheme] = useState<typeof theme | 'system'>(theme);

	const [modalChangeLang, setModalChangeLang] = useState(false);

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

	useEffect(() => {
		(async () => {
			const getThemeCoice = (await AsyncStorage.getItem('themeSelected')) as typeof theme | null;
			if (getThemeCoice) {
				setSelectedTheme(getThemeCoice);
			}
		})();
	}, []);
	return (
		<View style={stylesWithTheme.container}>
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
				style={stylesWithTheme.logo}
			/>
			<Text style={stylesWithTheme.headerText}>{t('Bem-vindo ao 2Devs')}</Text>

			<TouchableOpacity
				style={stylesWithTheme.button}
				onPress={() =>
					Linking.openURL('https://play.google.com/store/apps/details?id=com.gabriellogan.toDevs')
				}
			>
				<Text style={stylesWithTheme.buttonText}>{t('Avalie o aplicativo')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={stylesWithTheme.button} onPress={() => setModalChangeLang(true)}>
				<Text style={stylesWithTheme.buttonText}>{t('Alterar idioma')}</Text>
			</TouchableOpacity>

			<ChangeLangModal modalChangeLang={modalChangeLang} setModalChangeLang={setModalChangeLang} />

			<View style={stylesWithTheme.themeContainer}>
				<Text style={stylesWithTheme.themeTitle}>{t('Escolha o Tema:')}</Text>
				<View style={stylesWithTheme.themeOption}>
					<Text style={stylesWithTheme.themeText}>{t('Tema claro')}</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						value={selectedTheme === 'light'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('light')}
					/>
				</View>
				<View style={stylesWithTheme.themeOption}>
					<Text style={stylesWithTheme.themeText}>{t('Tema escuro')}</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						value={selectedTheme === 'dark'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('dark')}
					/>
				</View>
				<View style={stylesWithTheme.themeOption}>
					<Text style={stylesWithTheme.themeText}>{t('Tema do sistema')}</Text>
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
