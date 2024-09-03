import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	render,
	fireEvent,
	screen,
	waitFor,
} from "@testing-library/react-native";
import { Text, TouchableOpacity } from "react-native";

import ThemeProvider, { useTheme } from "..";

describe("ThemeContext", () => {
	describe("ThemeProvider", () => {
		test("renders children correctly", () => {
			render(
				<ThemeProvider>
					<Text>Test</Text>
				</ThemeProvider>
			);

			expect(screen.getByText("Test")).toBeDefined();
		});

		test("toggles theme correctly", () => {
			const TestComponent = () => {
				const { theme, toggleTheme } = useTheme();

				return (
					<TouchableOpacity
						onPress={() => toggleTheme(theme === "light" ? "dark" : "light")}
					>
						<Text>{theme}</Text>
					</TouchableOpacity>
				);
			};

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			const toggleButton = screen.getByText("light");

			fireEvent.press(toggleButton);

			expect(screen.getByText("dark")).toBeDefined();
		});

		describe("useEffect", () => {
			test("themeSelected from AsyncStorage is system", async () => {
				const valueStoraged = "system";

				(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
					valueStoraged
				);

				render(
					<ThemeProvider>
						<Text>Test</Text>
					</ThemeProvider>
				);

				await waitFor(() => {
					expect(screen.getByText("Test")).toBeDefined();
				});
			});

			test("themeSelected from AsyncStorage is not system", async () => {
				const valueStoraged = "dark";

				(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
					valueStoraged
				);

				render(
					<ThemeProvider>
						<Text>Test</Text>
					</ThemeProvider>
				);

				await waitFor(() => {
					expect(screen.getByText("Test")).toBeDefined();
				});
			});

			test("error on AsyncStorage.getItem", async () => {
				(AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
					new Error("AsyncStorage error")
				);

				render(
					<ThemeProvider>
						<Text>Test</Text>
					</ThemeProvider>
				);

				await waitFor(() => {
					expect(screen.getByText("Test")).toBeDefined();
				});
			});
		});
	});

	describe("useTheme", () => {
		test("returns theme and toggleTheme function", () => {
			const TestComponent = () => {
				const { theme, toggleTheme } = useTheme();

				return (
					<TouchableOpacity
						onPress={() => toggleTheme(theme === "light" ? "dark" : "light")}
					>
						<Text>{theme}</Text>
					</TouchableOpacity>
				);
			};

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			const toggleButton = screen.getByText("light");

			fireEvent.press(toggleButton);

			expect(screen.getByText("dark")).toBeDefined();
		});
	});
});
