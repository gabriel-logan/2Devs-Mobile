import i18n from 'i18next';

import {initReactI18next} from 'react-i18next';

import {getLocales} from 'react-native-localize';

// Minhas linguagens
import af from './af/af.json'; // Africâner

import ar from './ar/ar.json'; // Árabe

import bg from './bg/bg.json'; // Búlgaro

import ca from './ca/ca.json'; // Catalão

import cs from './cs/cs.json'; // Tcheco

import cy from './cy/cy.json'; // Galês

import da from './da/da.json'; // Dinamarquês

import de from './de/de.json'; // Alemão

import el from './el/el.json'; // Grego

import en from './en/en.json'; // Inglês

import es from './es/es.json'; // Espanhol

import fa from './fa/fa.json'; // Persa

import fi from './fi/fi.json'; // Finlandês

import fr from './fr/fr.json'; // Francês

import he from './he/he.json'; // Hebraico

import hi from './hi/hi.json'; // Hindi

import hr from './hr/hr.json'; // Croata

import hu from './hu/hu.json'; // Húngaro

import id from './id/id.json'; // Indonésio

import is from './is/is.json'; // Islandês

import it from './it/it.json'; // Italiano

import ja from './ja/ja.json'; // Japonês

import ko from './ko/ko.json'; // Coreano

import lt from './lt/lt.json'; // Lituano

import lv from './lv/lv.json'; // Letão

import ms from './ms/ms.json'; // Malaio

import mt from './mt/mt.json'; // Maltês

import nb from './nb/nb.json'; // Norueguês

import nl from './nl/nl.json'; // Holandês

import pl from './pl/pl.json'; // Polonês

import ptBR from './pt-BR/pt-BR.json'; // Português (Brasil)

import ptPT from './pt-pt/pt-pt.json'; // Português (Portugal)

import ro from './ro/ro.json'; // Romeno

import ru from './ru/ru.json'; // Russo

import sk from './sk/sk.json'; // Eslovaco

import sl from './sl/sl.json'; // Esloveno

import srLatn from './sr-Latn/sr-Latn.json'; // Sérvio (Latim)

import sv from './sv/sv.json'; // Sueco

import sw from './sw/sw.json'; // Suaíli

import th from './th/th.json'; // Tailandês

import tr from './tr/tr.json'; // Turco

import uk from './uk/uk.json'; // Ucraniano

import ur from './ur/ur.json'; // Urdu

import vi from './vi/vi.json'; // Vietnamita

import zh from './zh/zh.json'; // Chinês

import zhHans from './zh-Hans/zh-Hans.json'; // Chinês Simplificado

import zhHant from './zh-Hant/zh-Hant.json'; // Chinês Tradicional

import klingon from './tlh-Latn/tlh-Latn.json'; // Klingon

import AsyncStorage from '@react-native-async-storage/async-storage';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const languageWithoutHyphen = getLocales()[0].languageTag.replace('-', '');

const {languageCode} = getLocales()[0];

const resources = {
	af,
	ar,
	bg,
	ca,
	cs,
	cy,
	da,
	de,
	el,
	en,
	es,
	fa,
	fi,
	fr,
	he,
	hi,
	hr,
	hu,
	id,
	is,
	it,
	ja,
	ko,
	lt,
	lv,
	ms,
	mt,
	nb,
	nl,
	pl,
	ptBR,
	ptPT,
	ro,
	ru,
	sk,
	sl,
	srLatn,
	sr: srLatn,
	sv,
	sw,
	th,
	tr,
	uk,
	ur,
	vi,
	zh,
	zhHans,
	zhHant,
	klingon,
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
