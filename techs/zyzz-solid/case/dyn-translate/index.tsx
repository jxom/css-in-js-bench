import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

interface P {
  translateX: number;
  children?: JSX.Element;
}

// A typed callback compiles to a static rule over a private CSS variable; each call binds
// the per-instance value to that variable through an inline style, creating no CSS.
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
