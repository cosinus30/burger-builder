import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem.js/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Builder</NavigationItem>
            {!props.isAuthenticated
                ? <NavigationItem link="/auth">Sign in</NavigationItem>
                : (<React.Fragment>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </React.Fragment>)
            }
        </ul>)
}
export default NavigationItems