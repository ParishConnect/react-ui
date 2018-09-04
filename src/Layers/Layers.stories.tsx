import * as React from "react";

import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";
import Pane from "./Pane";
import Card from "./Card";
import { wInfo } from "../utils";

const appearanceOptions = [
	"none",
	"ultralight",
	"light",
	"medium",
	"dark",
	"selected",
	"blue",
	"red",
	"purple",
	"yellow"
];
const elevationOptions = {
	10: "None",
	0: "Flat",
	1: "Floating",
	2: "Popover",
	3: "Toasts",
	4: "Dialog"
};
const stories = storiesOf("Layers", module) as any;
stories
	.addWithJSX(
		"Pane",
		wInfo(`
  ### Usage
  
  ~~~js
  <Pane width={250} height={100} >[children]</Pane>
  ~~~
  
  `)(() => (
			<Pane
				appearance={select("Appearance", appearanceOptions, "none")}
				elevation={select("Elevation", elevationOptions, 10)}
				hoverElevation={select("Hover Elevation", elevationOptions, 10)}
				activeElevation={select("Active Elevation", elevationOptions, 10)}
				border={boolean("Border", true)}
				width={300}
				height={100}
			/>
		))
	)
	.addWithJSX(
		"Card",
		wInfo(`
    ### Usage
    
    ~~~js
    <Card width={250} height={100} >[children]</Card>
    ~~~
    
    `)(() => (
			<Card
				appearance={select("Appearance", appearanceOptions, "")}
				elevation={select("Elevation", elevationOptions, 10)}
				hoverElevation={select("Hover Elevation", elevationOptions, 10)}
				activeElevation={select("Active Elevation", elevationOptions, 10)}
				border={boolean("Border", true)}
				width={300}
				height={100}
			/>
		))
	);
