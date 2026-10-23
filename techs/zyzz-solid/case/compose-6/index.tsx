// bench-strategy: compose-depth
// Zyzz on Solid — compose-6, the depth-sweep upper bracket: the compose-3 wrapper chain
// extended three more levels (L3–L5). Each level applies its own style with the incoming
// `class` as an override and forwards it down; later definitions win, matching the
// styled() chains. Default-exports a single-instance render(i) (§6); the harness loops it.
import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

interface P {
  class?: string | undefined;
  children?: JSX.Element;
}

const L0 = (props: P) => <button {...styles.l0({ className: props.class })}>{props.children}</button>;
const L1 = (props: P) => <L0 {...styles.l1({ className: props.class })}>{props.children}</L0>;
const L2 = (props: P) => <L1 {...styles.l2({ className: props.class })}>{props.children}</L1>;
const L3 = (props: P) => <L2 {...styles.l3({ className: props.class })}>{props.children}</L2>;
const L4 = (props: P) => <L3 {...styles.l4({ className: props.class })}>{props.children}</L3>;
const L5 = (props: P) => <L4 {...styles.l5({ className: props.class })}>{props.children}</L4>;
export default (i: () => number) => <L5>{i()}</L5>;

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

  export const l3 = style({ borderLeft: "3px solid hsl(159 70% 50%)", paddingLeft: "6px" });

  export const l4 = style({ borderLeft: "4px solid hsl(212 70% 50%)", paddingLeft: "8px" });

  export const l5 = style({ borderLeft: "5px solid hsl(265 70% 50%)", paddingLeft: "10px" });
}
