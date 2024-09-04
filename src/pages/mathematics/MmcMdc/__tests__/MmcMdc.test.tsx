import { fireEvent, render, screen } from "@testing-library/react-native";
import { Alert } from "react-native";

import MmcMdcPage from "..";

describe("MmcMdc", () => {
	it("should render correctly", () => {
		render(<MmcMdcPage />);
	});

	it("should calculate the correct result", async () => {
		render(<MmcMdcPage />);

		const input = screen.getByPlaceholderText("Ex. 4, 8, 12");

		const button = screen.getByText("Calcular");

		fireEvent.changeText(input, "4, 8, 12");

		fireEvent.press(button);

		const resultMmc = await screen.findByText("Mmc entre 4, 8, 12 = 24");
		const resultMdc = await screen.findByText("Mdc entre 4, 8, 12 = 4");

		expect(resultMmc).toBeDefined();

		expect(resultMdc).toBeDefined();
	});

	it("should Alert.alert error message for invalid input", async () => {
		jest.spyOn(Alert, "alert");

		render(<MmcMdcPage />);

		const input = screen.getByPlaceholderText("Ex. 4, 8, 12");

		const button = screen.getByText("Calcular");

		fireEvent.changeText(input, "ads15");

		fireEvent.press(button);

		expect(Alert.alert).toHaveBeenCalledWith(
			"Erro",
			"Digite valores numéricos separados por vírgulas"
		);
	});

	it("should Alert.alert error message for empty input", async () => {
		jest.spyOn(Alert, "alert");

		render(<MmcMdcPage />);

		const button = screen.getByText("Calcular");

		fireEvent.press(button);

		expect(Alert.alert).toHaveBeenCalledWith(
			"Erro",
			"Digite valores numéricos separados por vírgulas"
		);
	});
});
