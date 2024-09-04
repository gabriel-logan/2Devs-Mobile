import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import PrivacyPolicesAndTerms from "..";
import type { NavigationType } from "../../../types/navigationProps";

const mockNavigation = {
	navigate: jest.fn(),
	dispatch: jest.fn(),
	reset: jest.fn(),
	goBack: jest.fn(),
	isFocused: jest.fn(),
} as unknown as NavigationType;

describe("PrivacyPolicesAndTerms", () => {
	it("should render correctly", () => {
		render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);
	});

	describe("open links", () => {
		it("should open the terms link", () => {
			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const button = screen.getByText("Ler termos de uso");

			fireEvent.press(button);
		});

		it("should open the privacy link", () => {
			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const button = screen.getByText("Ler politicas de privacidade");

			fireEvent.press(button);
		});
	});

	describe("checkbox", () => {
		it("should apear activeSpan if checkbox is not checked", async () => {
			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const button = screen.getByText("Continuar");

			fireEvent.press(button);

			const textActiveSpan = await screen.findByText(
				"Para continuar você precisa aceitar os termos"
			);

			expect(textActiveSpan).toBeTruthy();
		});

		it("should not apear activeSpan if checkbox is checked", async () => {
			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const checkbox = screen.getByTestId("checkbox");

			fireEvent.press(checkbox);

			const button = screen.getByText("Continuar");

			fireEvent.press(button);

			const textActiveSpan = screen.queryByText(
				"Para continuar você precisa aceitar os termos"
			);

			await waitFor(() => {
				expect(textActiveSpan).toBeNull();
			});
		});

		it("should check the checkbox", () => {
			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const checkbox = screen.getByTestId("checkbox");

			fireEvent.press(checkbox);
		});
	});

	describe("error handling", () => {
		it("should show alert on AsyncStorage.setItem error", async () => {
			jest.spyOn(Alert, "alert");

			(AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
				new Error("AsyncStorage error")
			);

			render(<PrivacyPolicesAndTerms navigation={mockNavigation} />);

			const checkbox = screen.getByTestId("checkbox");

			fireEvent.press(checkbox);

			const button = screen.getByText("Continuar");

			fireEvent.press(button);

			await waitFor(() => {
				expect(Alert.alert).toHaveBeenCalledWith(
					"Alguma coisa errada aconteceu, contate o desenvolvedor"
				);
			});
		});
	});
});
