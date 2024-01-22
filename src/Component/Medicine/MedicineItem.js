import React from 'react';
import classes from './MedicineItem.module.css';
import MedicineItemForm from './MedicineItemForm'

const MedicineItem = (props) => {

  return (
    <li className={classes.medicine}>
      <div>
        <h3 >{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <div>
        <MedicineItemForm id={props.id} items={props} />
      </div>
    </li>
  )
}

export default MedicineItem