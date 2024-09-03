import { ActivityIndicator, StyleSheet } from "react-native";

import { useTheme } from "../ThemeContext";

export default function Loading(): JSX.Element {
	const { theme } = useTheme();

	const backgroundColor = theme === "dark" ? "black" : "white";

	return (
		<ActivityIndicator
			testID="loading-indicator"
			style={[styles.indicator, { backgroundColor }]}
			size={64}
			color="#74b9ff"
		/>
	);
}

const styles = StyleSheet.create({
	indicator: {
		position: "absolute",
		height: "100%",
		width: "100%",
	},
});
