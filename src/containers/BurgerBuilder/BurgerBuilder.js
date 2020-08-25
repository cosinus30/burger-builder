import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'

const PRICES = {
    salad: 0.25,
    bacon: 0.6,
    meat: 0.5,
    cheese: 0.35
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        price: 3.0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
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

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.price)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount() {

        console.log(this.props)
        axios.get('https://react-burger-app-2e4de.firebaseio.com/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const disabledButtons = { ...this.state.ingredients };
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>There is a problem</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        price={this.state.price}
                        addedHandler={this.addIngredientHandler}
                        removeHandler={this.removeIngredientHandler}
                        disabledButtons={disabledButtons}
                        purchasibility={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>)
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients} price={this.state.price} purchaseContinued={this.purchaseContinueHandler} purchaseCanceled={this.purchaseCancelHandler}
                />)
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let modal = (
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>)
        if (!this.state.purchasing) {
            modal = null
        }

        return (
            <React.Fragment>
                {modal}
                {burger}
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);