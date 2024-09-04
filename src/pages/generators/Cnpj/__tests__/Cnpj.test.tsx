import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CnpjGeneratorPage from "..";

describe("Cnpj Generator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<CnpjGeneratorPage />);

		const title = screen.getByText("Gerador de CNPJ");

		expect(title).toBeDefined();
	});

	it("should generate a random CNPJ without punctuation", async () => {
		render(<CnpjGeneratorPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		expect(input).toBeDefined();

		const button = screen.getByText("Gerar CNPJ");

		expect(button).toBeDefined();

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{14}$/);
	});

	it("should change checkbox value", async () => {
		render(<CnpjGeneratorPage />);

		const checkbox = screen.getByRole("checkbox");

		fireEvent(checkbox, "onValueChange", true);

		expect(checkbox.props.accessibilityState.checked).toBe(true);

		fireEvent(checkbox, "onValueChange", false);

		expect(checkbox.props.accessibilityState.checked).toBe(false);
	});

	it("should generate a random CNPJ with punctuation", async () => {
		render(<CnpjGeneratorPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		const checkbox = screen.getByRole("checkbox");

		const button = screen.getByText("Gerar CNPJ");

		fireEvent(checkbox, "onValueChange", true);

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
	});

	it("should copy generated CNPJ to clipboard", async () => {
		render(<CnpjGeneratorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		const button = screen.getByText("Gerar CNPJ");

		fireEvent.press(button);

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no generated CNPJ", async () => {
		render(<CnpjGeneratorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should load checkbox value from AsyncStorage", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("true");

		render(<CnpjGeneratorPage />);

		const checkbox = await screen.findByRole("checkbox");

		expect(checkbox.props.accessibilityState.checked).toBe(true);
	});
});
