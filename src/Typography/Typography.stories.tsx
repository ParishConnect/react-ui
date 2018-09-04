import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { wInfo } from "../utils";
import Code from "./Code";
import Heading from "./Heading";
import Label from "./Label";
import Link from "./Link";
import ListItem from "./ListItem";
import OrderedList from "./OrderedList";
import Paragraph from "./Paragraph";
import Pre from "./Pre";
import Small from "./Small";
import Strong from "./Strong";
import SubHeading from "./SubHeading";
import Text from "./Text";
import UnorderedList from "./UnorderedList";

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
	)
	.addWithJSX(
		"Heading",
		wInfo(`
### Usage

~~~js
<Heading>Some Title</Heading>
~~~

`)(() => <Heading>Title</Heading>)
	)
	.addWithJSX(
		"Link",
		wInfo(`
### Usage

~~~js
<Link>Some Link</Link>
~~~

`)(() => <Link href="#">Title</Link>)
	)
	.addWithJSX(
		"Code",
		wInfo(`
### Usage

~~~js
<Code>Some Code</Code>
~~~

`)(() => <Code>Lorem ipsum dolor amet crucifix cliche post-ironic chillwave distillery.</Code>)
	)
	.addWithJSX(
		"Label",
		wInfo(`
### Usage

~~~js
<Label>Some Label</Label>
~~~

`)(() => <Label>Use as a regular HTML label</Label>)
	)
	.addWithJSX(
		"ListItem",
		wInfo(`
### Usage

~~~js
<ListItem>Some ListItem</ListItem>
~~~

`)(() => <ListItem>Use inside of a List Component</ListItem>)
	)
	.addWithJSX(
		"OrderedList",
		wInfo(`
### Usage

~~~js
<OrderedList>Some OrderedList</OrderedList>
~~~

`)(() => (
			<OrderedList marginTop={16} marginBottom={16}>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
			</OrderedList>
		))
	)
	.addWithJSX(
		"Unordered List",
		wInfo(`
### Usage

~~~js
<UnorderedList>Some UnorderedList</UnorderedList>
~~~

`)(() => (
			<UnorderedList marginTop={16} marginBottom={16}>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
				<ListItem>Lorem ipsum dolar set amet</ListItem>
			</UnorderedList>
		))
	)
	.addWithJSX(
		"Pre",
		wInfo(`
### Usage

~~~js
<Pre>Some Pre</Pre>
~~~

`)(() => <Pre>Some Preformatted Text</Pre>)
	)
	.addWithJSX(
		"Small",
		wInfo(`
### Usage

~~~js
<Small>Some Small Text</Small>
~~~

`)(() => <Small size={500}>Some Small Text</Small>)
	)
	.addWithJSX(
		"Strong",
		wInfo(`
### Usage

~~~js
<Strong>Some Strong Text</Strong>
~~~

`)(() => <Strong>Some Strong Text</Strong>)
	)
	.addWithJSX(
		"SubHeading",
		wInfo(`
### Usage

~~~js
<SubHeading>Some SubHeading Text</SubHeading>
~~~

`)(() => <SubHeading size={700}>Some SubHeading Text</SubHeading>)
	);
