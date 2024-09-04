import {
	height,
	RFPercentage,
	RFValue,
	RFValueWithFixedSecondParam,
	width,
} from "..";

describe("Responsive", () => {
	it("should calculate width correctly", () => {
		const calculatedWidth = width("100%");
		expect(calculatedWidth).toBeGreaterThan(0);
	});

	it("should calculate height correctly", () => {
		const calculatedHeight = height(50);
		expect(calculatedHeight).toBeGreaterThan(0);
	});

	it("should calculate RFPercentage correctly", () => {
		const calculatedRFPercentage = RFPercentage(50);
		expect(calculatedRFPercentage).toBeGreaterThan(0);
	});

	it("should calculate RFValue correctly", () => {
		const calculatedRFValue = RFValue(16);
		expect(calculatedRFValue).toBeGreaterThan(0);
	});

	it("should calculate RFValueWithFixedSecondParam correctly", () => {
		const calculatedRFValueWithFixedSecondParam =
			RFValueWithFixedSecondParam(16);
		expect(calculatedRFValueWithFixedSecondParam).toBeGreaterThan(0);
	});
});
