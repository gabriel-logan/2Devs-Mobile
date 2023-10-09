/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks'],
	root: true,
	rules: {
		'react-hooks/rules-of-hooks': 'error', // Verifica as regras dos Hooks
		'react-hooks/exhaustive-deps': 'warn', // Adicione essa regra
	},
};
