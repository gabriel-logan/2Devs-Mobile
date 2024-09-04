import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import ThemeProvider from "../../components/ThemeContext";
import type { NavigationType } from "../../types/navigationProps";
import Main from "../Main";

const navigation = {
	navigate: jest.fn(),
	dispatch: jest.fn(),
	reset: jest.fn(),
	goBack: jest.fn(),
	isFocused: jest.fn(),
} as unknown as NavigationType;

describe("Main Page", () => {
	it("should render the main page", async () => {
		render(<Main navigation={navigation} />);

		const title = await screen.findByText(/Bem-vindo ao 2Devs/i);

		expect(title).toBeDefined();
	});

	describe("External Links", () => {
		it("should open rate play store link", async () => {
			render(<Main navigation={navigation} />);

			const rateButton = await screen.findByText("Avalie o aplicativo");

			fireEvent.press(rateButton);
		});
	});

	describe("Change Language Modal", () => {
		it("should render the change language modal", async () => {
			render(<Main navigation={navigation} />);

			const changeLangModal = await screen.findByText("Alterar idioma");

			expect(changeLangModal).toBeDefined();

			fireEvent.press(changeLangModal);
		});
	});

	describe("Change Theme Switches", () => {
		it("should render the theme switches", async () => {
			render(<Main navigation={navigation} />);

			const themeSwitch = await screen.findByTestId("theme-switch");

			expect(themeSwitch).toBeDefined();
		});

		it("should change the theme when the switch is toggled", async () => {
			render(
				<ThemeProvider>
					<Main navigation={navigation} />
				</ThemeProvider>
			);

			const switches = await screen.findAllByRole("switch");

			const lightSwitch = switches[0];
			const darkSwitch = switches[1];
			const systemSwitch = switches[2];

			expect(lightSwitch).toBeDefined();
			expect(darkSwitch).toBeDefined();
			expect(systemSwitch).toBeDefined();

			expect(lightSwitch.props.value).toBe(true);

			fireEvent(darkSwitch, "onValueChange", true);

			await waitFor(() => {
				expect(darkSwitch.props.value).toBe(true);
			});

			await waitFor(() => {
				expect(lightSwitch.props.value).toBe(false);
			});

			await waitFor(() => {
				expect(systemSwitch.props.value).toBe(false);
			});

			fireEvent(systemSwitch, "onValueChange", true);

			await waitFor(() => {
				expect(systemSwitch.props.value).toBe(true);
			});

			await waitFor(() => {
				expect(lightSwitch.props.value).toBe(false);
			});

			await waitFor(() => {
				expect(darkSwitch.props.value).toBe(false);
			});

			fireEvent(lightSwitch, "onValueChange", true);

			await waitFor(() => {
				expect(lightSwitch.props.value).toBe(true);
			});

			await waitFor(() => {
				expect(darkSwitch.props.value).toBe(false);
			});

			await waitFor(() => {
				expect(systemSwitch.props.value).toBe(false);
			});
		});
	});

	describe("useEffect", () => {
		describe("Verify Terms Acceptance", () => {
			it("should navigate to Initial if terms were not accepted", async () => {
				(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
					'{"key": "value",}'
				);

				render(<Main navigation={navigation} />);

				await waitFor(() => {
					expect(navigation.reset).toHaveBeenCalledWith({
						index: 0,
						routes: [{ name: "Initial" }],
					});
				});
			});

			it("should show an alert if AsyncStorage.getItem throws an error", async () => {
				jest.spyOn(Alert, "alert");

				(AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
					new Error("AsyncStorage error")
				);

				render(<Main navigation={navigation} />);

				await waitFor(() => {
					expect(Alert.alert).toHaveBeenCalledWith(
						"Alguma coisa errada aconteceu, contate o desenvolvedor"
					);
				});
			});
		});
	});
});
