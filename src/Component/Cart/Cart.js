import React, { useContext } from "react";

import classes from './Cart.module.css';
import Modal from '../UI/Model';
import CartContext from "../../Store/Cart-context";
import CartItem from "./CartItem";
import MedicineContext from "../../Store/Medicine-context";

const Cart = (props) => {
  const mediCtx = useContext(MedicineContext);
  const cartCntxt = useContext(CartContext);

  const hasItems = cartCntxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCntxt.removeItem(id);
  }

  const cartItemAddHandler = (item) => {
    cartCntxt.addItem({ ...item, quantity: 1 });
    mediCtx.removeItem(item.id, 1);
  };

  const cartitems = (<ul className={classes['cart-items']}>
    {cartCntxt.items.map((item) => {
      return <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />;
    }
    )}
  </ul>
  )
  return (
    <Modal onClick={props.onClose}>
      {cartitems}
      <div className={classes.total}>
        <span>Total</span>
        <span>₹ {cartCntxt.totalAmount.toFixed(2)}</span>

        <div className={classes.actions}>
          <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </div>
    </Modal>
  )
}

export default Cart;