
import React from 'react'

import classes from './Order.module.css'

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Price: 5.90</p>
        </div>
    )
}

export default Order