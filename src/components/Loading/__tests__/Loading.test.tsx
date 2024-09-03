import { render, screen } from "@testing-library/react-native";

import Loading from "..";

describe("Loading Component", () => {
	it("should render correctly", () => {
		render(<Loading />);

		expect(screen.getByTestId(/loading-indicator/)).toBeTruthy();
	});
});
