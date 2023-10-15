import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import MyNetwork from '../pages/MyNetwork';
import PasswordGenerator from '../pages/generators/PasswordGen';

import MmcMdcPage from '../pages/mathematics/MmcMdc';
import LinearEquationPage from '../pages/mathematics/LinearEquation';
import QuadraticEquationPage from '../pages/mathematics/QuadraticEquation';
import Md5Page from '../pages/encodersAndDecoders/Md5';

import PrivacyPolicesAndTerms from '../components/PrivacyPolicesAndTerms';

import CustomDrawerContent from '../components/DrawerContent';

import { useTheme } from '../components/ThemeContext';

import getThemeColor from '../configs/colors';

import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	const { theme } = useTheme();
	const { t } = useTranslation();

	return (
		<Drawer.Navigator
			drawerContent={() => <CustomDrawerContent />}
			screenOptions={{
				headerStyle: { backgroundColor: getThemeColor(theme, 'background') },
				headerTitleStyle: { color: getThemeColor(theme, 'title') },
				headerTintColor: getThemeColor(theme, 'title'),
				drawerStyle: { backgroundColor: getThemeColor(theme, 'background') },
			}}
		>
			<Drawer.Group>
				<Drawer.Screen name="Main" options={{ title: t('Principal') }} component={Main} />
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen
					name="InfoPage"
					options={{ title: t('Informações') }}
					component={GeneralInfoPage}
				/>
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen
					name="CpfGerador"
					options={{ title: t('Gerador de Cpf') }}
					component={CpfGeradorPage}
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
					name="PasswordGerador"
					options={{ title: t('Gerador de senha') }}
					component={PasswordGenerator}
				/>
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen
					name="CpfValidador"
					options={{ title: t('Validador de Cpf') }}
					component={CpfValidatorPage}
				/>
				<Drawer.Screen
					name="CnpjValidador"
					options={{ title: t('Validador de Cnpj') }}
					component={CnpjValidatorPage}
				/>
				<Drawer.Screen
					name="CreditCardValidador"
					options={{ title: t('Validador de Cartão de credito') }}
					component={CreditCardValidatorPage}
				/>
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen name="Base64" options={{ title: t('Base64') }} component={Base64Page} />
				<Drawer.Screen name="Md5" options={{ title: t('Md5') }} component={Md5Page} />
				<Drawer.Screen
					name="CodigoBinario"
					options={{ title: t('Codigo Binario') }}
					component={BinaryCodePage}
				/>
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen name="MmcMdc" options={{ title: t('Mmc e Mdc') }} component={MmcMdcPage} />
				<Drawer.Screen
					name="LinearEquation"
					options={{ title: t('Equação de primeiro grau') }}
					component={LinearEquationPage}
				/>
				<Drawer.Screen
					name="QuadraticEquation"
					options={{ title: t('Equação de segundo grau') }}
					component={QuadraticEquationPage}
				/>
			</Drawer.Group>
			<Drawer.Group>
				<Drawer.Screen
					name="MyNetwork"
					options={{ title: t('Minha rede') }}
					component={MyNetwork}
				/>
			</Drawer.Group>
		</Drawer.Navigator>
	);
}

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator initialRouteName="Initial" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Initial" component={PrivacyPolicesAndTerms} />
			<Stack.Screen name="Drawer" component={DrawerNavigator} />
		</Stack.Navigator>
	);
}
