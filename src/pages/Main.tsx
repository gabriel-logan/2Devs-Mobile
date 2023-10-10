import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, useColorScheme } from 'react-native';

import { Image } from 'expo-image';

import { useTheme } from '../components/ThemeContext';

import getThemeColor from '../configs/colors';
import { RFValue, width } from '../components/Responsive';

export default function Main() {
	const { theme, toggleTheme } = useTheme();
	const systemTheme = useColorScheme() as typeof theme;

	// Estado para rastrear o tema selecionado
	const [selectedTheme, setSelectedTheme] = useState<typeof theme | 'system'>(theme);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			padding: 20,
			backgroundColor: getThemeColor(theme, 'background'), // Usando a paleta de cores para o fundo da página
		},
		logo: {
			width: RFValue(256),
			height: RFValue(128),
			marginBottom: 30,
		},
		headerText: {
			fontSize: RFValue(24),
			fontWeight: 'bold',
			marginBottom: 20,
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
		button: {
			backgroundColor: getThemeColor(theme, 'primary'), // Usando a paleta de cores para o botão primário
			paddingVertical: 15,
			paddingHorizontal: 40,
			borderRadius: 25,
			marginBottom: 20,
		},
		buttonText: {
			color: '#fff',
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		themeContainer: {
			marginTop: 40,
			alignItems: 'center',
			width: width(100),
		},
		themeTitle: {
			fontSize: 20,
			fontWeight: 'bold',
			marginBottom: 15,
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
		themeOption: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '70%',
			marginBottom: 15,
			paddingHorizontal: 20,
		},
		themeText: {
			fontSize: 18,
			color: getThemeColor(theme, 'text'), // Usando a paleta de cores para o texto
		},
		switch: {
			transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
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
	};

	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	return (
		<View style={styles.container}>
			<Image
				source={
					theme === 'light'
						? require('../../assets/marca.svg')
						: require('../../assets/marcalight.svg')
				}
				placeholder={blurhash}
				contentFit="cover"
				transition={1000}
				style={styles.logo}
			/>
			<Text style={styles.headerText}>Bem-vindo ao 2Devs</Text>

			<TouchableOpacity style={styles.button} onPress={() => alert('Classificar na Loja')}>
				<Text style={styles.buttonText}>Avalie o aplicativo</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => alert('Alterar Idioma abre um modal')}>
				<Text style={styles.buttonText}>Alterar idioma</Text>
			</TouchableOpacity>

			<View style={styles.themeContainer}>
				<Text style={styles.themeTitle}>Escolha o Tema:</Text>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>Tema claro</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						style={styles.switch}
						value={selectedTheme === 'light'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('light')}
					/>
				</View>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>Tema escuro</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						style={styles.switch}
						value={selectedTheme === 'dark'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('dark')}
					/>
				</View>
				<View style={styles.themeOption}>
					<Text style={styles.themeText}>Tema do sistema</Text>
					<Switch
						thumbColor={theme === 'dark' ? '#4b95f5' : '#f4f3f4'}
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						style={styles.switch}
						value={selectedTheme === 'system'} // Define o valor do switch com base no tema selecionado
						onValueChange={() => handleThemeChange('system')}
					/>
				</View>
			</View>
		</View>
	);
}
