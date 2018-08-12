import * as React from "react";

import { storiesOf } from "@storybook/react";
import Pane from "./Pane";
import Card from "./Card";
import { wInfo } from "../utils";

(storiesOf("Layers", module) as any)
	.addWithJSX(
		"Pane",
		wInfo(`
  ### Usage
  
  ~~~js
  <Pane width={250} height={100} >[children]</Pane>
  ~~~
  
  `)(() => <Pane width={250} height={100} />)
	)
	.addWithJSX(
		"Card",
		wInfo(`
    ### Usage
    
    ~~~js
    <Card width={250} height={100} >[children]</Card>
    ~~~
    
    `)(() => <Card width={250} height={100} />)
	);
