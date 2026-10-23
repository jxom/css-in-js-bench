import type { JSX } from "@solidjs/web";
import { variants } from "../../zyzz.config";

interface P {
  $active?: boolean;
  $fullWidth?: boolean;
  $variant?: "primary" | "secondary" | "ghost";
  children?: JSX.Element;
}

// One `variants` recipe: each prop selects a precompiled choice. Axes keep their authored
// order, so `variant` overrides `active` as later classes do in the vanilla lane. Class
// selection adds one class per choice, so each button renders a single class list.
const Button = (props: P) => (
  <button {...styles.button({ active: !!props.$active, full: !!props.$fullWidth, variant: props.$variant })}>{props.children}</button>
);

export default (i: () => number) => {
  const variant = () => (["primary", "secondary", "ghost"] as const)[i() % 3];
  return (
    <Button $active={i() % 4 !== 0} $fullWidth={i() % 3 === 0} $variant={variant()}>
      {i()}
    </Button>
  );
};

namespace styles {
  export const button = variants({
    base: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      padding: "8px 16px",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      backgroundColor: "#2563eb",
      color: "#ffffff",
    },
    selection: "class",
    variants: {
      active: {
        false: { backgroundColor: "#d1d5db", color: "#6b7280" },
        true: {},
      },
      variant: {
        ghost: { backgroundColor: "transparent", color: "#2563eb" },
        primary: {},
        secondary: { backgroundColor: "#f3f4f6", color: "#111827" },
      },
      full: {
        false: {},
        true: { width: "100%" },
      },
    },
  });
}
