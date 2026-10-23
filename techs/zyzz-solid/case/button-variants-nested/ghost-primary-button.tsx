import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";
import { GhostButton } from "./ghost-button";

export const GhostPrimaryButton = (props: { children?: JSX.Element }) => (
  <GhostButton {...styles.ghostPrimary()}>{props.children}</GhostButton>
);

namespace styles {
  export const ghostPrimary = style({
    borderColor: "#2563eb",
    color: "#2563eb",
  });
}
