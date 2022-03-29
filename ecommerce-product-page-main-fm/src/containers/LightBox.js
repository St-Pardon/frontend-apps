import { ProductDisplay } from "../components/ProductDisplay";
import { createPortal } from "react-dom";

function LightBox({ children, onClose, open }) {
  return open
    ? createPortal(
        <>
          <div className="overlay"></div>
          <div className="modal">
            {children}
            {/* <ProductDisplay /> */}
          </div>
        </>,
        document.body
      )
    : null;
}

export default LightBox;
