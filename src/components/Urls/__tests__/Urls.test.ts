import { termsURL, privacyURL, buyMeACoffeeURL, repoGithubURL } from "..";

describe("Urls", () => {
	it("should have the correct terms URL", () => {
		expect(termsURL).toBe("https://2devs.tech/terms");
	});

	it("should have the correct privacy URL", () => {
		expect(privacyURL).toBe("https://2devs.tech/PrivacyPolicy");
	});

	it("should have the correct buy me a coffee URL", () => {
		expect(buyMeACoffeeURL).toBe("https://www.buymeacoffee.com/gabriellogan");
	});

	it("should have the correct GitHub repository URL", () => {
		expect(repoGithubURL).toBe("https://github.com/gabriel-logan/2Devs-Mobile");
	});
});
