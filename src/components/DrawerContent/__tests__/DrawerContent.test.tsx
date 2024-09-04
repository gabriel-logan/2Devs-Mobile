import { fireEvent, render, screen } from "@testing-library/react-native";

import CustomDrawerContent from "..";

describe("DrawerContent", () => {
	it("should render correctly", () => {
		render(<CustomDrawerContent />);

		expect(screen.getByText(/Principal/i)).toBeTruthy();
	});

	describe("Main menu", () => {
		it("should navigate to the correct screen", async () => {
			render(<CustomDrawerContent />);

			const drawerItem = await screen.findAllByTestId("drawerItem");

			drawerItem.forEach((item) => {
				fireEvent.press(item);
			});

			expect(screen.getByText(/Principal/i)).toBeTruthy();
		});

		it("should open and close the sub menu", async () => {
			render(<CustomDrawerContent />);

			const drawerItem = await screen.findAllByTestId("drawerItem");

			fireEvent.press(drawerItem[2]);

			const drawerItemSub = await screen.findAllByTestId("drawerItemSub");

			expect(drawerItemSub).toHaveLength(4);

			fireEvent.press(drawerItem[2]);

			expect(screen.queryByTestId("drawerItemSub")).toBeNull();
		});
	});

	describe("Sub menu", () => {
		it("should navigate to the correct screen", async () => {
			render(<CustomDrawerContent />);

			const drawerItem = await screen.findAllByTestId("drawerItem");

			fireEvent.press(drawerItem[2]);
			fireEvent.press(drawerItem[3]);

			const drawerItemSub = await screen.findAllByTestId("drawerItemSub");

			drawerItemSub.forEach((item) => {
				fireEvent.press(item);
			});

			expect(screen.getByText(/Principal/i)).toBeTruthy();
		});
	});
});
