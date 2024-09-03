// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
	const Reanimated = require("react-native-reanimated/mock");

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

const mockNavigation = jest.fn();
const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => {
	const actualNavigation = jest.requireActual("@react-navigation/native");
	return {
		...actualNavigation,
		useNavigation: () => ({
			navigate: mockNavigation,
			goBack: mockGoBack,
		}),
	};
});

jest.mock("@react-native-async-storage/async-storage", () =>
	require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-i18next", () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
	initReactI18next: {
		type: "3rdParty",
		init: () => {},
	},
}));

jest.mock("react-native-responsive-fontsize", () => ({
	RFValue: jest.fn(),
	RFPercentage: jest.fn(),
	fixedRFValue: jest.fn(),
}));

jest.mock("react-native-responsive-screen", () => ({
	widthPercentageToDP: jest.fn(),
	heightPercentageToDP: jest.fn(),
	width: jest.fn(),
	height: jest.fn(),
}));
