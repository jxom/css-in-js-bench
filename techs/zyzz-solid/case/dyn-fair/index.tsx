// bench-strategy: dynamic-style-fn
// Zyzz on Solid — its typed style callback IS the documented path for runtime values (a static
// rule over a CSS variable bound inline), so this matches the dyn-translate lane.
import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

interface P {
  translateX: number;
  children?: JSX.Element;
}

const TranslatedDot = (props: P) => (
  <div {...styles.dot({ transform: `translateX(${props.translateX}px)` })}>{props.children}</div>
);

export default (i: () => number) => {
  return <TranslatedDot translateX={i()}>{i()}</TranslatedDot>;
};

namespace styles {
  export const dot = style((values: { transform: `translateX(${number}px)` }) => ({
    display: "inline-block",
    width: "8px",
    height: "8px",
    transform: values.transform,
  }));
}
