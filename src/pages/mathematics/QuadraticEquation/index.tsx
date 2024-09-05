import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";

import { RFValue } from "../../../components/Responsive";
import { useTheme } from "../../../components/ThemeContext";
import getThemeColor from "../../../configs/colors";

export default function QuadraticEquationPage() {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const stylesWithTheme = styles(theme);

	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");

	const [aproxima, setAproxima] = useState(false);
	const [deleteAfter, setDeleteAfter] = useState(false);

	const [result, setResult] = useState("");

	const valorARef = useRef<TextInput | null>(null);
	const valorBRef = useRef<TextInput | null>(null);
	const valorCRef = useRef<TextInput | null>(null);

	const raizQuadrada = function (valorParaCalcular: number) {
		return Math.pow(valorParaCalcular, 1 / 2);
	};

	const calculateQuadraticEquation = () => {
		const numeroA = Number(a);
		const numeroB = Number(b);
		const numeroC = Number(c);

		if (
			Number.isNaN(numeroA) ||
			Number.isNaN(numeroB) ||
			Number.isNaN(numeroC)
		) {
			Alert.alert(t("Erro"), t("Digite valores válidos para a, b e c"));
			return;
		}

		if (numeroA === 0 && numeroB === 0) {
			return setResult(t("Constante = " + numeroC));
		}

		if (Math.pow(numeroB, 2) - 4 * numeroA * numeroC < 0) {
			return setResult(t("Não possui raizes reais"));
		}

		const raiz1 =
			(-numeroB + raizQuadrada(Math.pow(numeroB, 2) - 4 * numeroA * numeroC)) /
			(2 * numeroA);
		const raiz2 =
			(-numeroB - raizQuadrada(Math.pow(numeroB, 2) - 4 * numeroA * numeroC)) /
			(2 * numeroA);

		let resultMessage = "";

		const aproximaRaiz1 = aproxima ? raiz1.toFixed(2) : raiz1;
		const aproximaRaiz2 = aproxima ? raiz2.toFixed(2) : raiz2;

		if (raiz1 === raiz2) {
			resultMessage = t("Possui apenas 1 raiz real") + aproximaRaiz1;
		} else {
			resultMessage =
				t("First root:") +
				aproximaRaiz1 +
				" " +
				t("Second root:") +
				aproximaRaiz2;
		}

		if (deleteAfter) {
			setA("");
			setB("");
			setC("");
		}

		return setResult(resultMessage);
	};

	useEffect(() => {
		(async () => {
			const valueAproximaFunc = await AsyncStorage.getItem(
				"aproximaQuadraticEq"
			);
			if (valueAproximaFunc) {
				setAproxima(JSON.parse(valueAproximaFunc));
			}
			const apagaQuadraticAfterGen = await AsyncStorage.getItem(
				"apagaQuadraticAfterGen"
			);
			if (apagaQuadraticAfterGen) {
				setDeleteAfter(JSON.parse(apagaQuadraticAfterGen));
			}
		})();
	}, []);

	return (
		<View style={stylesWithTheme.container}>
			<View style={stylesWithTheme.inputContainer}>
				<Text style={stylesWithTheme.label}>{t("Digite o valor de A:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={a}
					placeholder={t("Termo que acompanha o x², ex: 5x²")}
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
					onChangeText={(text) => setA(text)}
					keyboardType="numeric"
					returnKeyType="next"
					ref={valorARef} // Defina a referência para o primeiro campo
					onSubmitEditing={() => valorBRef.current!.focus()}
				/>
				<Text style={stylesWithTheme.label}>{t("Digite o valor de B:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={b}
					placeholder={t("Termo que acompanha o x, ex: 3x")}
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
					onChangeText={(text) => setB(text)}
					keyboardType="numeric"
					returnKeyType="next"
					ref={valorBRef} // Defina a referência para o segundo campo
					onSubmitEditing={() => valorCRef.current!.focus()} // Quando pressionado "Next", vá para o próximo campo
				/>
				<Text style={stylesWithTheme.label}>{t("Digite o valor de C:")}</Text>
				<TextInput
					style={stylesWithTheme.input}
					value={c}
					placeholder={t("Termo independente, ex: -4")}
					placeholderTextColor={getThemeColor(theme, "placeHolderColor")}
					onChangeText={(text) => setC(text)}
					keyboardType="numeric"
					returnKeyType="done"
					ref={valorCRef} // Defina a referência para o terceiro campo
				/>
			</View>
			<View style={stylesWithTheme.checkboxContainer}>
				<Text style={stylesWithTheme.label}>{t("Usar aproximação ?")}</Text>
				<CheckBox
					testID="checkbox-aproximate"
					value={aproxima}
					onValueChange={async (value) => {
						await AsyncStorage.setItem(
							"aproximaQuadraticEq",
							JSON.stringify(value)
						);
						setAproxima(value);
					}}
				/>
			</View>
			<View style={stylesWithTheme.checkboxContainer}>
				<Text style={stylesWithTheme.label}>
					{t("Limpar campos após gerar ?")}
				</Text>
				<CheckBox
					testID="checkbox-deleteAfter"
					value={deleteAfter}
					onValueChange={async (value) => {
						await AsyncStorage.setItem(
							"apagaQuadraticAfterGen",
							JSON.stringify(value)
						);
						setDeleteAfter(value);
					}}
				/>
			</View>
			<TouchableOpacity
				style={stylesWithTheme.button}
				onPress={calculateQuadraticEquation}
			>
				<Text style={stylesWithTheme.buttonText}>{t("Calcular")}</Text>
			</TouchableOpacity>
			<View style={stylesWithTheme.resultContainer}>
				<Text style={stylesWithTheme.label}>
					{t("Resultado: ")}
					{result}
				</Text>
			</View>
		</View>
	);
}

const styles = (theme: "dark" | "light") =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(16),
			backgroundColor: getThemeColor(theme, "background"),
		},
		inputContainer: {
			marginBottom: RFValue(16),
		},
		label: {
			fontSize: RFValue(16),
			marginBottom: RFValue(8),
			color: getThemeColor(theme, "text"), // Altere a cor apropriada
		},
		input: {
			height: RFValue(50),
			borderColor: getThemeColor(theme, "border"),
			borderWidth: 1,
			paddingLeft: RFValue(10),
			borderRadius: 4,
			color: getThemeColor(theme, "text"), // Altere a cor apropriada
			backgroundColor: getThemeColor(theme, "inputBackground"),
		},
		checkboxContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: RFValue(5),
			justifyContent: "center",
			height: RFValue(50),
		},
		button: {
			backgroundColor: getThemeColor(theme, "buttonBackground"), // Altere a cor apropriada
			alignItems: "center",
			justifyContent: "center",
			height: RFValue(50),
			borderRadius: 4,
		},
		buttonText: {
			color: "white",
			fontSize: RFValue(16),
		},
		resultContainer: {
			marginTop: RFValue(16),
		},
	});
