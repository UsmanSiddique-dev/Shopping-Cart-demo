import React from "react";
import Nav from "./Nav";
import useCart from "../hooks/useCart";
type Propstype = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
function Header({ viewCart, setViewCart }: Propstype) {
  const { totalItems, Totalprice } = useCart();
  const content = (
    <header className="header">
      <div className="header_title-bar">
        <h1>Prime Co</h1>
      </div>
      <div className="header_price-box">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {Totalprice}</p>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
  return content;
}

export default Header;
