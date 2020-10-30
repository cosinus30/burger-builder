import React, { useEffect } from 'react';
import classes from './App.module.css';

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout.js/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

function App(props) {

  useEffect(() => {
    props.onTryAutoSignIn();
  })
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />

        </Switch>
      </Layout>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.checkAuthState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
