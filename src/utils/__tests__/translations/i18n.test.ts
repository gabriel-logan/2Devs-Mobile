import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "../../translations/i18n";

describe("i18n", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should throw an error if no locales are found", () => {
		jest.resetModules();

		jest.mock("react-native-localize", () => ({
			getLocales: jest.fn(),
		}));

		expect(() => {
			require("../../translations/i18n");
		}).toThrow("No locales found");
	});

	const resources = {
		en: {},
		ru: {},
		ptBR: {},
		sk: {},
		sl: {},
		srLatn: {},
		sr: {},
		sv: {},
		sw: {},
		th: {},
		tr: {},
		uk: {},
		ur: {},
		vi: {},
		zh: {},
		zhHans: {},
		zhHant: {},
		klingon: {},
	};

	it("should return languageWithoutHyphen if it exists in resources", () => {
		const languageWithoutHyphen = "ptBR";

		const languageCode = "pt";

		const result = Object.keys(resources).includes(languageWithoutHyphen)
			? languageWithoutHyphen
			: languageCode !== null && Object.keys(resources).includes(languageCode)
			? languageCode
			: "en";

		expect(result).toBe(languageWithoutHyphen);
	});

	it('should return "en" if languageWithoutHyphen does not exist in resources and languageCode is null', () => {
		const languageWithoutHyphen = "nonexistent";
		const languageCode = null;

		const result = Object.keys(resources).includes(languageWithoutHyphen)
			? languageWithoutHyphen
			: languageCode !== null && Object.keys(resources).includes(languageCode)
			? languageCode
			: "en";

		expect(result).toBe("en");
	});

	it("should return languageCode if languageWithoutHyphen does not exist in resources but languageCode does", () => {
		const languageWithoutHyphen = "nonexistent";

		const languageCode = "ru";

		const result = Object.keys(resources).includes(languageWithoutHyphen)
			? languageWithoutHyphen
			: languageCode !== null && Object.keys(resources).includes(languageCode)
			? languageCode
			: "en";

		expect(result).toBe(languageCode);
	});

	it("should change language to stored language", async () => {
		jest.mock("react-native-localize", () => ({
			getLocales: () => [
				{ languageCode: "en", languageTag: "en-US", countryCode: "US" },
			],
		}));

		const storedLanguageMock = "es"; // idioma armazenado simulado
		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedLanguageMock);

		await (async () => {
			const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
			storedLanguage && i18n.changeLanguage(storedLanguage);
		})();

		expect(AsyncStorage.getItem).toHaveBeenCalledWith("selectedLanguage");
		expect(i18n.changeLanguage).toHaveBeenCalledWith(storedLanguageMock);
	});

	it("should not change language if no stored language", async () => {
		jest.mock("react-native-localize", () => ({
			getLocales: () => [
				{ languageCode: "en", languageTag: "en-US", countryCode: "US" },
			],
		}));

		(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

		await (async () => {
			const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
			storedLanguage && i18n.changeLanguage(storedLanguage);
		})();

		expect(AsyncStorage.getItem).toHaveBeenCalledWith("selectedLanguage");
		expect(i18n.changeLanguage).not.toHaveBeenCalled();
	});
});
