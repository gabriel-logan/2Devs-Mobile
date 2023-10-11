export const colors = {
	light: {
		background: '#FFFFFF', // Cor de fundo principal
		cardBackground: '#F5F5F5', // Cor de fundo para cartões ou áreas destacadas
		text: '#333333', // Cor do texto principal
		textInverted: '#FFFFFF', // Cor do texto principal
		primary: '#007BFF', // Cor primária (por exemplo, botões principais)
		border: '#CCCCCC', // Cor de bordas e divisores
		success: '#28A745', // Cor de sucesso (por exemplo, validação bem-sucedida)
		error: '#DC3545', // Cor de erro (por exemplo, validação com erro)
		warning: '#FFC107', // Cor de aviso (por exemplo, notificações de aviso)
		info: '#17A2B8', // Cor de informações (por exemplo, informações adicionais)
		inputBackground: '#E8E8E8', // Cor de fundo para campos de entrada
		buttonBackground: '#3498db', // Cor de fundo para botões
		buttonBlack: '#333', // Cor de fundo para botões
		title: '#333333', // Cor de título
		secondaryText: '#777777', // Cor de texto secundário
		tertiaryBackground: '#FAFAFA', // Cor de fundo terciária
		placeHolderColor: '#6e6e6e',
	},
	dark: {
		background: '#333333',
		cardBackground: '#222222',
		text: '#FFFFFF',
		textInverted: '#333333', // Cor do texto principal
		primary: '#007BFF',
		border: '#555555',
		success: '#28A745',
		error: '#DC3545',
		warning: '#FFC107',
		info: '#17A2B8',
		inputBackground: '#444444',
		buttonBackground: '#0099FF',
		buttonBlack: '#dadada', // Cor de fundo para botões
		title: '#FFFFFF',
		secondaryText: '#CCCCCC',
		tertiaryBackground: '#444444',
		placeHolderColor: '#c1c1c1',
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
