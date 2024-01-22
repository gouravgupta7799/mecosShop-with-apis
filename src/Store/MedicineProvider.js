import MedicineContext from "./Medicine-context"
import React, { useEffect, useState } from 'react'

let urlData = 'https://crudcrud.com/api/327c54e237744c41a92cea7b1b2adbe0'
const MedicineProvider = (props) => {
  const [items, updateItems] = useState([]);

  const addItemToMedicineHandler = item => {
    const existingItemCartIndex = items.findIndex((i) => i.id === item.id)

    if (existingItemCartIndex === -1) {
      updateItems([...items, item]);
    }

    addToBackend([...items, item])
  }
  async function addToBackend(items) {
    try {
      let url = urlData + '/medicineShop'

      let res = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({ itemsArr: items }),
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


  const removeItemFromMedicineHandler = (id, q) => {
    const existingCartItemIndex = items.findIndex(item => item.id === id)

    if (existingCartItemIndex === -1) {
      updateItems[existingCartItemIndex].quantity = 0;
    } else {
      const updatedItems = [...items];
      updatedItems[existingCartItemIndex].quantity = Number(updatedItems[existingCartItemIndex].quantity) - q;
    }

    addToBackend([...items])
  }

  useEffect(() => {
    async function getFromBackend() {
      try {
        let url = urlData + '/medicineShop'

        let res = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await res.json()
        let k = [...data]
        updateItems(k[k.length - 1].itemsArr);
      }
      catch (err) {
        console.log(err)
      }
    }
    getFromBackend()
  }, [])


  const medicineContext = {
    items: items,
    addItem: addItemToMedicineHandler,
    removeItem: removeItemFromMedicineHandler,
  }

  return <MedicineContext.Provider value={medicineContext}>
    {props.children}
  </MedicineContext.Provider>
}
export default MedicineProvider