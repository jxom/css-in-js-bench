import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";
import { Button } from "./button";

export const GhostButton = (props: { class?: string | undefined; children?: JSX.Element }) => (
  <Button {...styles.ghost({ className: props.class })}>{props.children}</Button>
);

namespace styles {
  export const ghost = style({
    background: "transparent",
    borderColor: "#d1d5db",
    color: "#374151",
  });
}
