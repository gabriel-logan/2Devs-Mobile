import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import AsciiAndHexPage from "../AsciiAndHex";

describe("DataConverter", () => {
	it("should render correctly", () => {
		render(<AsciiAndHexPage />);

		const text = screen.getByText(/Codificar para Hex/i);

		expect(text).toBeTruthy();
	});

	describe("buttons", () => {
		describe("TextToHex", () => {
			it("should copy the text code to the clipboard", async () => {
				render(<AsciiAndHexPage />);

				const button = screen.getByTestId("encode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the text code", async () => {
				render(<AsciiAndHexPage />);

				const button = screen.getByTestId("encode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the text code to the clipboard", async () => {
				const spyClipboard = jest
					.spyOn(Clipboard, "setString")
					.mockImplementation(() => "teste");

				render(<AsciiAndHexPage />);

				const inputText = screen.getByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				fireEvent.changeText(inputText, "Teste");

				expect(inputText.props.value).toBe("Teste");

				const button = screen.getByTestId("encode-buttonCut");

				fireEvent.press(button);

				expect(button).toBeTruthy();

				expect(spyClipboard).toHaveBeenCalled();

				expect(inputText.props.value).toBe("");
			});

			it("should paste the text code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("Teste");

				render(<AsciiAndHexPage />);

				const button = await screen.findByTestId("encode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const textInput = await screen.findByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				expect(textInput.props.value).toBe("Teste");
			});

			it("should encode the text to hex", async () => {
				render(<AsciiAndHexPage />);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				fireEvent.changeText(textInput, "Teste");

				expect(textInput.props.value).toBe("Teste");

				const button = screen.getByTestId("encode-buttonDispatch");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("54 65 73 74 65");
			});

			it("should not encode the text to hex", async () => {
				render(<AsciiAndHexPage />);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				expect(textInput.props.value).toBe("");

				const button = screen.getByTestId("encode-buttonDispatch");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("");
			});
		});

		describe("HexToText", () => {
			it("should copy the hex code to the clipboard", async () => {
				render(<AsciiAndHexPage />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				fireEvent.changeText(hexInput, "54 65 73 74 65");

				const button = screen.getByTestId("decode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the hex code", async () => {
				render(<AsciiAndHexPage />);

				const button = screen.getByTestId("decode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the hex code to the clipboard", async () => {
				render(<AsciiAndHexPage />);

				const button = screen.getByTestId("decode-buttonCut");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should paste the hex code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("54 65 73 74 65");

				render(<AsciiAndHexPage />);

				const button = await screen.findByTestId("decode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = await screen.findByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("54 65 73 74 65");
			});

			it("should decode the hex to text", async () => {
				render(<AsciiAndHexPage />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				fireEvent.changeText(hexInput, "54 65 73 74 65");

				expect(hexInput.props.value).toBe("54 65 73 74 65");

				const button = screen.getByText("Decodificar para Texto");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				expect(textInput.props.value).toBe("Teste");
			});

			it("should not decode the hex to text", async () => {
				render(<AsciiAndHexPage />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("");

				const button = screen.getByText("Decodificar para Texto");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o texto aqui"
				);

				expect(textInput.props.value).toBe("");
			});
		});
	});
});
