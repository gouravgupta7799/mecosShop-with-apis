import React, { useState, useEffect } from 'react'
import CartContext from './Cart-context';

let urlData = 'https://crudcrud.com/api/327c54e237744c41a92cea7b1b2adbe0'
const CartProvider = (props) => {

  const [items, updateItems] = useState([]);
  const [total, updateTotal] = useState(0);

  function addItemToCartHandler(item) {

    const existingCartItemIndex = items.findIndex(it => it.id === item.id)
    const existingCartItem = items[existingCartItemIndex]
    let updateIts;
    if (existingCartItem) {

      const updateIt = {
        ...existingCartItem,
        quantity: Number(existingCartItem.quantity) + Number(item.quantity)
      }
      updateIts = [...items]
      updateIts[existingCartItemIndex] = updateIt
    }
    else {
      updateIts = items.concat(item);
    }

    updateItems(updateIts)
    updateTotal(total + item.price * item.quantity)

    posttoBackend(updateIts, total + item.price * item.quantity)
  }




  async function posttoBackend(it, total) {
    try {
      let url = urlData + '/Cart'

      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          items: it,
          totalAmount: total,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }


  function removeItemFromCartHandler(id) {
    const existingCartItemIndex = items.findIndex(item => item.id === id)
    const existingItem = items[existingCartItemIndex]

    let updateIt;
    if (existingItem.quantity === 1) {
      updateIt = items.filter(item => item.id !== id)
    } else {
      const updateItem = { ...existingItem, quantity: existingItem.quantity - 1 }
      updateIt = [...items]
      updateIt[existingCartItemIndex] = updateItem
    }
    updateItems(updateIt)
    updateTotal(total - existingItem.price)
    console.log(updateIt)
    posttoBackend(updateIt, total)
  }


  useEffect(() => {
    async function getFromBackend() {
      try {
        let url = urlData + '/Cart'

        let res = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await res.json()
        let k = [...data]
        console.log(k[k.length - 1].items)
        updateTotal((k[k.length - 1].totalAmount))
        updateItems((k[k.length - 1].items))
        console.log(k)
      }
      catch (err) {
        console.log(err)
      }
    }
    getFromBackend()
  }, [])



  const cartContext = {
    items: items,
    totalAmount: total,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return (<CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
  )
}
export default CartProvider