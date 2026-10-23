// bench-strategy: compose-depth
// Zyzz on Solid — a real 3-level wrapper chain. Each level applies its own style with the
// incoming `class` as an override and forwards the result down, the documented way a
// component accepts overrides. Ordered output resolves conflicts in definition order, so
// the outer level's border-left and padding-left win, as in the styled() chains.
import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

interface P {
  class?: string | undefined;
  children?: JSX.Element;
}

const L0 = (props: P) => <button {...styles.l0({ className: props.class })}>{props.children}</button>;
const L1 = (props: P) => <L0 {...styles.l1({ className: props.class })}>{props.children}</L0>;
const L2 = (props: P) => <L1 {...styles.l2({ className: props.class })}>{props.children}</L1>;
export default (i: () => number) => <L2>{i()}</L2>;

namespace styles {
  export const l0 = style({
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "6px",
    padding: "8px 16px",
    background: "#2563eb",
    color: "#fff",
  });

  export const l1 = style({ borderLeft: "1px solid hsl(53 70% 50%)", paddingLeft: "2px" });

  export const l2 = style({ borderLeft: "2px solid hsl(106 70% 50%)", paddingLeft: "4px" });
}
