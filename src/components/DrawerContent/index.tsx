import {useState} from 'react';

import {View, Text, TouchableOpacity, LayoutAnimation, ScrollView} from 'react-native';

import {useTheme} from '../ThemeContext';

import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';

import {NavigationType} from '../../types/navigationProps';

import drawerMenu from './drawerMenu';

import styles from './styles';

import {RFValue} from '../Responsive';
import LogoComponent from '../LogoComponent';

const CustomDrawerContent = () => {
	const {t} = useTranslation();

	const {theme} = useTheme();

	const stylesWithTheme = styles(theme);

	const [menuIndex, setMenuIndex] = useState(-1);

	const navigation = useNavigation<NavigationType>();

	return (
		<View style={stylesWithTheme.container}>
			<LogoComponent
				style={stylesWithTheme.logo}
				width={RFValue(128 + 50)}
				height={RFValue((128 + 50) / 2)}
			/>

			<ScrollView style={stylesWithTheme.menuScrollView} showsVerticalScrollIndicator={false}>
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
							}}>
							<View style={stylesWithTheme.item}>
								<Text style={stylesWithTheme.menuTitle}>{t(item.title)}</Text>
							</View>
							{menuIndex === index && (
								<>
									{item.menuList?.map((subItem, subIndex) => (
										<TouchableOpacity
											key={subIndex}
											onPress={() => navigation.navigate(subItem.route)}>
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
			</ScrollView>
		</View>
	);
};

export default CustomDrawerContent;
