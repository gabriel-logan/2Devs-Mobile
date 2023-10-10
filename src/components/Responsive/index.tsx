// Faz as divs responsiva, converte % para PX baseado na largura ou altura
import {
	widthPercentageToDP as width,
	heightPercentageToDP as height,
} from 'react-native-responsive-screen';

// Lib para fontes responsivas, primeiro usa porcentagem, segundo usa tamanho da tela
import { RFPercentage, RFValue as fixedRFValue } from 'react-native-responsive-fontsize';

/**
 * Método
 * @param {number} valorParaCalcular(Number) - O número a ser calculado o modulo
 * @example width transforma % em px baseado na largura do telefone
 * @example height transforma % em px baseado na altura do telefone
 * @example RFPercentage transforma % em px baseado nas dimensoes da tela
 * @example RFValue Transforma o tamanho da fonte baseado na altura do celular
 * @return {number} - O
 */

export const RFValueWithFixedSecondParam = (value: number) => fixedRFValue(value, 796.89998);

export { width, height, RFPercentage, RFValueWithFixedSecondParam as RFValue };
