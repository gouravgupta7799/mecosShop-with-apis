import React, { useState } from 'react';
import classes from './MedicineForm.module.css'
const MedicineForm = (props) => {

  const [setMedicine, setMedicineHandler] = useState('');
  const [setDesc, setDescHandler] = useState('');
  const [setPrice, setPriceHandler] = useState('');
  const [setQuantity, setQuantityHandler] = useState('');

  const medicineInputHandler = (event) => {
    setMedicineHandler(event.target.value);
  }

  const descInputHandler = (event) => {
    setDescHandler(event.target.value);
  }

  const priceInputHandler = (event) => {
    setPriceHandler(event.target.value);
  }

  const quantityInputHandler = (event) => {
    setQuantityHandler(event.target.value);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const stock = {
      id: Math.random().toString(),
      medicine: setMedicine,
      desc: setDesc,
      price: setPrice,
      quantity: setQuantity
    }

    props.onAddStock(stock);

    setMedicineHandler('');
    setDescHandler('');
    setPriceHandler('');
    setQuantityHandler('');
  }
  return (
    <div className={classes.summary}>
      <h2>Medicine Store</h2>
      <form onSubmit={formSubmitHandler}>
        <label>Medicine Name</label>
        <input type="text" value={setMedicine} onChange={medicineInputHandler} />
        <label>Description</label>
        <input type="text" value={setDesc} onChange={descInputHandler} />
        <label>Price</label>
        <input type="text" value={setPrice} onChange={priceInputHandler} />
        <label>Quantity</label>
        <input type="number" value={setQuantity} onChange={quantityInputHandler} />
        <button>Add Medicine</button>
      </form>
    </div>
  )
}

export default MedicineForm