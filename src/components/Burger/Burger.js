import React from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map((key) => {
        return [...Array(props.ingredients[key])].map((_, index) => {
            return <BurgerIngredient key={key + index} type={key} />
        })
    }).reduce((accumulator, element) => {
        return accumulator.concat(element);
    }, []);
    console.log(ingredients);

    if (ingredients.length === 0) {
        ingredients = <p>Please start to add some ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ingredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>


    );

}

export default Burger;