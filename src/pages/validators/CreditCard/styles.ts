import {StyleSheet} from "react-native";
import {RFValue} from "../../../components/Responsive";
import getThemeColor from "../../../configs/colors";
import {Theme} from "../../../types/themeProps";

const styles = (theme: Theme, creditCardIsValidResult?: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: getThemeColor(theme, "background"),
			alignItems: "center",
			justifyContent: "center",
		},
		title: {
			fontSize: RFValue(22), // Responsive font size
			fontWeight: "bold",
			marginBottom: RFValue(20), // Responsive margin
			color: getThemeColor(theme, "title"),
		},
		card: {
			width: "80%",
			backgroundColor: getThemeColor(theme, "cardBackground"),
			borderRadius: RFValue(10), // Responsive border radius
			padding: RFValue(20), // Responsive padding
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2, // Responsive shadow offset
			},
			shadowOpacity: 0.2,
			shadowRadius: 2, // Responsive shadow radius
			elevation: 3, // Responsive elevation
		},
		label: {
			fontSize: RFValue(14), // Responsive font size
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, "text"),
		},
		input: {
			height: RFValue(50), // Responsive height
			borderWidth: 1, // Responsive border width
			borderColor: getThemeColor(theme, "border"),
			padding: RFValue(10), // Responsive padding
			marginBottom: RFValue(10), // Responsive margin
			color: getThemeColor(theme, "text"),
			textAlign: "center",
			textAlignVertical: "center",
			fontSize: RFValue(14),
			backgroundColor: getThemeColor(theme, "inputBackground"),
		},
		divButtonCopy: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginVertical: RFValue(15),
		},
		buttonCopy: {},
		creditCardStatus: {
			backgroundColor: creditCardIsValidResult ? "#4CAF50" : "#F44336",
			padding: RFValue(10),
			borderRadius: 5,
			alignItems: "center",
			justifyContent: "center",
		},
		validCreditCardText: {
			fontSize: RFValue(18),
			color: "#FFFFFF",
		},
		invalidCreditCardText: {
			fontSize: RFValue(18),
			color: "#FFFFFF",
		},
	});

export default styles;
