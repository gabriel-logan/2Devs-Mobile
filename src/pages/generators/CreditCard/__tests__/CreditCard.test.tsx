import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen } from "@testing-library/react-native";

import CreditCardPage from "..";

describe("CreditCard Genarator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<CreditCardPage />);

		const title = screen.getByText(/Gerador de Cartão de Crédito/i);

		expect(title).toBeDefined();
	});

	it("should generate a random CreditCard without punctuation", async () => {
		render(<CreditCardPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		expect(input).toBeDefined();

		const button = screen.getByText("Gerar Cartão de crédito");

		expect(button).toBeDefined();

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{16}$/);
	});

	it("should change checkbox value", async () => {
		render(<CreditCardPage />);

		const checkbox = screen.getByRole("checkbox");

		fireEvent(checkbox, "onValueChange", true);

		expect(checkbox.props.accessibilityState.checked).toBe(true);

		fireEvent(checkbox, "onValueChange", false);

		expect(checkbox.props.accessibilityState.checked).toBe(false);
	});

	it("should generate a random CreditCard with punctuation", async () => {
		render(<CreditCardPage />);

		const input = screen.getByPlaceholderText("Clique no botão abaixo");

		const checkbox = screen.getByRole("checkbox");

		const button = screen.getByText("Gerar Cartão de crédito");

		fireEvent(checkbox, "onValueChange", true);

		fireEvent.press(button);

		expect(input.props.value).toMatch(/^\d{4} \d{4} \d{4} \d{4}$/);
	});

	it("should copy generated CreditCard to clipboard", async () => {
		render(<CreditCardPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		const button = screen.getByText("Gerar Cartão de crédito");

		fireEvent.press(button);

		fireEvent.press(buttonCopy);
	});

	it("should not copy if there is no generated CreditCard", async () => {
		render(<CreditCardPage />);

		const buttonCopy = screen.getByTestId("buttonCopy");

		fireEvent.press(buttonCopy);
	});

	it("should load checkbox value from AsyncStorage", async () => {
		(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("true");

		render(<CreditCardPage />);

		const checkbox = await screen.findByRole("checkbox");

		expect(checkbox.props.accessibilityState.checked).toBe(true);
	});
});
