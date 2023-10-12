import { NavigationProp } from '@react-navigation/native';

interface MyNavigationProps {
	Drawer: undefined;
	Main: undefined;
	InfoPage: undefined;
	CpfGerador: undefined;
	CnpjGerador: undefined;
	CreditCardGerador: undefined;
	CpfValidador: undefined;
	CnpjValidador: undefined;
	CreditCardValidador: undefined;
	Base64: undefined;
	CodigoBinario: undefined;
	MyNetwork: undefined;
	Mathematics: undefined;
	PasswordGerador: undefined;
}

export type NavigationType = NavigationProp<MyNavigationProps>;

export interface NavigationPropsTypes {
	navigation: NavigationType;
}
