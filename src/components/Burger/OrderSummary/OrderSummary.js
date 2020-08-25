
import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("ORDER SUMMARY UPDATED")
    }



    render() {

        const ingredients = Object.keys(this.props.ingredients).map((ingredient) => {
            return <ul key={ingredient}><span style={{ textTransform: "capitalize" }}>{ingredient}</span>: {this.props.ingredients[ingredient]}</ul>
        })
        return (
            <React.Fragment>
                <h4>Your order:</h4>
                <p>What a delicious one!</p>
                {ingredients}
                <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </React.Fragment>
        )
    }


}

export default OrderSummary;