import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CreditCardValidatorPage from "..";

describe("CreditCard Validator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should render correctly", () => {
		render(<CreditCardValidatorPage />);

		const title = screen.getByText(/Validador de Cartão de Crédito/i);

		const resultView = screen.queryByTestId("resultView");

		expect(resultView).toBeNull();

		expect(title).toBeDefined();
	});

	it("should validate a valid CREDIT CARD", async () => {
		render(<CreditCardValidatorPage />);

		const input = screen.getByPlaceholderText("5545 9874 2450 4172");

		const button = screen.getByText(/Validar Cartão de Crédito/i);

		fireEvent.changeText(input, "5545 9874 2450 4172");

		fireEvent.press(button);

		const resultView = await screen.findByText("Cartão de crédito Válido");

		expect(resultView).toBeDefined();
	});

	it("should invalidate an invalid CREDIT CARD", async () => {
		render(<CreditCardValidatorPage />);

		const input = screen.getByPlaceholderText("5545 9874 2450 4172");

		const button = screen.getByText(/Validar Cartão de crédito/i);

		fireEvent.changeText(input, "123.456.789-08");

		fireEvent.press(button);

		const resultView = await screen.findByText("Cartão de crédito Inválido");

		expect(resultView).toBeDefined();
	});

	it("should invalidate if input is empty", async () => {
		render(<CreditCardValidatorPage />);

		const button = screen.getByText(/Validar Cartão de crédito/i);

		fireEvent.press(button);

		const resultView = await screen.findByText("Cartão de crédito Inválido");

		expect(resultView).toBeDefined();
	});

	it("should paste a CREDIT CARD", async () => {
		jest.spyOn(Clipboard, "getString").mockResolvedValue("30.187.097/3277-49");

		render(<CreditCardValidatorPage />);

		const buttonPaste = screen.getByTestId("buttonPaste");

		fireEvent.press(buttonPaste);

		const input = await screen.findByDisplayValue("30.187.097/3277-49");

		expect(input).toBeDefined();
	});

	it("should copy a CREDIT CARD", async () => {
		render(<CreditCardValidatorPage />);

		const input = screen.getByPlaceholderText("5545 9874 2450 4172");

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no CREDIT CARD", async () => {
		render(<CreditCardValidatorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should clean a CREDIT CARD", async () => {
		render(<CreditCardValidatorPage />);

		const input = screen.getByPlaceholderText("5545 9874 2450 4172");

		const buttonClean = screen.getByTestId("buttonClean");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonClean);

		const emptyInput = await screen.findByDisplayValue("");

		expect(emptyInput).toBeDefined();
	});
});
