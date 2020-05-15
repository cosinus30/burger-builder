import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


const PRICES = {
    salad: 0.25,
    bacon: 0.6,
    meat: 0.5,
    cheese: 0.35
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        price: 3.0,
    }

    // type implies ingredient type
    addIngredientHandler = (type) => {

        const newCount = this.state.ingredients[type] + 1;
        const newPrice = this.state.price + PRICES[type];
        let oldIngredients = { ...this.state.ingredients };
        oldIngredients[type] = newCount;
        this.setState({
            price: newPrice,
            ingredients: oldIngredients,
        })
    }


    render() {
        return (
            <React.Fragment>
                {console.log(this.state)}
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls addedHandler={this.addIngredientHandler} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;