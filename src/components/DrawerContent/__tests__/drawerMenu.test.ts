import drawerMenu from "../drawerMenu";

describe("drawerMenu", () => {
	it("should have the correct number of items", () => {
		expect(drawerMenu).toHaveLength(7);
	});

	it("should have the correct structure for each item", () => {
		drawerMenu.forEach((item) => {
			expect(item).toHaveProperty("title");
			if ("route" in item) {
				expect(item).toHaveProperty("route");
				expect(item).not.toHaveProperty("menuList");
			} else {
				expect(item).toHaveProperty("menuList");
				expect(item).not.toHaveProperty("route");
				item.menuList.forEach((subItem) => {
					expect(subItem).toHaveProperty("title");
					expect(subItem).toHaveProperty("route");
				});
			}
		});
	});
});
