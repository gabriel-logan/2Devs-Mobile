import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import { locale, getLocales } from 'expo-localization';

// Minhas linguagens

import en from './en/en.json'; // Inglês

import ptBR from './pt-BR/pt-BR.json'; // Português (Brasil)

import AsyncStorage from '@react-native-async-storage/async-storage';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const languageWithoutHyphen = locale.replace('-', '');

const { languageCode } = getLocales()[0];

const resources = {
	en,
	ptBR,
};

const lngChecked = Object.keys(resources).includes(languageWithoutHyphen)
	? languageWithoutHyphen
	: Object.keys(resources).includes(languageCode)
	? languageCode
	: 'en';

(async () => {
	const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
	storedLanguage && i18n.changeLanguage(storedLanguage);
})();

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		compatibilityJSON: 'v3',
		resources,
		lng: lngChecked, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
