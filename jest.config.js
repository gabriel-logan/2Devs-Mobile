/** @type {import("jest").Config} */
module.exports = {
	preset: "react-native",
	setupFilesAfterEnv: ["./jest/setupFilesAfterEnv.ts"],
	setupFiles: ["./jest/setupFiles.js"],
};
