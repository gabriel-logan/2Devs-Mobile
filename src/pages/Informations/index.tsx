import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useTheme } from '../../components/ThemeContext';
import getThemeColor from '../../configs/colors';

import * as Linking from 'expo-linking';

export default function GeneralInfoPage() {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 15,
			backgroundColor: getThemeColor(theme, 'cardBackground'),
		},
		section: {
			marginBottom: 20,
			backgroundColor: getThemeColor(theme, 'background'),
			padding: 15,
			borderRadius: 10,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
		},
		sectionTitle: {
			fontSize: 24,
			fontWeight: 'bold',
			color: getThemeColor(theme, 'title'),
		},
		sectionText: {
			fontSize: 16,
			color: getThemeColor(theme, 'text'),
		},
		githubButton: {
			backgroundColor: getThemeColor(theme, 'buttonBlack'),
			padding: 10,
			borderRadius: 5,
			marginTop: 10,
		},
		githubButtonText: {
			color: getThemeColor(theme, 'textInverted'),
			textAlign: 'center',
		},
		linkButton: {
			backgroundColor: '#3887db',
			padding: 10,
			borderRadius: 5,
			marginTop: 10,
		},
		buttonText: {
			color: 'white',
			textAlign: 'center',
		},
	});
	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t('Informações Gerais')}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>{t('Bem-vindo à nossa aplicação de exemplo')}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>{t('Se você precisar de uma validação específica')}</Text>
				<Text style={styles.sectionText}>
					{t('Se ocorreu algum erro, entre em contato abaixo')}
				</Text>
				<View>
					<Text style={styles.sectionText}>{t('Se quiser contribuir, pode fazer um commit')}</Text>
					<Text style={styles.sectionText}>{t('Este codigo opensorce')}</Text>
					<TouchableOpacity
						style={styles.githubButton}
						onPress={() => Linking.openURL('https://github.com/gabriel-logan/2Devs-Mobile')}
					>
						<Text style={styles.githubButtonText}>{t('Ir para o repositório GitHub')}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t('Contatos')}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>{t('E-mail: contato@exemplo.com')}</Text>
			</View>

			<TouchableOpacity style={styles.linkButton}>
				<Text style={styles.buttonText}>{t('Políticas de Privacidade')}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.linkButton}>
				<Text style={styles.buttonText}>{t('Termos de Uso')}</Text>
			</TouchableOpacity>

			<View style={[styles.section, { marginTop: 10 }]}>
				<Text style={styles.sectionTitle}>{t('Contribuidores')}</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionText}>{t('Gabriel Logan')}</Text>
				{/* Adicione outros contribuidores aqui */}
			</View>
		</ScrollView>
	);
}
