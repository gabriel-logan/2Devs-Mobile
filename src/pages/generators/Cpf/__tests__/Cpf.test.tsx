import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CpfGeneratorPage from "..";

describe("Cpf Generator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<CpfGeneratorPage />);

		const title = screen.getByText("Gerador de CPF");

		expect(title).toBeDefined();
	});

	it("should generate a random CPF without punctuation", async () => {
		render(<CpfGeneratorPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		expect(input).toBeDefined();

		const button = screen.getByText("Gerar CPF");

		expect(button).toBeDefined();

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{11}$/);
	});

	it("should change checkbox value", async () => {
		render(<CpfGeneratorPage />);

		const checkbox = screen.getByRole("checkbox");

		fireEvent(checkbox, "onValueChange", true);

		expect(checkbox.props.accessibilityState.checked).toBe(true);

		fireEvent(checkbox, "onValueChange", false);

		expect(checkbox.props.accessibilityState.checked).toBe(false);
	});

	it("should generate a random CPF with punctuation", async () => {
		render(<CpfGeneratorPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		const checkbox = screen.getByRole("checkbox");

		const button = screen.getByText("Gerar CPF");

		fireEvent(checkbox, "onValueChange", true);

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
	});

	it("should copy generated CPF to clipboard", async () => {
		render(<CpfGeneratorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		const button = screen.getByText("Gerar CPF");

		fireEvent.press(button);

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no generated CPF", async () => {
		render(<CpfGeneratorPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should load checkbox value from AsyncStorage", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("true");

		render(<CpfGeneratorPage />);

		const checkbox = await screen.findByRole("checkbox");

		expect(checkbox.props.accessibilityState.checked).toBe(true);
	});
});
