import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import axios from "axios";

import MyNetwork from "..";

describe("MyNetwork", () => {
	it("should render correctly", async () => {
		jest
			.spyOn(axios, "get")
			.mockResolvedValue({ data: { ip: "201.8.168.176" } });

		render(
			<NavigationContainer>
				<MyNetwork />
			</NavigationContainer>
		);

		const title = await screen.findByText(/Informações de Rede/i);

		expect(title).toBeDefined();
	});

	it("should copy especific text to clipboard", async () => {
		render(
			<NavigationContainer>
				<MyNetwork />
			</NavigationContainer>
		);

		const buttons = await screen.findAllByLabelText(/buttonCopy/i);

		expect(buttons).toHaveLength(4);

		buttons.forEach((button) => {
			fireEvent.press(button);
		});
	});

	it("should show error message when get external ip fails", async () => {
		jest.spyOn(axios, "get").mockResolvedValue({ data: undefined });

		render(
			<NavigationContainer>
				<MyNetwork />
			</NavigationContainer>
		);

		const error = await screen.findByText(
			/Houve um problema não identificado na solicitação, tente novamente mais tarde/i
		);

		expect(error).toBeDefined();
	});

	it("should console.error when get external ip fails", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		jest.spyOn(axios, "get").mockRejectedValue(new Error("error"));

		render(
			<NavigationContainer>
				<MyNetwork />
			</NavigationContainer>
		);

		await new Promise((resolve) => setTimeout(resolve, 10));

		consoleErrorSpy.mockRestore();
	});
});
