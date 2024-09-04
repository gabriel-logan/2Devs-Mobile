import { fireEvent, render, screen } from "@testing-library/react-native";

import ChangeLangModal from "../ChangeLandModal";

const languageMappings: Record<string, string> = {
	af: "Afrikaans",
	ar: "العربية",
	bg: "български",
	ca: "Català",
	cs: "Čeština",
	cy: "Cymraeg",
	da: "Dansk",
	de: "Deutsch",
	el: "Ελληνικά",
	en: "English",
	es: "Español",
	fa: "فارسی",
	fi: "Suomi",
	fr: "Français",
	he: "עברית",
	hi: "हिन्दी",
	hr: "Hrvatski",
	hu: "Magyar",
	id: "Bahasa Indonesia",
	is: "Íslenska",
	it: "Italiano",
	ja: "日本語",
	ko: "한국어",
	lt: "Lietuvių",
	lv: "Latviešu",
	ms: "Bahasa Melayu",
	mt: "Malti",
	nb: "Norsk (Bokmål)",
	nl: "Nederlands",
	pl: "Polski",
	ptBR: "Português (BR)",
	ptPT: "Português (PT)",
	ro: "Română",
	ru: "Русский",
	sk: "Slovenčina",
	sl: "Slovenščina",
	srLatn: "Srpski (Latinica)",
	sv: "Svenska",
	sw: "Kiswahili (Latin)",
	th: "ไทย",
	tr: "Türkçe",
	uk: "Українська",
	ur: "اردو",
	vi: "Tiếng Việt",
	zh: "中文",
	zhHans: "简体中文",
	zhHant: "繁體中文",
};

describe("ChangeLandModal", () => {
	it("should render correctly", () => {
		render(<ChangeLangModal modalChangeLang setModalChangeLang={jest.fn()} />);
	});

	it("should render klingon language independently", () => {
		render(<ChangeLangModal modalChangeLang setModalChangeLang={jest.fn()} />);

		expect(screen.getByText(/Klingon/)).toBeTruthy();
	});

	it("should render all languages", () => {
		render(<ChangeLangModal modalChangeLang setModalChangeLang={jest.fn()} />);

		Object.values(languageMappings).forEach((language) => {
			expect(screen.getByText(language)).toBeTruthy();
		});
	});

	it("should close modal when background is clicked", async () => {
		const setModalChangeLang = jest.fn();
		render(
			<ChangeLangModal
				modalChangeLang
				setModalChangeLang={setModalChangeLang}
			/>
		);

		const background = screen.getByTestId("modal-background");
		const modal = screen.getByTestId("modal-change-lang");

		fireEvent.press(background);

		expect(setModalChangeLang).toHaveBeenCalledWith(false);

		modal.props.onRequestClose();
	});

	it("should change language when a language is clicked", () => {
		const setModalChangeLang = jest.fn();
		render(
			<ChangeLangModal
				modalChangeLang
				setModalChangeLang={setModalChangeLang}
			/>
		);

		const newArrayOfLanguages = [...Object.keys(languageMappings), "klingon"];

		newArrayOfLanguages.forEach((languageCode) => {
			const languageButton = screen.getByTestId(
				`language-button-${languageCode}`
			);

			fireEvent.press(languageButton);
		});

		expect(setModalChangeLang).toHaveBeenCalledTimes(
			newArrayOfLanguages.length - 1
		);
	});
});
