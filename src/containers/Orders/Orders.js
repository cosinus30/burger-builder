import React from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

const { Component } = require("react");


class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        console.log(this.props.orders);
        let spinner = <div>
            {this.props.orders.map((order) => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            })}
        </div>;
        if (this.props.loading) {
            spinner = <Spinner />
        }
        return (
            <React.Fragment>
                {spinner}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))