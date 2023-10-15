import { NavigationProp } from '@react-navigation/native';

// Todas as rotas
const RoutesProps = {
	Drawer: undefined,
	Main: undefined,
	InfoPage: undefined,
	CpfGerador: undefined,
	CnpjGerador: undefined,
	CreditCardGerador: undefined,
	CpfValidador: undefined,
	CnpjValidador: undefined,
	CreditCardValidador: undefined,
	Base64: undefined,
	CodigoBinario: undefined,
	MyNetwork: undefined,
	PasswordGerador: undefined,
	MmcMdc: undefined,
	LinearEquation: undefined,
	QuadraticEquation: undefined,
	Md5: undefined,
	NumberConverter: undefined,
};

// Rotas diretas no caso não abre um submenu no drawer
export type DirectRoutesProps = 'Main' | 'InfoPage' | 'MyNetwork';

// rotas as rotas tirando as rotas diretas e Initial e Drawer
export type SubRoutesProps = Exclude<
	keyof typeof RoutesProps,
	DirectRoutesProps | 'Initial' | 'Drawer'
>;

// Tipagem do Navigation
export type NavigationType = NavigationProp<typeof RoutesProps>;

// Tipagem alternativa do navigation
export interface NavigationPropsTypes {
	navigation: NavigationType;
}
