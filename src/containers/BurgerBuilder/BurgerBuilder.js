import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        if (!this.props.building) this.props.onInitIngredients();
    }

    updatePurchasability = (ingredients) => {
        const sum = Object.values(ingredients).reduce((accumulator, currEl) => {
            return accumulator + currEl;
        }, 0);
        return sum >= 4;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onPurchase();
        this.props.history.push({
            pathname: "/checkout",
        });
    };

    render() {
        const disabledButtons = { ...this.props.ingredients };
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>There is a problem</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls
                        price={this.props.price}
                        addedHandler={this.props.onIngredientAdded}
                        removeHandler={this.props.onIngredientRemoved}
                        disabledButtons={disabledButtons}
                        purchasibility={this.updatePurchasability(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </React.Fragment>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    purchaseContinued={this.purchaseContinueHandler}
                    purchaseCanceled={this.purchaseCancelHandler}
                />
            );
        }

        let modal = (
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
        );
        if (!this.state.purchasing) {
            modal = null;
        }

        return (
            <React.Fragment>
                {modal}
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
