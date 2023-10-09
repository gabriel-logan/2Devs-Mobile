export const colors = {
	light: {
		backgroundMain: 'white',
		backgroundSecondary: 'white',
		backgroudInputProdList: '#eee',
		backgroundReverseWeak: '#141c24',
		backgroundReverseStrong: 'black',
		bordersAndDividers: '#bdc3c7',
		borderNotaFiscal: '#0446399e',
		borderStrong: '#333', // Cinza escuro
		buttonGreen: '#00b894', // Correspondente ao tema escuro: buttonGreen
		buttonPurple: '#6c5ce7',
		buttonYellow: '#FFA500', // Correspondente ao tema escuro: buttonYellow
		buttonBlue: '#0074cc', // Azul
		buttonGray: '#333', // Azul
		buttonCoralRed: '#d9534f', // Vermelho
		buttonPink: '#ff7675', // Rosa
		cardItemBackground: '#ffffff', // Branco
		cardItemBorder: '#ccc', // Cinza claro
		cardItemText: 'black', // Cor do texto do item de cartão
		clickableLinks: '#0074cc', // Azul
		confirmationButton: '#008000', // Verde
		danger: '#e74c3c',
		deletionButton: '#FF0000', // Vermelho
		footer: '#4b5563',
		gray: '#95a5a6',
		header: '#333333', // Cabeçalho
		highlight: '#FFA500', // Cor de destaque
		iconsActive: '#e67e22',
		info: '#3498db',
		inputBackground: '#2B2B2B', // Correspondente ao tema escuro: inputBackground
		inputActive: '#eb6060',
		inputFieldBackground: '#fff', // Branco
		inputFieldText: '#333', // Cinza escuro
		labelText: '#6d6d78',
		placeholderText: '#7b8c93',
		shadowColor: '#000',
		subTitleText: '#636e72',
		success: '#27ae60',
		textMain: 'black', // Cor principal do texto
		textSecondary: '#333',
		textReverse: '#A6A6A6', // Cinza claro
		titleText: 'black',
		spanError: '#f00',
		notafiscalCorFundoPrincipal: '#fff',
		notafiscalCorTextoPrincipal: 'black',
		notafiscalCorTexto: 'black',
		backgroundModalOutside: 'rgba(0, 0, 0, 0.5)',
		backgroundModalInside: 'white',
		tabBarInactiveTintColor: '#CCCCCC',
		tabBarActiveTintColor: 'black',
		tabBarIndicatorStyle: '#698de2',
		backgroundModalChangePhoto: '#dfe6e9eb',
	},
	dark: {
		backgroundMain: '#18191a', // Preto
		backgroundSecondary: '#242526', // Segundo plano
		backgroudInputProdList: '#3a3b3c', // Cor de fundo do input da lista de produtos
		backgroundReverseWeak: '#d9e1e3',
		backgroundReverseStrong: 'white',
		bordersAndDividers: '#7b878e', // Cinza escuro
		borderNotaFiscal: '#333333', // Cinza escuro
		borderStrong: '#666', // Cinza médio
		buttonGreen: '#008000', // Botão de adição
		buttonPurple: '#6c5ce7', // Purple
		buttonYellow: '#FFA500', // Botão de edição
		buttonBlue: '#1E90FF', // Azul Royal
		buttonGray: '#666', // Azul Royal
		buttonCoralRed: '#FF6347', // Vermelho Coral
		buttonPink: '#ff7675', // Rosa
		cardItemBackground: '#1E1E1E', // Cinza escuro
		cardItemBorder: '#2E2E2E', // Cinza médio
		cardItemText: '#FFFFFF', // Branco
		clickableLinks: '#00CED1', // Azul Turquesa
		confirmationButton: '#32CD32', // Verde
		danger: '#FF0000', // Perigo
		deletionButton: '#FF4500', // Vermelho
		footer: '#ecf0f1', // Rodapé
		header: '#333333', // Cabeçalho
		highlight: '#FFA500', // Laranja
		iconsActive: '#FFD700', // Amarelo
		iconsInactive: '#666666', // Cinza
		info: '#00BFFF', // Informação
		inputBackground: '#2B2B2B', // Fundo para campos de entrada
		inputFieldBackground: '#333333', // Cinza escuro
		inputActive: '#FFD700',
		inputFieldText: '#FFFFFF', // Branco
		labelText: '#A6A6A6', // Texto de rótulos
		placeholderText: '#808080', // Cinza para placeholders
		shadowColor: 'black', // Cor da sombra
		subTitleText: '#FFA500', // Texto de subtítulos
		success: '#008000', // Sucesso
		textMain: '#e4e6eb', // Branco
		textSecondary: '#A6A6A6', // Cinza claro
		textReverse: '#333',
		titleText: '#FFFFFF', // Texto do título
		spanError: '#f00',
		notafiscalCorFundoPrincipal: '#121212',
		notafiscalCorTextoPrincipal: '#FFFFFF',
		notafiscalCorTexto: '#FFA500',
		backgroundModalOutside: 'rgba(255, 255, 255, 0.5)',
		backgroundModalInside: '#2B2B2B',
		tabBarInactiveTintColor: '#888888',
		tabBarActiveTintColor: '#FFFFFF',
		tabBarIndicatorStyle: '#6d6d78',
		backgroundModalChangePhoto: '#27343a',
	},
};

export type ColorPalette = typeof colors;

export const getThemeColor = (
	theme: keyof ColorPalette,
	key: keyof ColorPalette[keyof ColorPalette],
): string => {
	const themeColors = colors[theme];
	return themeColors ? themeColors[key] : '#fff';
};

export default getThemeColor;
