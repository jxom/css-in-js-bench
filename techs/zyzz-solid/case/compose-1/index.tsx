// bench-strategy: compose-depth
// Zyzz on Solid — compose-1, the depth-sweep control: one component applying a single
// style that carries only the compose-3 base-level declarations. Default-exports a
// single-instance render(i) (§6); the harness loops it.
import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

const ComposedButton = (props: { children?: JSX.Element }) => <button {...styles.l0()}>{props.children}</button>;

export default (i: () => number) => <ComposedButton>{i()}</ComposedButton>;

namespace styles {
  export const l0 = style({
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "6px",
    padding: "8px 16px",
    background: "#2563eb",
    color: "#fff",
  });
}
