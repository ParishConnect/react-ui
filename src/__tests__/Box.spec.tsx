import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import "jest";
import Box from "../Box/Box";
import { PropDefs } from "../Box/PropDefs";

test("Box Renders Correctly", () => {
	const tree: any = renderer.create(<Box />).toJSON();
	expect(tree).toMatchSnapshot();
	expect(tree).toHaveStyleRule("width", "10px");
	expect(tree).toHaveStyleRule("height", "10px");
	expect(tree).toHaveStyleRule("display", "block");
});

test("PropDefs is Correct format", () => {
	expect(PropDefs).toBeInstanceOf(Array);
	PropDefs.map((def: { prop: string; type: string }) => {
		expect(def).toHaveProperty("prop");
	});
});
