import { render, screen } from "@testing-library/react-native";

import Loading from "..";
import { useTheme } from "../../ThemeContext";

jest.mock("../../ThemeContext", () => ({
	useTheme: jest.fn(),
}));

describe("Loading Component", () => {
	it("should render correctly", () => {
		(useTheme as jest.Mock).mockReturnValue({ theme: "light" });
		render(<Loading />);
		expect(screen.getByTestId("loading-indicator")).toBeTruthy();
	});

	it("should render using dark theme", () => {
		(useTheme as jest.Mock).mockReturnValue({ theme: "dark" });
		render(<Loading />);
		expect(screen.getByTestId("loading-indicator").props.style).toContainEqual({
			backgroundColor: "black",
		});
	});
});
