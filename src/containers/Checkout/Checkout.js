import React from 'react'
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData';


const { Component } = require("react");



class Checkout extends Component {

    state = {
        ingredients: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = Number(param[1]);
        }
        console.log(ingredients)
        this.setState({ ingredients: ingredients })
    }

    onCheckoutContinuedHandler = (props) => {
        this.props.history.replace('/checkout/contact-data')
    }

    onCheckoutCanceledHandler = (props) => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.onCheckoutCanceledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;