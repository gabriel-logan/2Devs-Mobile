module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
	},
	root: true,
	extends: ["@react-native", "universe/native", "plugin:react/jsx-runtime"],
	ignorePatterns: [".eslintrc.js"],
	overrides: [
		{
			files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
			extends: ["plugin:testing-library/react"],
		},
	],
	rules: {
		"react-hooks/exhaustive-deps": "warn",
		"no-console": "warn",
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/consistent-type-exports": "error",
	},
};
