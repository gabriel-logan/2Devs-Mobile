// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

import mockClipboard from "@react-native-clipboard/clipboard/jest/clipboard-mock.js";

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
	RFValue: jest.fn().mockImplementation(() => 10),
	RFPercentage: jest.fn().mockImplementation(() => 10),
	fixedRFValue: jest.fn().mockImplementation(() => 10),
}));

jest.mock("react-native-responsive-screen", () => ({
	widthPercentageToDP: jest.fn().mockImplementation(() => 10),
	heightPercentageToDP: jest.fn().mockImplementation(() => 10),
	width: jest.fn().mockImplementation(() => 10),
	height: jest.fn().mockImplementation(() => 10),
}));

jest.mock("@react-native-clipboard/clipboard", () => mockClipboard);

jest.mock("react-native-base64", () => ({
	decode: jest.fn(),
	encode: jest.fn(),
}));

jest.mock(
	"react-native-vector-icons/MaterialCommunityIcons",
	() => "MaterialCommunityIcons Icon"
);
jest.mock("react-native-vector-icons/FontAwesome5", () => "FontAwesome5 Icon");
jest.mock("react-native-vector-icons/FontAwesome", () => "FontAwesome Icon");
jest.mock(
	"react-native-vector-icons/MaterialIcons",
	() => "MaterialIcons Icon"
);
jest.mock("react-native-vector-icons/Feather", () => "Feather Icon");
jest.mock("react-native-vector-icons/AntDesign", () => "AntDesign Icon");
jest.mock("react-native-vector-icons/Entypo", () => "Entypo Icon");
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons Icon");

jest.mock("react-native-network-info", () => ({
	NetworkInfo: {
		getIPV4Address: jest.fn().mockResolvedValue("192.168.100.4"),
		getGatewayIPAddress: jest.fn().mockResolvedValue("192.168.100.1"),
		getSubnet: jest.fn().mockResolvedValue("255.25.255.0"),
	},
}));
