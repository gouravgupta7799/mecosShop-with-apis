import React, { useState } from "react";

import Header from './Component/Layout/Header';
import Medicine from './Component/Medicine/Medicine';
import Cart from './Component/Cart/Cart';
import CartProvider from "./Store/CartProvider";
import MedicineProvider from "./Store/MedicineProvider";

function App() {

  const [cartIsShown, setCartVisible] = useState(false);


  const showCart = () => {
    setCartVisible(true);
  }

  const hideCart = () => {
    setCartVisible(false)
  }

  return (
    <MedicineProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCart} />}
        <Header onShowCart={showCart} />
        <main>
          <Medicine />
        </main>
      </CartProvider>
    </MedicineProvider>
  );
}

export default App;