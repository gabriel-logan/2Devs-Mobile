import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CnpjValidatorPage from "..";

describe("Cnpj Validator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should render correctly", () => {
		render(<CnpjValidatorPage />);

		const title = screen.getByText("Validador de CNPJ");

		const resultView = screen.queryByTestId("resultView");

		expect(resultView).toBeNull();

		expect(title).toBeDefined();
	});

	it("should validate a valid CNPJ", async () => {
		render(<CnpjValidatorPage />);

		const input = screen.getByPlaceholderText("48.955.245/0001-01");

		const button = screen.getByText("Validar CNPJ");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(button);

		const resultView = await screen.findByText("CNPJ Válido");

		expect(resultView).toBeDefined();
	});

	it("should invalidate an invalid CNPJ", async () => {
		render(<CnpjValidatorPage />);

		const input = screen.getByPlaceholderText("48.955.245/0001-01");

		const button = screen.getByText("Validar CNPJ");

		fireEvent.changeText(input, "48.955.245/0001-01");

		fireEvent.press(button);

		const resultView = await screen.findByText("CNPJ Inválido");

		expect(resultView).toBeDefined();
	});

	it("should paste a CNPJ", async () => {
		jest.spyOn(Clipboard, "getString").mockResolvedValue("30.187.097/3277-49");

		render(<CnpjValidatorPage />);

		const buttonPaste = screen.getByTestId("buttonPaste");

		fireEvent.press(buttonPaste);

		const input = await screen.findByDisplayValue("30.187.097/3277-49");

		expect(input).toBeDefined();
	});

	it("should copy a CNPJ", async () => {
		render(<CnpjValidatorPage />);

		const input = screen.getByPlaceholderText("48.955.245/0001-01");

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no CNPJ", async () => {
		render(<CnpjValidatorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should clean a CNPJ", async () => {
		render(<CnpjValidatorPage />);

		const input = screen.getByPlaceholderText("48.955.245/0001-01");

		const buttonClean = screen.getByTestId("buttonClean");

		fireEvent.changeText(input, "30.187.097/3277-49");

		fireEvent.press(buttonClean);

		const emptyInput = await screen.findByDisplayValue("");

		expect(emptyInput).toBeDefined();
	});
});
