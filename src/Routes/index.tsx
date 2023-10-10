import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/Main';
import Base64Generator from '../pages/generators/Base64';
import CpfValidator from '../pages/validators/Cpf';

const Drawer = createDrawerNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="Base64Generator" component={Base64Generator} />
			<Drawer.Screen name="CpfValidator" component={CpfValidator} />
		</Drawer.Navigator>
	);
}
