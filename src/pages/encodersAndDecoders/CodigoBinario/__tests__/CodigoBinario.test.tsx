import { fireEvent, render, screen } from "@testing-library/react-native";

import BinaryCodePage from "..";

describe("BinaryCode", () => {
	it("should render correctly", () => {
		render(<BinaryCodePage />);
		const text = screen.getByText(/Codificar para Binário/);

		expect(text).toBeTruthy();
	});

	describe("buttons", () => {
		describe("TextToBinary", () => {
			it("should copy the text code to the clipboard", async () => {
				render(<BinaryCodePage />);

				const button = screen.getByTestId("encode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the text code", async () => {
				render(<BinaryCodePage />);

				const button = screen.getByTestId("encode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should encode the text to binary", async () => {
				render(<BinaryCodePage />);

				const textInput = screen.getByPlaceholderText("Digite o texto aqui");

				fireEvent.changeText(textInput, "Teste");

				expect(textInput.props.value).toBe("Teste");

				const button = screen.getByText("Codificar para Binário");

				fireEvent.press(button);

				const binaryInput = screen.getByPlaceholderText(
					"O código binário será exibido aqui"
				);

				expect(binaryInput.props.value).toBe(
					"01010100 01100101 01110011 01110100 01100101 "
				);
			});
		});

		describe("BinaryToText", () => {
			it("should copy the binary code to the clipboard", async () => {
				render(<BinaryCodePage />);

				const binaryInput = screen.getByPlaceholderText(
					"O código binário será exibido aqui"
				);

				fireEvent.changeText(
					binaryInput,
					"01010100 01100101 01110011 01110100 01100101"
				);

				const button = screen.getByTestId("decode-buttonCopy");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should clean the binary code", async () => {
				render(<BinaryCodePage />);

				const button = screen.getByTestId("decode-buttonClean");

				fireEvent.press(button);

				expect(button).toBeTruthy();
			});

			it("should decode the binary to text", async () => {
				render(<BinaryCodePage />);

				const binaryInput = screen.getByPlaceholderText(
					"O código binário será exibido aqui"
				);

				fireEvent.changeText(
					binaryInput,
					"01010100 01100101 01110011 01110100 01100101"
				);

				expect(binaryInput.props.value).toBe(
					"01010100 01100101 01110011 01110100 01100101"
				);

				const button = screen.getByText("Decodificar para Texto");

				fireEvent.press(button);

				const textInput = screen.getByPlaceholderText("Digite o texto aqui");

				expect(textInput.props.value).toBe("Teste");
			});
		});
	});
});
