import React from "react";
import logo from "../images/logo.svg";
import image from "../images/image-avatar.png";
import cart from "../images/icon-cart.svg";
import bin from "../images/icon-delete.svg";

function Header({ cartCount, product }) {
  return (
    <header className="header">
      <section className="left-half">
        <figure className="logo-container">
          <img src={logo} className="logo" alt="Sneaker" />
        </figure>
        <nav className="nav">
          <p>Collections</p>
          <p>Men</p>
          <p>Women</p>
          <p>About</p>
          <p>Contact</p>
        </nav>
      </section>
      <div className="checkout">
        <figure className="cart-container">
          <img src={cart} className="cart" alt="cart icon" />
          <span className="cart-count">{cartCount}</span>
          <div className="cart-details-container">
            <h3>Cart</h3>
            {!cartCount && <p className="empty-cart">Your cart is empty.</p>}
            {cartCount && (
              <div>
                <div className="cart-details">
                  <figure>
                    <img
                      src={product}
                      width="40px"
                      className="cart-product"
                      alt="selected product"
                    />
                  </figure>
                  <section>
                    <p>Fall Limited Edition Sneakers</p>
                    <p>
                      $125.00 x ${cartCount}{"  "}
                      <span className="cart-total">${125 * cartCount}.00</span>
                    </p>
                  </section>
                  <figure>
                    <img src={bin} alt="delete" />
                  </figure>
                </div>
                <button>Checkout</button>
              </div>
            )}
          </div>
        </figure>
        <figure className="avatar-container">
          <img src={image} className="avatar" alt="avatar" />
        </figure>
      </div>
    </header>
  );
}

export default Header;
