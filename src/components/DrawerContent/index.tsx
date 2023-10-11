import { StyleSheet, View } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Image } from 'expo-image';

import { RFValue } from '../Responsive';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
	theme: 'light' | 'dark'; // Defina o tipo apropriado para o seu tema
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
	const { theme } = props;

	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.logoContainer}>
				<Image
					source={
						theme === 'light'
							? require('../../../assets/marca.svg')
							: require('../../../assets/marcalight.svg')
					}
					placeholder={blurhash}
					contentFit="cover"
					transition={350}
					style={styles.logo}
				/>
			</View>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	logoContainer: {
		alignItems: 'center',
		marginBottom: 20,
		marginTop: 10,
	},
	logo: {
		width: RFValue(128 + 50),
		height: RFValue((128 + 50) / 2),
	},
});

export default CustomDrawerContent;
