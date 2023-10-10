import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';

import { View, Text, StyleSheet } from 'react-native';

import Main from '../pages/Main';
import Base64Page from '../pages/generators/Base64';
import CpfPage from '../pages/validators/Cpf';

import { useTheme } from '../components/ThemeContext';

import getThemeColor from '../configs/colors';

function CustomDrawerHeader() {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		headerContainer: {
			backgroundColor: getThemeColor(theme, 'primary'), // Cor de fundo do cabeçalho
			padding: 16,
			alignItems: 'center',
		},
		headerText: {
			color: '#fff', // Cor do texto do cabeçalho
			fontSize: 20,
			fontWeight: 'bold',
		},
	});

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>2Devs App</Text>
		</View>
	);
}

const Drawer = createDrawerNavigator();

export default function Routes() {
	const { theme } = useTheme();

	const drawerStyle = {
		backgroundColor: getThemeColor(theme, 'background'), // Cor de fundo da gaveta
	};

	return (
		<Drawer.Navigator
			drawerContent={(props) => {
				return (
					<DrawerContentScrollView {...props} style={drawerStyle}>
						<CustomDrawerHeader />
						<DrawerItemList {...props} />
					</DrawerContentScrollView>
				);
			}}
			screenOptions={{
				headerStyle: { backgroundColor: getThemeColor(theme, 'background') },
				headerTitleStyle: { color: getThemeColor(theme, 'title') },
			}}
		>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="Base64" component={Base64Page} />
			<Drawer.Screen name="Cpf" options={{ title: 'CPF' }} component={CpfPage} />
		</Drawer.Navigator>
	);
}
