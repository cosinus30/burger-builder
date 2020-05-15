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
        purchasable: false,

    }

    updatePurchasability = (ingredients) => {
        const sum = Object.values(ingredients).reduce((accumulator, currEl) => {
            return accumulator + currEl;
        }, 0)
        this.setState({ purchasable: sum >= 2 })
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
        this.updatePurchasability(oldIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] >= 1) {
            let newCount, newPrice;
            newCount = this.state.ingredients[type] - 1;
            newPrice = this.state.price - PRICES[type];
            let oldIngredients = { ...this.state.ingredients };
            oldIngredients[type] = newCount;
            this.setState({
                price: newPrice,
                ingredients: oldIngredients,
            })
            this.updatePurchasability(oldIngredients);

        }

    }


    render() {
        const disabledButtons = { ...this.state.ingredients };
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0;
        }

        return (
            <React.Fragment>
                {console.log(this.state)}
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    price={this.state.price}
                    addedHandler={this.addIngredientHandler}
                    removeHandler={this.removeIngredientHandler}
                    disabledButtons={disabledButtons}
                    purchasibility={this.state.purchasable} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;