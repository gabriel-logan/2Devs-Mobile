/** @type {import("jest").Config} */
module.exports = {
	preset: "react-native",
	setupFilesAfterEnv: ["./jest/setupFilesAfterEnv.ts"],
	setupFiles: ["./jest/setupFiles.js"],
	moduleNameMapper: {
		"\\.svg": "<rootDir>/__mocks__/svgMock.js",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
	},
};
