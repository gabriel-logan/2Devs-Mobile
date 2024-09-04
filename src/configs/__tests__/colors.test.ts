import type { Theme } from "../../types/themeProps";
import getThemeColor, { colors } from "../colors";

describe("getThemeColor", () => {
	it("should return the correct theme color", () => {
		const theme = "light";
		const key = "background";
		const expectedColor = colors[theme][key];

		const result = getThemeColor(theme, key);

		expect(result).toBe(expectedColor);
	});

	it('should return "#fff" for invalid theme or key', () => {
		const theme = "invalidTheme";
		const key = "invalidKey";
		const expectedColor = "#fff";

		const result = getThemeColor(theme as Theme, key as "background");

		expect(result).toBe(expectedColor);
	});
});
