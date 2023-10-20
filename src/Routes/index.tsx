import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PrivacyPolicesAndTerms from '../components/PrivacyPolicesAndTerms';

import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator initialRouteName="Drawer" screenOptions={{headerShown: false}}>
			<Stack.Screen name="Drawer" component={DrawerNavigator} />
			<Stack.Screen name="Initial" component={PrivacyPolicesAndTerms} />
		</Stack.Navigator>
	);
}
