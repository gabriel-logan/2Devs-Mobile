import Clipboard from "@react-native-clipboard/clipboard";
import { fireEvent, render, screen } from "@testing-library/react-native";
import base64 from "react-native-base64";

import Base64Page from "..";

describe("Base64", () => {
	it("should render correctly", () => {
		render(<Base64Page />);

		const text = screen.getByText(/Apagar apos gerar ?/);

		expect(text).toBeTruthy();
	});

	describe("Checkbox", () => {
		it("should change the value of the checkbox cleanAfterGenerate", async () => {
			render(<Base64Page />);

			const checkbox = await screen.findByTestId("checkbox-cleanAfterGenerate");

			expect(checkbox.props.accessibilityState.checked).toBe(false);

			fireEvent(checkbox, "onValueChange", true);

			expect(checkbox.props.accessibilityState.checked).toBe(true);
		});

		it("should change the value of the checkbox considerSpace", async () => {
			render(<Base64Page />);

			const checkbox = await screen.findByTestId("checkbox-considerSpace");

			expect(checkbox.props.accessibilityState.checked).toBe(false);

			fireEvent(checkbox, "onValueChange", true);

			expect(checkbox.props.accessibilityState.checked).toBe(true);
		});
	});

	describe("TextInputs", () => {
		describe("TextInput to encode", () => {
			it("should change the value of the text input", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputText");

				expect(textInput.props.value).toBe("");

				fireEvent.changeText(textInput, "test");

				expect(textInput.props.value).toBe("test");
			});
		});

		describe("TextInput to decode", () => {
			it("should change the value of the text input", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputBase64");

				expect(textInput.props.value).toBe("");

				fireEvent.changeText(textInput, "test");

				expect(textInput.props.value).toBe("test");
			});
		});
	});

	describe("Buttons", () => {
		describe("Button to encode", () => {
			it("should encode the text", async () => {
				jest.spyOn(base64, "encode").mockImplementation(() => "VGVzdGU=");

				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputText");

				fireEvent.changeText(textInput, "test");

				const button = await screen.findByTestId("encode-buttonDispatch");

				fireEvent.press(button);

				const textInputBase64 = await screen.findByTestId("inputBase64");

				expect(textInputBase64.props.value).toBe("VGVzdGU=");
			});

			it("should paste the encoded text in the clipboard", async () => {
				const clipboardSpyOn = jest
					.spyOn(Clipboard, "getString")
					.mockResolvedValue("Teste");

				render(<Base64Page />);

				const button = await screen.findByTestId("encode-buttonPaste");

				fireEvent.press(button);

				const textInput = await screen.findByTestId("inputText");

				expect(clipboardSpyOn).toHaveBeenCalled();

				expect(textInput.props.value).toBe("Teste");
			});

			it("should copy the encoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputText");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("encode-buttonCopy");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("Teste");
			});

			it("should cut the encoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputText");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("encode-buttonCut");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("");
			});

			it("should clean the encoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputText");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("encode-buttonClean");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("");
			});
		});

		describe("Button to decode", () => {
			it("should decode the text", async () => {
				jest.spyOn(base64, "decode").mockImplementation(() => "test");

				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputBase64");

				fireEvent.changeText(textInput, "VGVzdGU=");

				const button = await screen.findByTestId("decode-buttonDispatch");

				fireEvent.press(button);

				const textInputText = await screen.findByTestId("inputText");

				expect(textInputText.props.value).toBe("test");
			});

			it("should paste the decoded text in the clipboard", async () => {
				const clipboardSpyOn = jest
					.spyOn(Clipboard, "getString")
					.mockResolvedValue("Teste");

				render(<Base64Page />);

				const button = await screen.findByTestId("decode-buttonPaste");

				fireEvent.press(button);

				const textInput = await screen.findByTestId("inputBase64");

				expect(clipboardSpyOn).toHaveBeenCalled();

				expect(textInput.props.value).toBe("Teste");
			});

			it("should copy the decoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputBase64");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("decode-buttonCopy");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("Teste");
			});

			it("should cut the decoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputBase64");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("decode-buttonCut");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("");
			});

			it("should clean the decoded text to the clipboard", async () => {
				render(<Base64Page />);

				const textInput = await screen.findByTestId("inputBase64");

				fireEvent.changeText(textInput, "Teste");

				const button = await screen.findByTestId("decode-buttonClean");

				fireEvent.press(button);

				expect(textInput.props.value).toBe("");
			});
		});
	});
});
