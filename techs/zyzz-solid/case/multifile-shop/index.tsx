// bench-strategy: same-as-product-grid-multifile
// Zyzz on Solid — multifile-shop. The SAME tile as product-grid (same DOM, same CSS), with the
// styles split across modules the way a design system ships them: shared fragments in
// tokens.ts, the definitions by role across layout.ts / controls.ts / text.ts, and every
// use site here. Each definition compiles in its own module, and this module applies them.
import { cx } from "zyzz";
import * as controls from "./controls";
import * as layout from "./layout";
import * as text from "./text";
import * as tokens from "./tokens";

interface Product {
  i: number;
  title: string;
  price: number;
  discount: number;
  rating: number;
  inStock: boolean;
  wishlisted: boolean;
}

const Tile = (props: { p: () => Product }) => (
  <li {...layout.card()}>
    <div {...layout.image()}>
      <div aria-hidden="true" {...layout.placeholder()} />
      {props.p().discount > 0 && (
        <span {...cx(text.badge(), props.p().discount >= 30 && text.badgeHigh())}>
          <span {...tokens.srOnly()}>Reduced by </span>-{props.p().discount}%
        </span>
      )}
      <button
        type="button"
        aria-pressed={props.p().wishlisted ? "true" : "false"}
        aria-label={props.p().wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        {...cx(controls.wish(), props.p().wishlisted && controls.wishOn())}
      >
        <span aria-hidden="true">♥</span>
      </button>
    </div>
    <h3 {...text.title()}>{props.p().title}</h3>
    <div role="img" aria-label={`Rated ${props.p().rating} out of 5`} {...text.rating()}>
      <div aria-hidden="true" {...text.ratingFill({ width: `${(props.p().rating / 5) * 100}%` })} />
    </div>
    <div {...text.price()}>
      {props.p().discount > 0 && (
        <span {...text.priceOld()}>
          <span {...tokens.srOnly()}>Was </span>${(props.p().price * (1 + props.p().discount / 100)).toFixed(2)}
        </span>
      )}
      <span {...text.priceNow()}>
        {props.p().discount > 0 && <span {...tokens.srOnly()}>Now </span>}${props.p().price.toFixed(2)}
      </span>
    </div>
    <button
      disabled={!props.p().inStock}
      aria-label={props.p().inStock ? `Add ${props.p().title} to cart` : `${props.p().title} is sold out`}
      {...cx(controls.cart(), !props.p().inStock && controls.cartDisabled())}
    >
      {props.p().inStock ? "Add to cart" : "Sold out"}
    </button>
  </li>
);

export default (i: () => number) => {
  // ONE product built from i with the same per-item formula as every other lane.
  // Cached on the index: `Tile` reads the product many times per render and a dynamic JSX
  // prop compiles to a getter, so the accessor is forwarded as a plain prop and the object
  // is built once per distinct index instead of once per read.
  let last = NaN;
  let cached!: Product;
  const p = (): Product => {
    const n = i();
    if (n !== last) {
      last = n;
      cached = {
        i: n,
        title: "Product " + n,
        price: (n % 50) + 9.99,
        discount: n % 4 === 0 ? (n % 3 === 0 ? 40 : 20) : 0,
        rating: (n % 5) + 1,
        inStock: n % 7 !== 0,
        wishlisted: n % 6 === 0,
      };
    }
    return cached;
  };
  return <Tile p={p} />;
};
