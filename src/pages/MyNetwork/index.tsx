import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import * as Network from 'expo-network';
import * as Clipboard from 'expo-clipboard';

import axios from 'axios';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useTranslation } from 'react-i18next';

import { useTheme } from '../../components/ThemeContext';

import getThemeColor from '../../configs/colors';

import { RFValue } from '../../components/Responsive';

const MyNetwork = () => {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [ipAddress, setIpAddress] = useState<string | null>(null);
	const [ipAddressExternal, setIpAddressExternal] = useState<string | null>(null);
	const [airplaneMode, setAirplaneMode] = useState<boolean | null>(null);

	useFocusEffect(
		useCallback(() => {
			const fetchNetworkInfo = async () => {
				try {
					const ip = await Network.getIpAddressAsync();
					setIpAddress(ip);

					const ipExternal = (await axios.get('https://api.ipify.org/?format=json')).data;

					if (ipExternal) {
						setIpAddressExternal(ipExternal.ip);
					} else {
						setIpAddressExternal(
							t('Houve um problema não identificado na solicitação, tente novamente mais tarde'),
						);
					}

					const airplane = await Network.isAirplaneModeEnabledAsync();
					setAirplaneMode(airplane);
				} catch (error) {
					console.error(error);
				}
			};

			fetchNetworkInfo();
		}, [t]),
	);

	const copyToClipboard = async (textToCopy: string) => {
		await Clipboard.setStringAsync(textToCopy);
	};

	return (
		<View style={stylesWithTheme.container}>
			<Text style={stylesWithTheme.title}>{t('Informações de Rede')}</Text>
			<View style={stylesWithTheme.divContainer}>
				<View style={stylesWithTheme.infoContainer}>
					<Text style={stylesWithTheme.infoLabel}>{t('Endereço IP local:')}</Text>
					<View style={stylesWithTheme.row}>
						<Text style={stylesWithTheme.infoText}>{ipAddress || t('Carregando...')}</Text>
						<TouchableOpacity
							onPress={() => copyToClipboard(ipAddress ? ipAddress : t('000.000.000.000'))}
							style={stylesWithTheme.copyButton}
						>
							<FontAwesome5 name="copy" size={RFValue(20)} color="#007bff" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={stylesWithTheme.infoContainer}>
					<Text style={stylesWithTheme.infoLabel}>{t('Endereço IP da rede:')}</Text>
					<View style={stylesWithTheme.row}>
						<Text style={stylesWithTheme.infoText}>{ipAddressExternal || t('Carregando...')}</Text>
						<TouchableOpacity
							onPress={() =>
								copyToClipboard(ipAddressExternal ? ipAddressExternal : t('000.000.000.000'))
							}
							style={stylesWithTheme.copyButton}
						>
							<FontAwesome5 name="copy" size={RFValue(20)} color="#007bff" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={stylesWithTheme.infoContainer}>
					<Text style={stylesWithTheme.infoLabel}>{t('Modo Avião:')}</Text>
					<Text style={stylesWithTheme.infoText}>
						{airplaneMode !== null
							? airplaneMode
								? t('Ativado')
								: t('Desativado')
							: t('Carregando...')}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, 'cardBackground'),
		},
		title: {
			fontSize: RFValue(24),
			fontWeight: 'bold',
			marginBottom: RFValue(20),
			color: getThemeColor(theme, 'title'),
		},
		divContainer: {
			backgroundColor: getThemeColor(theme, 'background'),
			padding: RFValue(20),
			borderRadius: 10,
			elevation: 5,
		},
		infoContainer: {
			marginVertical: 10,
		},
		infoLabel: {
			fontSize: RFValue(16),
			fontWeight: 'bold',
			color: getThemeColor(theme, 'text'),
		},
		infoText: {
			fontSize: RFValue(16),
			color: getThemeColor(theme, 'text'),
		},
		copyButton: {
			padding: 5,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
	});

export default MyNetwork;
