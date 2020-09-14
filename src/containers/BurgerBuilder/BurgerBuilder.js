import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component {

    state = {
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

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('price=' + this.state.props)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount() {

        console.log(this.props)
        // axios.get('https://react-burger-app-2e4de.firebaseio.com/ingredients.json')
        //     .then((response) => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    render() {
        const disabledButtons = { ...this.props.ingredients };
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>There is a problem</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls
                        price={this.props.price}
                        addedHandler={this.props.onIngredientAdded}
                        removeHandler={this.props.onIngredientRemoved}
                        disabledButtons={disabledButtons}
                        purchasibility={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>)
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients} price={this.props.price} purchaseContinued={this.purchaseContinueHandler} purchaseCanceled={this.purchaseCancelHandler}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName: ingName } }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName: ingName } })
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));