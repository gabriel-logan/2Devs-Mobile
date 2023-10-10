import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/Main';
import Base64Page from '../pages/generators/Base64';
import CpfPage from '../pages/validators/Cpf';

const Drawer = createDrawerNavigator();

export default function Routes() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="Base64" component={Base64Page} />
			<Drawer.Screen name="Cpf" options={{ title: 'CPF' }} component={CpfPage} />
		</Drawer.Navigator>
	);
}
