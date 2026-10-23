// Lane config: the same grouped output as the React zyzz lane (one class per style instead
// of one per declaration), with HTML props: applications return `class` and a string
// `style`, the attributes Solid renders, instead of React's `className` and style object.
import { defineConfig } from "zyzz";

export const { style, variants } = defineConfig({ cssOutput: "grouped", output: "html" });
