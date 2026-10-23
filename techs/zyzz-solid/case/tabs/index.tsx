import type { JSX } from "@solidjs/web";
import { style } from "../../zyzz.config";

// The same real-project Tabs in Zyzz on Solid. Like the StyleX and Plumeria lanes, this
// renders the per-tab ::after underline fallback and drops the @supports anchor-positioning
// underline. The active and disabled states read the attributes the button already exposes
// (aria-selected, :disabled), so a tab applies one style. FullWidthTabs marks its list with
// an empty style, and the item and tab rules select on that ancestor.
interface ITabProps {
  isActive?: boolean;
  disabled?: boolean;
  children?: JSX.Element;
}

const Tab = (props: ITabProps) => (
  <li role="presentation" {...styles.item()}>
    <button
      type="button"
      role="tab"
      disabled={props.disabled}
      aria-selected={props.isActive ? "true" : "false"}
      tabindex={props.isActive ? 0 : -1}
      {...styles.tab()}
    >
      {props.children}
    </button>
  </li>
);

interface ITabsProps {
  class?: string | undefined;
  children: JSX.Element;
}

const Tabs = (props: ITabsProps) => (
  <ul role="tablist" onKeyDown={handleKeyDown} {...styles.list({ className: props.class })}>
    {props.children}
  </ul>
);

const FullWidthTabs = (props: ITabsProps) => (
  <Tabs {...styles.listFull({ className: props.class })}>{props.children}</Tabs>
);

// roving-tabindex keyboard navigation (identical behaviour to the styled lane)
const queryTab = (el: Element | null | undefined) => el?.querySelector("button") ?? null;
const firstTab = (list: HTMLUListElement) => queryTab(list.firstElementChild)?.focus();
const lastTab = (list: HTMLUListElement) => queryTab(list.lastElementChild)?.focus();
const nextTab = (list: HTMLUListElement) => {
  const n = queryTab(document.activeElement?.parentElement?.nextElementSibling);
  n ? n.focus() : firstTab(list);
};
const prevTab = (list: HTMLUListElement) => {
  const p = queryTab(document.activeElement?.parentElement?.previousElementSibling);
  p ? p.focus() : lastTab(list);
};
function handleKeyDown(event: KeyboardEvent & { currentTarget: HTMLUListElement }) {
  const node = event.currentTarget;
  switch (event.key) {
    case "ArrowRight": nextTab(node); break;
    case "ArrowLeft": prevTab(node); break;
    case "Home": event.preventDefault(); firstTab(node); break;
    case "End": event.preventDefault(); lastTab(node); break;
  }
}

const LABELS = ["Overview", "Specs", "Reviews", "Q&A", "Similar", "Deals", "Support", "More"];
interface Group { id: number; count: number; activeIdx: number; fullWidth: boolean; disabledIdx: number; }

// The group arrives as an accessor: a dynamic JSX prop compiles to a getter, so
// `group={g()}` would rebuild the object on every read of it. `disabled` is computed by
// a call rather than written as `&&` inline, because the compiler wraps a logical
// expression in a prop position in a memo — a whole memo node per tab for a boolean.
const isDisabled = (g: Group, t: number) => t === g.disabledIdx && t !== g.activeIdx;

const TabGroup = (props: { group: () => Group }) => (
  <Tabs>
    {Array.from({ length: props.group().count }, (_, t) => (
      <Tab
        isActive={t === props.group().activeIdx}
        disabled={isDisabled(props.group(), t)}
      >
        {LABELS[t % LABELS.length]}
      </Tab>
    ))}
  </Tabs>
);

const FullWidthTabGroup = (props: { group: () => Group }) => (
  <FullWidthTabs>
    {Array.from({ length: props.group().count }, (_, t) => (
      <Tab
        isActive={t === props.group().activeIdx}
        disabled={isDisabled(props.group(), t)}
      >
        {LABELS[t % LABELS.length]}
      </Tab>
    ))}
  </FullWidthTabs>
);

export default (i: () => number) => {
  // ONE tab group built from i with the same per-group formula as every other lane.
  // Cached on the index: the accessor is read many times per render and the formula is
  // the same every time, so rebuilding the object per read would be pure waste.
  let last = NaN;
  let cached!: Group;
  const g = (): Group => {
    const n = i();
    if (n !== last) {
      last = n;
      const count = 3 + (n % 6);
      cached = {
        id: n,
        count,
        activeIdx: n % count,
        fullWidth: n % 3 === 0,
        disabledIdx: n % 4 === 0 ? count - 1 : -1,
      };
    }
    return cached;
  };
  return <>{g().fullWidth ? <FullWidthTabGroup group={g} /> : <TabGroup group={g} />}</>;
};

namespace styles {
  export const list = style({
    position: "relative",
    whiteSpace: "nowrap",
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    gap: "24px",
    boxShadow: "inset 0 -1px 0 0 #ddd",
    margin: 0,
    padding: 0,
    listStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  });

  // Marks a full-width list; the item and tab rules below select on it.
  export const listFull = style();

  export const item = style({
    display: "block",
    margin: 0,
    padding: 0,
    width: "min-content",
    flexShrink: 0,
    minWidth: "40px",
    selectors: {
      [`${listFull} > &`]: { flex: 1, display: "flex", justifyContent: "center" },
    },
  });

  // Active rules come before :focus-visible, which wins at equal specificity.
  export const tab = style({
    borderStyle: "none",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.01em",
    fontWeight: 400,
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.6)",
    backgroundColor: "transparent",
    height: "40px",
    "@media (min-width: 992px)": { fontSize: "14px", lineHeight: "20px" },
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      borderBottom: "3px solid transparent",
      transition: "opacity 150ms linear",
    },
    "::before": {
      position: "absolute",
      content: '""',
      width: "100%",
      minWidth: "40px",
      top: 0,
      bottom: 0,
      height: "100%",
    },
    selectors: {
      '&[aria-selected="true"]': { color: "#000" },
      '&[aria-selected="true"]::after': { borderBottomColor: "#eeb524" },
      '&:not([aria-selected="true"]):hover:not(:disabled)': { color: "#000" },
      '&:not([aria-selected="true"]):hover:not(:disabled)::after': { borderBottomColor: "#ddd" },
      '&:not([aria-selected="true"]):disabled': { color: "rgba(0, 0, 0, 0.26)", cursor: "default" },
      [`${listFull} &`]: { flex: 1 },
    },
    ":focus-visible": {
      outline: "none",
      "::after": { borderBottom: "3px solid #007bc7" },
    },
  });
}
