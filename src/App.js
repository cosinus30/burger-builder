import React from 'react';
import classes from './App.module.css';

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <p>Layout children!</p>
      </Layout>
      <h1>App component</h1>
      <BurgerBuilder />
    </div>
  );
}

export default App;
