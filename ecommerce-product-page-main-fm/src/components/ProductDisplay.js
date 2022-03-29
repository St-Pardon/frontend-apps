import productThumb1 from "../images/image-product-1-thumbnail.jpg";
import productThumb2 from "../images/image-product-2-thumbnail.jpg";
import productThumb3 from "../images/image-product-3-thumbnail.jpg";
import productThumb4 from "../images/image-product-4-thumbnail.jpg";
import product1 from "../images/image-product-1.jpg";
import product2 from "../images/image-product-2.jpg";
import product3 from "../images/image-product-3.jpg";
import product4 from "../images/image-product-4.jpg";
import next from "../images/icon-next.svg";
import previous from "../images/icon-previous.svg";
import close from "../images/icon-close.svg";
import { useState } from "react";

export const ProductDisplay = ({changeOpen}) => {
    const [img, setImg] = useState(product1);
    const [active, setActive] = useState({
      first: true,
      second: false,
      third: false,
      fourth: false,
    });
  return (
    <section className="image-div">
      <figure className="next">
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </figure>
      <figure className="previous">
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </figure>
      <figure className="close">
        <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fill="#69707D"
            fill-rule="evenodd"
          />
        </svg>
      </figure>
      <figure className="hero-container" onClick={() => changeOpen()}>
        <img src={img} className="hero-img" alt="product" />
      </figure>
      <div>
        <figure
          onClick={() => {
            setImg(product1);
            setActive({
              ...active,
              first: true,
              second: false,
              third: false,
              fourth: false,
            });
          }}
          className={`thumbnail-container ${active.first ? "active" : ""}`}
        >
          <img src={productThumb1} alt="sneaker img 1" className="thumbnail" />
        </figure>
        <figure
          onClick={() => {
            setImg(product2);
            setActive({
              ...active,
              first: false,
              second: true,
              third: false,
              fourth: false,
            });
          }}
          className={`thumbnail-container ${active.second ? "active" : ""}`}
        >
          <img src={productThumb2} alt="sneaker img 2" className="thumbnail" />
        </figure>
        <figure
          onClick={() => {
            setImg(product3);
            setActive({
              ...active,
              first: false,
              second: false,
              third: true,
              fourth: false,
            });
          }}
          className={`thumbnail-container ${active.third ? "active" : ""}`}
        >
          <img src={productThumb3} alt="sneaker img 3" className="thumbnail" />
        </figure>
        <figure
          onClick={() => {
            setImg(product4);
            setActive({
              ...active,
              first: false,
              second: false,
              third: false,
              fourth: true,
            });
          }}
          className={`thumbnail-container ${active.fourth ? "active" : ""}`}
        >
          <img src={productThumb4} alt="sneaker img 4" className="thumbnail" />
        </figure>
      </div>
    </section>
  );
}
