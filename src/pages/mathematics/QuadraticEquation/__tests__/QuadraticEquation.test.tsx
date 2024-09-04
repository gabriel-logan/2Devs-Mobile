import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react-native";

import QuadraticEquationPage from "..";

describe("QuadraticEquation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<QuadraticEquationPage />);
	});

	describe("calculateQuadraticEquation", () => {
		it("should calculate the correct result", async () => {
			render(<QuadraticEquationPage />);

			const inputA = screen.getByPlaceholderText(
				"Termo que acompanha o x², ex: 5x²"
			);
			const inputB = screen.getByPlaceholderText(
				"Termo que acompanha o x, ex: 3x"
			);
			const inputC = screen.getByPlaceholderText("Termo independente, ex: -4");

			const button = screen.getByText("Calcular");

			fireEvent.changeText(inputA, "5");
			fireEvent.changeText(inputB, "3");
			fireEvent.changeText(inputC, "-4");

			fireEvent.press(button);

			const result = await screen.findByText(
				"Resultado: First root:0.6433981132056603 Second root:-1.2433981132056604"
			);

			expect(result).toBeDefined();
		});

		it("should calculate the correct result using approximation", async () => {
			render(<QuadraticEquationPage />);

			const inputA = screen.getByPlaceholderText(
				"Termo que acompanha o x², ex: 5x²"
			);
			const inputB = screen.getByPlaceholderText(
				"Termo que acompanha o x, ex: 3x"
			);
			const inputC = screen.getByPlaceholderText("Termo independente, ex: -4");

			const checkbox = screen.getByTestId("checkbox-aproximate");

			const button = screen.getByText("Calcular");

			fireEvent.changeText(inputA, "5");
			fireEvent.changeText(inputB, "3");
			fireEvent.changeText(inputC, "-4");

			fireEvent(checkbox, "onValueChange", true);

			await waitFor(() => {
				expect(checkbox.props.accessibilityState.checked).toBe(true);
			});

			fireEvent.press(button);

			const result = await screen.findByText(
				"Resultado: First root:0.64 Second root:-1.24"
			);

			expect(result).toBeDefined();
		});

		it("should calculate the correct result and clear the fields", async () => {
			render(<QuadraticEquationPage />);

			const inputA = screen.getByPlaceholderText(
				"Termo que acompanha o x², ex: 5x²"
			);
			const inputB = screen.getByPlaceholderText(
				"Termo que acompanha o x, ex: 3x"
			);
			const inputC = screen.getByPlaceholderText("Termo independente, ex: -4");

			const checkbox = screen.getByTestId("checkbox-deleteAfter");

			const button = screen.getByText("Calcular");

			fireEvent.changeText(inputA, "5");
			fireEvent.changeText(inputB, "3");
			fireEvent.changeText(inputC, "-4");

			fireEvent(checkbox, "onValueChange", true);

			await waitFor(() => {
				expect(checkbox.props.accessibilityState.checked).toBe(true);
			});

			fireEvent.press(button);

			const result = await screen.findByText(
				"Resultado: First root:0.6433981132056603 Second root:-1.2433981132056604"
			);

			expect(result).toBeDefined();

			expect(inputA.props.value).toBe("");
			expect(inputB.props.value).toBe("");
			expect(inputC.props.value).toBe("");
		});
	});
});
