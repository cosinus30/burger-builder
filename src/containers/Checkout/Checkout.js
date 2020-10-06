import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

const { Component } = require("react");



class Checkout extends Component {
    onCheckoutContinuedHandler = (props) => {
        this.props.history.replace('/checkout/contact-data')
    }

    onCheckoutCanceledHandler = (props) => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCanceled={this.onCheckoutCanceledHandler}
                        onCheckoutContinued={this.onCheckoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </React.Fragment>
        }
        return (
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);