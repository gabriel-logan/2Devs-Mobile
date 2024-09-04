import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CpfValidatorPage from "..";

describe("Cpf Validator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should render correctly", () => {
		render(<CpfValidatorPage />);

		const title = screen.getByText("Validador de CPF");

		const resultView = screen.queryByTestId("resultView");

		expect(resultView).toBeNull();

		expect(title).toBeDefined();
	});

	it("should validate a valid CPF", async () => {
		render(<CpfValidatorPage />);

		const input = screen.getByPlaceholderText("123.456.789-09");

		const button = screen.getByText("Validar CPF");

		fireEvent.changeText(input, "123.456.789-09");

		fireEvent.press(button);

		const resultView = await screen.findByText("CPF Válido");

		expect(resultView).toBeDefined();
	});

	it("should invalidate an invalid CPF", async () => {
		render(<CpfValidatorPage />);

		const input = screen.getByPlaceholderText("123.456.789-09");

		const button = screen.getByText("Validar CPF");

		fireEvent.changeText(input, "123.456.789-08");

		fireEvent.press(button);

		const resultView = await screen.findByText("CPF Inválido");

		expect(resultView).toBeDefined();
	});

	it("should paste a CPF", async () => {
		jest.spyOn(Clipboard, "getString").mockResolvedValue("30.187.097/3277-49");

		render(<CpfValidatorPage />);

		const buttonPaste = screen.getByTestId("buttonPaste");

		fireEvent.press(buttonPaste);

		const input = await screen.findByDisplayValue("30.187.097/3277-49");

		expect(input).toBeDefined();
	});

	it("should copy a CPF", async () => {
		render(<CpfValidatorPage />);

		const input = screen.getByPlaceholderText("123.456.789-09");

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no CPF", async () => {
		render(<CpfValidatorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should clean a CPF", async () => {
		render(<CpfValidatorPage />);

		const input = screen.getByPlaceholderText("123.456.789-09");

		const buttonClean = screen.getByTestId("buttonClean");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonClean);

		const emptyInput = await screen.findByDisplayValue("");

		expect(emptyInput).toBeDefined();
	});
});
