import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';

import { Image } from 'expo-image';

import { RFValue } from '../Responsive';

import { useTheme } from '../ThemeContext';

import getThemeColor from '../../configs/colors';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationProps';

const drawerMenu: (
	| {
			title: string;
			route: 'Main' | 'InfoPage' | 'MyNetwork';
			menuList?: undefined;
	  }
	| {
			title: string;
			menuList: {
				title: string;
				route:
					| 'CpfGerador'
					| 'CnpjGerador'
					| 'CreditCardGerador'
					| 'CpfValidador'
					| 'CnpjValidador'
					| 'CreditCardValidador'
					| 'Base64'
					| 'CodigoBinario'
					| 'PasswordGerador'
					| 'MmcMdc'
					| 'LinearEquation'
					| 'QuadraticEquation';
			}[];
			route?: undefined;
	  }
)[] = [
	{
		title: 'Principal',
		route: 'Main',
	},
	{
		title: 'Informações',
		route: 'InfoPage',
	},
	{
		title: 'Geradores',
		menuList: [
			{ title: 'Gerador de Cpf', route: 'CpfGerador' },
			{ title: 'Gerador de Cnpj', route: 'CnpjGerador' },
			{ title: 'Gerador de Cartão de credito', route: 'CreditCardGerador' },
			{ title: 'Gerador de senha', route: 'PasswordGerador' },
		],
	},
	{
		title: 'Validadores',
		menuList: [
			{ title: 'Validador de Cpf', route: 'CpfValidador' },
			{ title: 'Validador de Cnpj', route: 'CnpjValidador' },
			{ title: 'Validador de Cartão de credito', route: 'CreditCardValidador' },
		],
	},
	{
		title: 'Encoders and Decoders',
		menuList: [
			{ title: 'Base64', route: 'Base64' },
			{ title: 'Codigo Binario', route: 'CodigoBinario' },
		],
	},
	{
		title: 'Matemática',
		menuList: [
			{ title: 'Equação de primeiro grau', route: 'LinearEquation' },
			{ title: 'Equação de segundo grau', route: 'QuadraticEquation' },
			{ title: 'Mmc e Mdc', route: 'MmcMdc' },
		],
	},
	{
		title: 'Minha rede',
		route: 'MyNetwork',
	},
];

const CustomDrawerContent = () => {
	const { t } = useTranslation();

	const { theme } = useTheme();

	const stylesWithTheme = styles(theme);

	const [menuIndex, setMenuIndex] = useState(-1);

	const navigation = useNavigation<NavigationType>();

	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	return (
		<View style={stylesWithTheme.container}>
			<Image
				source={
					theme === 'light'
						? require('../../../assets/marca.svg')
						: require('../../../assets/marcalight.svg')
				}
				placeholder={blurhash}
				contentFit="cover"
				transition={350}
				style={stylesWithTheme.logo}
			/>
			{drawerMenu.map((item, index) => (
				<View key={index} style={stylesWithTheme.menuItem}>
					<TouchableOpacity
						onPress={() => {
							LayoutAnimation.configureNext(
								LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
							);
							if (!item.menuList) {
								navigation.navigate(item.route);
							}
							setMenuIndex(menuIndex === index ? -1 : index);
						}}
					>
						<View style={stylesWithTheme.item}>
							<Text style={stylesWithTheme.menuTitle}>{t(item.title)}</Text>
						</View>
						{menuIndex === index && (
							<>
								{item.menuList?.map((subItem, subIndex) => (
									<TouchableOpacity
										key={subIndex}
										onPress={() => navigation.navigate(subItem.route)}
									>
										<View style={stylesWithTheme.subMenu}>
											<Text style={stylesWithTheme.subMenuTitle}>{t(subItem.title)}</Text>
										</View>
									</TouchableOpacity>
								))}
							</>
						)}
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
};

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			marginBottom: RFValue(20),
			marginTop: RFValue(35),
		},
		logo: {
			width: RFValue(128 + 50),
			height: RFValue((128 + 50) / 2),
			marginBottom: RFValue(25),
		},
		menuItem: {
			marginBottom: RFValue(10),
			borderWidth: 0.5,
			width: '90%',
			padding: RFValue(5),
			marginVertical: RFValue(6),
			borderRadius: 10,
			backgroundColor: getThemeColor(theme, 'cardBackground'), // Defina as cores de fundo para light e dark
		},
		item: {
			paddingVertical: RFValue(8),
		},
		menuTitle: {
			fontWeight: 'bold',
			marginVertical: RFValue(5),
			fontSize: RFValue(16),
			paddingHorizontal: RFValue(16),
			color: getThemeColor(theme, 'title'), // Defina as cores de texto para light e dark
		},
		subMenu: {
			paddingVertical: RFValue(14),
			borderWidth: 0.25,
			marginVertical: RFValue(5),
			borderRadius: 8,
			paddingHorizontal: RFValue(10),
			backgroundColor: getThemeColor(theme, 'tertiaryBackground'), // Defina as cores de fundo para light e dark
		},
		subMenuTitle: {
			fontSize: RFValue(15),
			color: getThemeColor(theme, 'title'), // Defina as cores de texto para light e dark
		},
	});

export default CustomDrawerContent;
