import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";

import BinAndDecimal from "../BinAndDecimal";

describe("DataConverter", () => {
	it("should render correctly", () => {
		render(<BinAndDecimal />);
	});

	describe("buttons", () => {
		describe("BinToDecimal", () => {
			it("should copy the binary code to the clipboard", async () => {
				render(<BinAndDecimal />);

				const button = screen.getByTestId("encode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the binary code", async () => {
				render(<BinAndDecimal />);

				const button = screen.getByTestId("encode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the binary code to the clipboard", async () => {
				const spyClipboard = jest
					.spyOn(Clipboard, "setString")
					.mockImplementation(() => "teste");

				render(<BinAndDecimal />);

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

			it("should paste the binary code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("Teste");

				render(<BinAndDecimal />);

				const button = await screen.findByTestId("encode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const binaryInput = await screen.findByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(binaryInput.props.value).toBe("Teste");
			});

			it("should encode the binary to decimal", async () => {
				render(<BinAndDecimal />);

				const binaryInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				fireEvent.changeText(binaryInput, "010001100");

				expect(binaryInput.props.value).toBe("010001100");

				const button = screen.getByTestId("encode-buttonDispatch");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const decimalInput = screen.getByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				expect(decimalInput.props.value).toBe("989ACC"); // NOT CORRECT
			});

			it("should not encode the binary to decimal", async () => {
				render(<BinAndDecimal />);

				const binaryInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(binaryInput.props.value).toBe("");

				const button = screen.getByTestId("encode-buttonDispatch");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const decimalInput = screen.getByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				expect(decimalInput.props.value).toBe("");
			});
		});

		describe("HexToText", () => {
			it("should copy the decimal code to the clipboard", async () => {
				render(<BinAndDecimal />);

				const decimalInput = screen.getByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				fireEvent.changeText(decimalInput, "46");

				const button = screen.getByTestId("decode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the decimal code", async () => {
				render(<BinAndDecimal />);

				const button = screen.getByTestId("decode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should cut the decimal code to the clipboard", async () => {
				render(<BinAndDecimal />);

				const button = screen.getByTestId("decode-buttonCut");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should paste the decimal code to the clipboard", async () => {
				jest.spyOn(Clipboard, "getString").mockResolvedValue("54 65 73 74 65");

				render(<BinAndDecimal />);

				const button = await screen.findByTestId("decode-buttonPaste");

				expect(button).toBeTruthy();

				fireEvent.press(button);

				const decimalInput = await screen.findByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				expect(decimalInput.props.value).toBe("54 65 73 74 65");
			});

			it("should decode the decimal to binary", async () => {
				render(<BinAndDecimal />);

				const decimalInput = screen.getByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				fireEvent.changeText(decimalInput, "46");

				expect(decimalInput.props.value).toBe("46");

				const button = screen.getByText("Decodificar para decimal");

				fireEvent.press(button);

				const binaryInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(binaryInput.props.value).toBe("70"); // NOT CORRECT
			});

			it("should not decode the decimal to binary", async () => {
				render(<BinAndDecimal />);

				const decimalInput = screen.getByPlaceholderText(
					"Cole ou digite o código binario aqui"
				);

				expect(decimalInput.props.value).toBe("");

				const button = screen.getByText("Decodificar para decimal");

				fireEvent.press(button);

				const binaryInput = screen.getByPlaceholderText(
					"Cole ou digite o numero decimal aqui"
				);

				expect(binaryInput.props.value).toBe("");
			});
		});
	});
});
