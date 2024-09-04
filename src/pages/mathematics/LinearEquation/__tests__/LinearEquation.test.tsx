import { fireEvent, render, screen } from "@testing-library/react-native";

import LinearEquationPage from "..";

describe("Linear Equation", () => {
	it("should render correctly", () => {
		render(<LinearEquationPage />);
	});

	it("should calculate the correct result", async () => {
		render(<LinearEquationPage />);

		const input = screen.getByPlaceholderText("ax + b = c");

		const button = screen.getByText("Calcular");

		fireEvent.changeText(input, "2x + 3 = 7");

		fireEvent.press(button);

		const result = await screen.findByText("O valor de x é: 2");

		expect(result).toBeDefined();
	});

	it("should show error message for invalid equation", async () => {
		render(<LinearEquationPage />);

		const input = screen.getByPlaceholderText("ax + b = c");

		const button = screen.getByText("Calcular");

		fireEvent.changeText(input, "2x + 3 = 7 = 8");

		fireEvent.press(button);

		const result = await screen.findByText("Equação inválida. Use o formato");

		expect(result).toBeDefined();
	});

	it("should show error message for a = 0", async () => {
		render(<LinearEquationPage />);

		const input = screen.getByPlaceholderText("ax + b = c");

		const button = screen.getByText("Calcular");

		fireEvent.changeText(input, "0x + 3 = 7");

		fireEvent.press(button);

		const result = await screen.findByText("a não pode ser zero.");

		expect(result).toBeDefined();
	});
});
