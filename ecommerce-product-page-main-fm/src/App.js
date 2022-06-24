import { useState } from 'react';
import Header from './containers/Header.js';
import Main from './containers/Main.js';
import Footer from './containers/Footer.js';
import LightBox from './containers/LightBox.js';
import './App.css';
import { ProductDisplay } from './components/ProductDisplay.js';

function App() {
  const [cartCount, setCartCount] = useState('');
  const [product, setProduct] = useState('')
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen(!open);
  };
  const addToCart = (count, product) => {
    setCartCount(count)
    setProduct(product)
  }
  return (
    <div className="container">
      <Header cartCount={cartCount} product={product} />
      <Main addToCart={addToCart} changeOpen={changeOpen}/>
      <LightBox open={open} onClose={() => setOpen(false)}>
        <ProductDisplay close={setOpen} />
      </LightBox>
      <Footer />
    </div>
  );
}

export default App;
