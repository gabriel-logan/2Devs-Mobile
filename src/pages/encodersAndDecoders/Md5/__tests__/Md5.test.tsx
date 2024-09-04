import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import Md5Page from "..";

describe("Md5", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<Md5Page />);

		const md5Text = screen.getByText(/MD5 HASH:/i);

		expect(md5Text).toBeTruthy();
	});

	it("should change checkbox value", () => {
		render(<Md5Page />);

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toBeTruthy();

		expect(checkbox.props.accessibilityState.checked).toBe(false);

		fireEvent(checkbox, "onValueChange", true);

		expect(checkbox.props.accessibilityState.checked).toBe(true);

		fireEvent(checkbox, "onValueChange", false);

		expect(checkbox.props.accessibilityState.checked).toBe(false);
	});

	it("should change the value of the text input", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		expect(textInput).toBeTruthy();

		expect(textInput.props.value).toBe("");

		fireEvent.changeText(textInput, "test");

		expect(textInput.props.value).toBe("test");
	});

	it("should copy the md5 hash to the clipboard", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		fireEvent.changeText(textInput, "test");

		const button = await screen.findByText(/Codificar para Md5/i);

		fireEvent.press(button);

		const copyButton = await screen.findByTestId("buttonCopy");

		fireEvent.press(copyButton);
	});

	it("should cut the md5 hash to the clipboard", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		fireEvent.changeText(textInput, "test");

		const button = await screen.findByText(/Codificar para Md5/i);

		fireEvent.press(button);

		const cutButton = await screen.findByTestId("buttonCut");

		fireEvent.press(cutButton);
	});

	it("should clean the md5 hash to the clipboard", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		fireEvent.changeText(textInput, "test");

		const button = await screen.findByText(/Codificar para Md5/i);

		fireEvent.press(button);

		const cleanButton = await screen.findByTestId("buttonClean");

		fireEvent.press(cleanButton);
	});

	it("should paste the clipboard value to the text input", async () => {
		jest.spyOn(Clipboard, "getString").mockResolvedValue("test");

		render(<Md5Page />);

		const pasteButton = await screen.findByTestId("buttonPaste");

		fireEvent.press(pasteButton);

		const textInput = await screen.findByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		expect(textInput.props.value).toBe("test");

		jest.clearAllMocks();
	});

	it("should encode the text to md5", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		fireEvent.changeText(textInput, "test");

		const button = await screen.findByText(/Codificar para Md5/i);

		fireEvent.press(button);

		const md5Text = await screen.findByText(
			/098f6bcd4621d373cade4e832627b4f6/i
		);

		expect(md5Text).toBeTruthy();
	});

	it("should clean the text input always after generate", async () => {
		render(<Md5Page />);

		const textInput = screen.getByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		fireEvent.changeText(textInput, "test");

		const checkbox = screen.getByRole("checkbox");

		fireEvent(checkbox, "onValueChange", true);

		const button = await screen.findByText(/Codificar para Md5/i);

		fireEvent.press(button);

		const newTextInput = await screen.findByPlaceholderText(
			"Cole ou digite o texto aqui"
		);

		expect(newTextInput.props.value).toBe("");
	});

	it("should set the value of the checkbox from AsyncStorage", async () => {
		jest.spyOn(AsyncStorage, "getItem").mockResolvedValue("true");

		render(<Md5Page />);

		const checkbox = await screen.findByRole("checkbox");

		expect(checkbox.props.accessibilityState.checked).toBe(true);

		jest.clearAllMocks();
	});
});
