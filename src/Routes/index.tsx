import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/Main';

const Drawer = createDrawerNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Main" component={Main} />
		</Drawer.Navigator>
	);
}
