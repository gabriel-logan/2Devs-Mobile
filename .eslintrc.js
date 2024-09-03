/* eslint-env node */
module.exports = {
	extends: ["@react-native", "universe/native", "plugin:react/jsx-runtime"],
	root: true,
	rules: {
		"react-hooks/exhaustive-deps": "warn",
		"no-console": "warn",
	},
};
