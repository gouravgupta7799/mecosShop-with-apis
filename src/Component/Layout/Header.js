
import React, { Fragment } from 'react'
import classes from './Header.module.css'
import pic from '../../New folder/pills-liquids-medicine-children-kawaii-600nw-2144398893.webp'
import HeaderCartButton from './HeaderCartButton'


const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        <h2>React meals</h2>
        <HeaderCartButton onClickButton={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={pic}
        alt="A table full of delicious food" />
      </div>

    </Fragment>
  )
}

export default Header