import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";

import DataConverterNavigator from "../DataConverterNavigator";

describe("DataConverterNavigator", () => {
	it("should render correctly", async () => {
		render(
			<NavigationContainer>
				<DataConverterNavigator />
			</NavigationContainer>
		);

		const picker = screen.getByTestId("picker");

		// Simulate changing the value of the Picker
		fireEvent(picker, "onValueChange", "AsciiAndHex");

		// Add your assertions here to check if the navigation and state update occurred
		// For example, you can check if the navigation.navigate was called with the correct argument
		// and if the selectedLanguage state was updated correctly.	});
	});
});
