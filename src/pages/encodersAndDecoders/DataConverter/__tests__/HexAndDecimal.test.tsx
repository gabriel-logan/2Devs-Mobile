import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Alert } from "react-native";

import HexAndDecimal from "../HexAndDecimal";

describe("DataConverter", () => {
	it("should render correctly", () => {
		render(<HexAndDecimal />);

		const decimal = screen.getByText(/Codificar para Hex/i);

		expect(decimal).toBeTruthy();
	});

	describe("buttons", () => {
		describe("TextToHex", () => {
			it("should copy the decimal code to the clipboard", async () => {
				render(<HexAndDecimal />);

				const button = screen.getByTestId("encode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the decimal code", async () => {
				render(<HexAndDecimal />);

				const button = screen.getByTestId("encode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the decimal code to the clipboard", async () => {
				const spyClipboard = jest
					.spyOn(Clipboard, "setString")
					.mockImplementation(() => "teste");

				render(<HexAndDecimal />);

				const inputText = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				fireEvent.changeText(inputText, "Teste");

				expect(inputText.props.value).toBe("Teste");

				const button = screen.getByTestId("encode-buttonCut");

				fireEvent.press(button);

				expect(button).toBeTruthy();

				expect(spyClipboard).toHaveBeenCalled();

				expect(inputText.props.value).toBe("");
			});

			it("should paste the decimal code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("Teste");

				render(<HexAndDecimal />);

				const button = await screen.findByTestId("encode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const textInput = await screen.findByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(textInput.props.value).toBe("Teste");
			});

			it("should encode the decimal to hex", async () => {
				render(<HexAndDecimal />);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				fireEvent.changeText(textInput, "123");

				expect(textInput.props.value).toBe("123");

				const button = screen.getByText("Codificar para Hex");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("7B");
			});

			it("should not encode the decimal to hex", async () => {
				render(<HexAndDecimal />);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(textInput.props.value).toBe("");

				const button = screen.getByText("Codificar para Hex");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("");
			});

			it("should not encode and Alert.alert when decimalTextNumber is not a number", async () => {
				const spyAlert = jest.spyOn(Alert, "alert");

				render(<HexAndDecimal />);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				fireEvent.changeText(textInput, "Teste");

				expect(textInput.props.value).toBe("Teste");

				const button = screen.getByText("Codificar para Hex");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("");

				expect(spyAlert).toHaveBeenCalled();

				expect(spyAlert).toHaveBeenCalledWith("Erro", "Digite apenas numeros");
			});
		});

		describe("HexToText", () => {
			it("should copy the hex code to the clipboard", async () => {
				render(<HexAndDecimal />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				fireEvent.changeText(hexInput, "54 65 73 74 65");

				const button = screen.getByTestId("decode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the hex code", async () => {
				render(<HexAndDecimal />);

				const button = screen.getByTestId("decode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the hex code to the clipboard", async () => {
				render(<HexAndDecimal />);

				const button = screen.getByTestId("decode-buttonCut");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should paste the hex code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("54 65 73 74 65");

				render(<HexAndDecimal />);

				const button = await screen.findByTestId("decode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const hexInput = await screen.findByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("54 65 73 74 65");
			});

			it("should decode the hex to decimal", async () => {
				render(<HexAndDecimal />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				fireEvent.changeText(hexInput, "7B");

				expect(hexInput.props.value).toBe("7B");

				const button = screen.getByText("Decodificar para decimal");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(textInput.props.value).toBe("123");
			});

			it("should not decode the hex to decimal", async () => {
				render(<HexAndDecimal />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				expect(hexInput.props.value).toBe("");

				const button = screen.getByText("Decodificar para decimal");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(textInput.props.value).toBe("");
			});

			it("should not decode and Alert.alert when !/^[0-9A-Fa-f]+$/.test(cleanedHex) is true", async () => {
				const spyAlert = jest.spyOn(Alert, "alert");

				render(<HexAndDecimal />);

				const hexInput = screen.getByPlaceholderText(
					"Cole ou digite o código Hex aqui"
				);

				fireEvent.changeText(hexInput, "7B??7B");

				expect(hexInput.props.value).toBe("7B??7B");

				const button = screen.getByText("Decodificar para decimal");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(textInput.props.value).toBe("");

				expect(spyAlert).toHaveBeenCalled();

				expect(spyAlert).toHaveBeenCalledWith(
					"Erro",
					"O valor de entrada não é valido"
				);
			});
		});
	});
});
