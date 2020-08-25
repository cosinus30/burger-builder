import React from 'react';


import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {



    return (
        <div className={classes.BuildControls}>
            <h4>Price: {props.price.toFixed(2)} $</h4>
            {controls.map((control) => {
                return <BuildControl key={control.label} label={control.label}
                    addedHandler={() => props.addedHandler(control.type)}
                    removeHandler={() => props.removeHandler(control.type)}
                    disabled={props.disabledButtons[control.type]} />
            })}
            <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchasibility}>Order Now</button>
        </div>
    );
}

export default BuildControls;