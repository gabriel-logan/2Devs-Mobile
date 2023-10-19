import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PrivacyPolicesAndTerms from '../components/PrivacyPolicesAndTerms';

import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator initialRouteName="Initial" screenOptions={{headerShown: false}}>
			<Stack.Screen name="Initial" component={PrivacyPolicesAndTerms} />
			<Stack.Screen name="Drawer" component={DrawerNavigator} />
		</Stack.Navigator>
	);
}
