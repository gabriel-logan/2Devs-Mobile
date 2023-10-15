import { DirectRoutesProps, SubRoutesProps } from '../../types/navigationProps';

const drawerMenu: (
	| {
			title: string;
			route: DirectRoutesProps;
			menuList?: undefined;
	  }
	| {
			title: string;
			menuList: {
				title: string;
				route: SubRoutesProps;
			}[];
			route?: undefined;
	  }
)[] = [
	{
		title: 'Principal',
		route: 'Main',
	},
	{
		title: 'Informações',
		route: 'InfoPage',
	},
	{
		title: 'Geradores',
		menuList: [
			{ title: 'Gerador de Cpf', route: 'CpfGerador' },
			{ title: 'Gerador de Cnpj', route: 'CnpjGerador' },
			{ title: 'Gerador de Cartão de credito', route: 'CreditCardGerador' },
			{ title: 'Gerador de senha', route: 'PasswordGerador' },
		],
	},
	{
		title: 'Validadores',
		menuList: [
			{ title: 'Validador de Cpf', route: 'CpfValidador' },
			{ title: 'Validador de Cnpj', route: 'CnpjValidador' },
			{ title: 'Validador de Cartão de credito', route: 'CreditCardValidador' },
		],
	},
	{
		title: 'Encoders and Decoders',
		menuList: [
			{ title: 'Base64', route: 'Base64' },
			{ title: 'Md5', route: 'Md5' },
			{ title: 'Conversor de dados', route: 'DataConverter' },
			{ title: 'Codigo Binario', route: 'CodigoBinario' },
		],
	},
	{
		title: 'Matemática',
		menuList: [
			{ title: 'Equação de primeiro grau', route: 'LinearEquation' },
			{ title: 'Equação de segundo grau', route: 'QuadraticEquation' },
			{ title: 'Mmc e Mdc', route: 'MmcMdc' },
		],
	},
	{
		title: 'Minha rede',
		route: 'MyNetwork',
	},
];

export default drawerMenu;
