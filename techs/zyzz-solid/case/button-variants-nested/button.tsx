import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

// Levels above pass their classes down as a `class` prop, which this level applies as its
// override. Ordered output lets an override from a consuming module win over this module's
// declarations.
export const Button = (props: { class?: string | undefined; children?: JSX.Element }) => (
  <button {...styles.base({ className: props.class })}>{props.children}</button>
);

namespace styles {
  export const base = style({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
  });
}
