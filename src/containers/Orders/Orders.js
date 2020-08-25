import React from 'react'
import Order from '../../components/Order/Order'

const { Component } = require("react");


class Orders extends Component {

    state = {

    }



    render() {
        return (
            <div>
                <Order />
                <Order />

            </div>);
    }
}

export default Orders