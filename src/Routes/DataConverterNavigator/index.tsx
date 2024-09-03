import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { t } from "i18next";
import { useState, Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";

import { useTheme } from "../../components/ThemeContext";
import getThemeColor from "../../configs/colors";
import DataConverterPage from "../../pages/encodersAndDecoders/DataConverter";
import AsciiAndHexPage from "../../pages/encodersAndDecoders/DataConverter/AsciiAndHex";
import HexAndDecimal from "../../pages/encodersAndDecoders/DataConverter/HexAndDecimal";
import {
	NavigationType,
	RoutesStringsProps,
} from "../../types/navigationProps";

function DataConverterHeader({
	selectedLanguage,
	setSelectedLanguage,
}: {
	selectedLanguage: RoutesStringsProps;
	setSelectedLanguage: Dispatch<SetStateAction<RoutesStringsProps>>;
}) {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: getThemeColor(theme, "background"),
			borderWidth: 0.4,
			borderColor: getThemeColor(theme, "border"),
			elevation: 2,
		},
		picker: {
			width: "100%",
			color: getThemeColor(theme, "title"),
		},
		pickerItem: {
			color: getThemeColor(theme, "title"),
			backgroundColor: getThemeColor(theme, "tertiaryBackground"),
		},
	});

	const navigation = useNavigation<NavigationType>();

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue) => {
					navigation.navigate(itemValue);
					setSelectedLanguage(itemValue);
				}}
				mode="dropdown"
				dropdownIconColor={getThemeColor(theme, "text")}
				style={styles.picker}
			>
				<Picker.Item
					style={styles.pickerItem}
					label={t("Principal")}
					value="DataConverterMain"
				/>
				<Picker.Item
					style={styles.pickerItem}
					label={t("Ascii e Hexadecimal")}
					value="AsciiAndHex"
				/>
				<Picker.Item
					style={styles.pickerItem}
					label={t("Hexadecimal e Decimal")}
					value="HexAndDecimal"
				/>
			</Picker>
		</View>
	);
}

const Stack = createNativeStackNavigator();

export default function DataConverterNavigator() {
	const [selectedLanguage, setSelectedLanguage] =
		useState<RoutesStringsProps>("DataConverterMain");

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				header: () => (
					<DataConverterHeader
						selectedLanguage={selectedLanguage}
						setSelectedLanguage={setSelectedLanguage}
					/>
				),
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen
				name="DataConverterMain"
				options={{ title: t("Principal") }}
				component={DataConverterPage}
			/>
			<Stack.Screen
				name="AsciiAndHex"
				options={{ title: t("Ascii e Hexadecimal") }}
				component={AsciiAndHexPage}
			/>
			<Stack.Screen
				name="HexAndDecimal"
				options={{ title: t("Hexadecimal e Decimal") }}
				component={HexAndDecimal}
			/>
		</Stack.Navigator>
	);
}
