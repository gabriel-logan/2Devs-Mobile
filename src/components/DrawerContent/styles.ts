import { StyleSheet } from 'react-native';
import getThemeColor from '../../configs/colors';
import { RFValue } from '../Responsive';

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			marginTop: RFValue(35),
			flex: 1,
		},
		logo: {
			width: RFValue(128 + 50),
			height: RFValue((128 + 50) / 2),
			marginBottom: RFValue(25),
		},
		menuScrollView: {
			marginTop: RFValue(10),
			width: '90%',
		},
		menuItem: {
			marginBottom: RFValue(10),
			borderWidth: 0.5,
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

export default styles;
