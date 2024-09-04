import { render } from "@testing-library/react-native";

import LogoComponent from "..";

describe("LogoComponent", () => {
	it("should render correctly", () => {
		render(
			<LogoComponent
				width={20}
				height={20}
				style={{ backgroundColor: "black" }}
			/>
		);
	});
});
