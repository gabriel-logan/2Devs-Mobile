import { StyleSheet } from "react-native";

import { RFValue } from "../../../components/Responsive";
import getThemeColor from "../../../configs/colors";
import type { Theme } from "../../../types/themeProps";

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: RFValue(20),
			backgroundColor: getThemeColor(theme, "background"),
		},
		inputContainer: {
			width: "100%",
			flexDirection: "row",
			alignItems: "center",
			marginBottom: RFValue(10),
		},
		input: {
			flex: 1,
			height: RFValue(200),
			borderColor: "gray",
			borderWidth: 0.5,
			borderRadius: 4,
			textAlignVertical: "top",
			padding: RFValue(10),
			color: getThemeColor(theme, "text"),
			backgroundColor: getThemeColor(theme, "cardBackground"),
		},
		button: {
			backgroundColor: "#007AFF",
			padding: RFValue(10),
			borderRadius: 5,
			margin: RFValue(10),
		},
		buttonText: {
			color: "white",
			textAlign: "center",
		},
		divButtonCopy: {
			flexDirection: "row",
			justifyContent: "space-around",
		},
		buttonCopy: {
			marginVertical: RFValue(10),
		},
		section: {
			flexDirection: "row",
			alignItems: "center",
		},
		paragraph: {
			fontSize: RFValue(15),
			color: getThemeColor(theme, "text"),
		},
		checkbox: {
			margin: RFValue(8),
		},
	});

export default styles;
