import React, { useContext } from 'react';

import classes from './AvailableMedicine.module.css';
import MedicineItem from './MedicineItem';
import Card from '../UI/Card';
import MedicineForm from './MedicineForm';
import MedicineContext from "../../Store/Medicine-context.js";

const AvailableMedicine = () => {

  const mediCtx = useContext(MedicineContext);

  const addMedicineHandler = (medicine) => {
    mediCtx.addItem(medicine)
  }

  const availableMedicine = mediCtx.items.map((medicine) =>
    <MedicineItem key={medicine.id} id={medicine.id} name={medicine.medicine} description={medicine.desc} price={medicine.price} quantity={medicine.quantity} />)
  return (
    <section className={classes.Medicine}>
      <Card>
        <MedicineForm onAddStock={addMedicineHandler} />
        <ul>{availableMedicine}</ul>
      </Card>
    </section>
  )
}

export default AvailableMedicine;