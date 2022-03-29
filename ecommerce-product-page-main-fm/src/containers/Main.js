import { useState } from "react";
import cart1 from "../images/icon-cart1.svg";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import product1 from "../images/image-product-1.jpg";
import { ProductDisplay } from "../components/ProductDisplay";

function Main({ addToCart, changeOpen }) {
  const [img, setImg] = useState(product1);
  const [count, setCount] = useState(0);


  return (
    <main className="main">
      <ProductDisplay changeOpen={changeOpen}/>
      <section className="product-details">
        <h6 className="product-coy">SNEAKER COMPANY</h6>
        <h2 className="product-name">Fall Limited Edition Sneakers</h2>
        <p className="product-description">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>
        <h3 className="product-price">$125.00</h3>
        <div className="btn-container">
          <div className="item-btns">
            <button
              onClick={() => {
                if (count !== 0) {
                  setCount(count - 1);
                }
              }}
            >
              <img src={minus} alt="" />
            </button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>
              <img src={plus} alt="" />
            </button>
          </div>
          <div
            className="add-to-cart-container"
            onClick={() => {
              if (count !== 0) {
                addToCart(count, img);
              } else {
                addToCart("");
              }
            }}
          >
            <img src={cart1} alt="" />
            <button>Add to cart</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
