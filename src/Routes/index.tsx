import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import PrivacyPolicesAndTerms from "../components/PrivacyPolicesAndTerms";

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator
			initialRouteName="Drawer"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Drawer" component={DrawerNavigator} />
			<Stack.Screen name="Initial" component={PrivacyPolicesAndTerms} />
		</Stack.Navigator>
	);
}
