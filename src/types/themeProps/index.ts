export type Theme = "light" | "dark";
export type ThemeChanges = Theme | "system";

export interface ThemeContextProps {
	theme: Theme;
	toggleTheme: (newTheme: Theme) => void;
}
