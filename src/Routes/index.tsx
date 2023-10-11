import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../pages/Main';
import Base64Page from '../pages/encodersAndDecoders/Base64';
import CpfValidatorPage from '../pages/validators/Cpf';
import CpfGeradorPage from '../pages/generators/Cpf';
import BinaryCodePage from '../pages/encodersAndDecoders/CodigoBinario';
import CnpjValidatorPage from '../pages/validators/Cnpj';
import CnpjGeneratorPage from '../pages/generators/Cnpj';
import CreditCardValidatorPage from '../pages/validators/CreditCard';
import CreditCardGeneratorPage from '../pages/generators/CreditCard';
import GeneralInfoPage from '../pages/Informations';

import CustomDrawerContent from '../components/DrawerContent';

import { useTheme } from '../components/ThemeContext';

import getThemeColor from '../configs/colors';

import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

export default function Routes() {
	const { theme } = useTheme();
	const { t } = useTranslation();

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} theme={theme} />}
			screenOptions={{
				headerStyle: { backgroundColor: getThemeColor(theme, 'background') },
				headerTitleStyle: { color: getThemeColor(theme, 'title') },
				headerTintColor: getThemeColor(theme, 'title'),
				drawerStyle: { backgroundColor: getThemeColor(theme, 'background') },
				drawerActiveTintColor: getThemeColor(theme, 'text'),
				drawerInactiveTintColor: getThemeColor(theme, 'text'),
			}}
		>
			<Drawer.Screen name="Main" options={{ title: t('Principal') }} component={Main} />
			<Drawer.Screen
				name="InfoPage"
				options={{ title: t('Informações') }}
				component={GeneralInfoPage}
			/>
			<Drawer.Screen name="Base64" options={{ title: t('Base64') }} component={Base64Page} />
			<Drawer.Screen
				name="CpfValidador"
				options={{ title: t('Validador de Cpf') }}
				component={CpfValidatorPage}
			/>
			<Drawer.Screen
				name="CpfGerador"
				options={{ title: t('Gerador de Cpf') }}
				component={CpfGeradorPage}
			/>
			<Drawer.Screen
				name="CodigoBinario"
				options={{ title: t('Codigo Binario') }}
				component={BinaryCodePage}
			/>
			<Drawer.Screen
				name="CnpjValidador"
				options={{ title: t('Validador de Cnpj') }}
				component={CnpjValidatorPage}
			/>
			<Drawer.Screen
				name="CnpjGerador"
				options={{ title: t('Gerador de Cnpj') }}
				component={CnpjGeneratorPage}
			/>
			<Drawer.Screen
				name="CreditCardGerador"
				options={{ title: t('Gerador de Cartão de credito') }}
				component={CreditCardGeneratorPage}
			/>
			<Drawer.Screen
				name="CreditCardValidador"
				options={{ title: t('Validador de Cartão de credito') }}
				component={CreditCardValidatorPage}
			/>
		</Drawer.Navigator>
	);
}
