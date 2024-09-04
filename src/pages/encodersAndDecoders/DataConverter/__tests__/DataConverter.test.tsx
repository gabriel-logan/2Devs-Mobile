import { render, screen } from "@testing-library/react-native";

import DataConverterPage from "..";

describe("DataConverter", () => {
	it("should render correctly", () => {
		render(<DataConverterPage />);

		const text = screen.getByText(/Pagina para conversoes/i);

		expect(text).toBeTruthy();
	});
});
