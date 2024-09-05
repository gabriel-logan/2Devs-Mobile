import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import QuadraticEquationPage from "..";

describe("QuadraticEquation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
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

		it("should setResult as Constante = numeroC if a = b = 0", async () => {
			render(<QuadraticEquationPage />);

			const inputA = screen.getByPlaceholderText(
				"Termo que acompanha o x², ex: 5x²"
			);
			const inputB = screen.getByPlaceholderText(
				"Termo que acompanha o x, ex: 3x"
			);
			const inputC = screen.getByPlaceholderText("Termo independente, ex: -4");

			const button = screen.getByText("Calcular");

			fireEvent.changeText(inputA, "0");
			fireEvent.changeText(inputB, "0");
			fireEvent.changeText(inputC, "5");

			fireEvent.press(button);

			const result = await screen.findByText("Resultado: Constante = 5");

			expect(result).toBeDefined();
		});

		it("should setResult as Não possui raízes reais if b²-4ac < 0", async () => {
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
			fireEvent.changeText(inputC, "4");

			fireEvent.press(button);

			const result = await screen.findByText(
				"Resultado: Não possui raizes reais"
			);

			expect(result).toBeDefined();
		});

		it("should set resultMessage as Possui apenas 1 raiz real + aproximaRaiz1 if raiz1 === raiz2", async () => {
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

			fireEvent.changeText(inputA, "1");
			fireEvent.changeText(inputB, "-6");
			fireEvent.changeText(inputC, "9");

			fireEvent(checkbox, "onValueChange", true);

			await waitFor(() => {
				expect(checkbox.props.accessibilityState.checked).toBe(true);
			});

			fireEvent.press(button);

			const result = await screen.findByText(
				"Resultado: Possui apenas 1 raiz real3.00"
			);

			expect(result).toBeDefined();
		});

		it("should Alert.alert if a, b, c are NaN", async () => {
			jest.spyOn(Alert, "alert");

			render(<QuadraticEquationPage />);

			const inputA = screen.getByPlaceholderText(
				"Termo que acompanha o x², ex: 5x²"
			);
			const inputB = screen.getByPlaceholderText(
				"Termo que acompanha o x, ex: 3x"
			);
			const inputC = screen.getByPlaceholderText("Termo independente, ex: -4");

			const button = screen.getByText("Calcular");

			fireEvent.changeText(inputA, "a");
			fireEvent.changeText(inputB, "1");
			fireEvent.changeText(inputC, "1");

			fireEvent.press(button);

			await waitFor(() => {
				expect(Alert.alert).toHaveBeenCalledWith(
					"Erro",
					"Digite valores válidos para a, b e c"
				);
			});
		});

		describe("textInputs", () => {
			test("onSubmitEditing should focus next input", () => {
				render(<QuadraticEquationPage />);

				const inputA = screen.getByPlaceholderText(
					"Termo que acompanha o x², ex: 5x²"
				);
				const inputB = screen.getByPlaceholderText(
					"Termo que acompanha o x, ex: 3x"
				);
				const inputC = screen.getByPlaceholderText(
					"Termo independente, ex: -4"
				);

				fireEvent(inputA, "onSubmitEditing");
				fireEvent(inputB, "onSubmitEditing");
				fireEvent(inputC, "onSubmitEditing");
			});
		});

		describe("useEffect", () => {
			it("should get value from AsyncStorage and set in aproxima", async () => {
				jest.spyOn(AsyncStorage, "getItem").mockResolvedValue("true");

				render(<QuadraticEquationPage />);

				const checkbox = screen.getByTestId("checkbox-aproximate");

				await waitFor(() => {
					expect(checkbox.props.accessibilityState.checked).toBe(true);
				});
			});

			it("should not get value from AsyncStorage if it's null", async () => {
				jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(null);

				render(<QuadraticEquationPage />);

				const checkbox = screen.getByTestId("checkbox-aproximate");

				await waitFor(() => {
					expect(checkbox.props.accessibilityState.checked).toBe(false);
				});
			});

			it("should get value from AsyncStorage and set in deleteAfter", async () => {
				jest.spyOn(AsyncStorage, "getItem").mockResolvedValue("true");

				render(<QuadraticEquationPage />);

				const checkbox = screen.getByTestId("checkbox-deleteAfter");

				await waitFor(() => {
					expect(checkbox.props.accessibilityState.checked).toBe(true);
				});
			});
		});
	});
});
