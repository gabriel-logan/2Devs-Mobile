import { fireEvent, render, screen } from "@testing-library/react-native";

import GeneralInfoPage from "..";

describe("Informations", () => {
	it("should render correctly", () => {
		render(<GeneralInfoPage />);

		const title = screen.getByText(/Informações Gerais/i);

		expect(title).toBeDefined();
	});

	it("should show contributors", () => {
		render(<GeneralInfoPage />);

		const contributors = screen.getByText(/Contribuidores/i);

		expect(contributors).toBeDefined();
	});

	describe("Links buttons", () => {
		it("should show and open github link", () => {
			render(<GeneralInfoPage />);

			const githubButton = screen.getByText(/Ir para o repositório github/i);

			expect(githubButton).toBeDefined();

			fireEvent.press(githubButton);
		});

		it("should show and open buy me a coffee link", () => {
			render(<GeneralInfoPage />);

			const coffeeButton = screen.getByText(/Buy me a coffee/i);

			expect(coffeeButton).toBeDefined();

			fireEvent.press(coffeeButton);
		});

		it("should show and open Privacy Policy link", () => {
			render(<GeneralInfoPage />);

			const privacyPolicyButton = screen.getByText(/Políticas de Privacidade/i);

			expect(privacyPolicyButton).toBeDefined();

			fireEvent.press(privacyPolicyButton);
		});

		it("should show and open Terms of Use link", () => {
			render(<GeneralInfoPage />);

			const termsButton = screen.getByText(/Termos de Uso/i);

			expect(termsButton).toBeDefined();

			fireEvent.press(termsButton);
		});
	});
});
