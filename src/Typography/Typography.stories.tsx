import * as React from "react";

import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";
import Text from "./Text";
import Paragraph from "./Paragraph";
import { wInfo } from "../utils";

const stories = storiesOf("Typography", module) as any;
stories
	.addWithJSX(
		"Text",
		wInfo(`
  ### Usage
  
  ~~~js
  <Text>Some Text</Text>
  ~~~
  
  `)(() => (
			<Text size={select("Size", ["100", "200", "300", "400", "500", "600", "700", "800", "900"], "Text")}>
				Some Text
			</Text>
		))
	)
	.addWithJSX(
		"Paragraph",
		wInfo(`
### Usage

~~~js
<Paragraph>Some Longer Text</Paragraph>
~~~

`)(() => (
			<Paragraph>
				Lorem ipsum dolor amet crucifix cliche post-ironic chillwave distillery. Dreamcatcher snackwave tofu tilde PBR&B
				flannel lomo lyft sriracha tumeric tacos craft beer ethical. Whatever biodiesel live-edge man bun. Palo santo
				swag plaid, wayfarers chartreuse occupy kickstarter. VHS cred crucifix street art, organic literally skateboard
				live-edge.
			</Paragraph>
		))
	);
