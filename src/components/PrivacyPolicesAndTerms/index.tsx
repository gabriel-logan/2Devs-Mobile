import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCalendars } from 'expo-localization';

import * as Linking from 'expo-linking';

// Cria o time zone do local
import moment from 'moment-timezone';

// Localstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// COmponentes
import { RFValue } from '../Responsive';
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';

// types
import { NavigationPropsTypes } from '../../types/navigationProps';

const termsURL = 'https://gabriel-logan.github.io/2Devs-Mobile/terms.html';
const privacyURL = 'https://gabriel-logan.github.io/2Devs-Mobile';

export default function PrivacyPolicesAndTerms({ navigation }: NavigationPropsTypes) {
	const { t } = useTranslation();
	const [isChecked, setIsChecked] = useState(false);
	const [activeSpam, setActiveSpam] = useState(false);
	// Estado do Loading
	const [isLoading, setIsLoading] = useState(false);

	const [termIsAccepts, setTermsIsAccepts] = useState(false);

	const timeZone = getCalendars()[0].timeZone;

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleContinue = async () => {
		// Cria o tempo baseado no brasil
		const currentTime = moment()
			.tz(timeZone ? timeZone : t('America/Sao_Paulo'))
			.format('DD-MM-YYYY HH:mm:ss');
		if (isChecked) {
			// Perform actions when the checkbox is checked and continue button is pressed
			setActiveSpam(false);
			try {
				await AsyncStorage.setItem('termsAccept', JSON.stringify(true));
				await AsyncStorage.setItem('dataTermsAccept', JSON.stringify(currentTime));
				navigation.reset({
					index: 0,
					routes: [{ name: 'Drawer' }],
				});
			} catch (error) {
				Alert.alert(t('Alguma coisa errada aconteceu, contate o desenvolvedor'));
			}
		} else {
			// Show an error message or prevent further actions if the checkbox is not checked
			setActiveSpam(true);
		}
	};

	const checkboxIcon = isChecked ? (
		<MaterialCommunityIcons
			name="checkbox-intermediate"
			size={24}
			color="green"
			style={styles.checkboxIcon}
		/>
	) : (
		<MaterialCommunityIcons
			name="checkbox-blank-outline"
			size={24}
			color="gray"
			style={styles.checkboxIcon}
		/>
	);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const termsAccept = await AsyncStorage.getItem('termsAccept');
				if (termsAccept) {
					if (JSON.parse(termsAccept)) {
						setTermsIsAccepts(true);
						setIsLoading(false);
						navigation.reset({
							index: 0,
							routes: [{ name: 'Drawer' }],
						});
					} else {
						setTermsIsAccepts(false);
						setIsLoading(false);
					}
				}
				setIsLoading(false);
			} catch (error) {
				setTermsIsAccepts(false);
				setIsLoading(false);
				Alert.alert(t('Alguma coisa errada aconteceu, contate o desenvolvedor'));
			}
		})();
	}, [navigation, t]);

	// APenas o componente Loading
	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={termIsAccepts ? { opacity: 0 } : styles.container}>
			<TouchableOpacity
				style={styles.checkboxContainer}
				onPress={handleCheckboxChange}
				activeOpacity={0.8}
			>
				{checkboxIcon}
				<Text style={styles.checkboxText}>{t('Eu concordo com os termos')}</Text>
			</TouchableOpacity>
			{activeSpam && (
				<Text style={{ color: '#e74c3c', marginBottom: 25, alignSelf: 'center' }}>
					{t('Para continuar você precisa aceitar os termos')}
				</Text>
			)}
			<View style={styles.buttonContainer}>
				<Button title={t('Ler termos de uso')} onPress={() => Linking.openURL(termsURL)} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title={t('Ler politicas de privacidade')}
					onPress={() => Linking.openURL(privacyURL)}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<Button title={t('Continuar')} onPress={handleContinue} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121',
		padding: 20,
		justifyContent: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#2c3e50',
	},
	modalContent: {
		backgroundColor: '#2c3e50',
		padding: 20,
		borderRadius: 8,
	},
	policiesText: {
		color: '#ecf0f1',
		fontSize: RFValue(16),
		lineHeight: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#ecf0f1',
	},
	listItem: {
		fontSize: RFValue(16),
		color: '#ecf0f1',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	checkboxIcon: {
		marginRight: 8,
	},
	checkboxText: {
		fontSize: RFValue(16),
		color: '#ecf0f1',
	},
	buttonContainer: {
		marginBottom: 20,
	},
	buttonText: {
		fontSize: RFValue(16),
		color: '#ecf0f1',
	},
	linkText: {
		marginVertical: 5,
		fontSize: RFValue(15),
		color: 'white',
		textDecorationLine: 'underline',
	},
	linkButton: {},
});
