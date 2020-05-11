import React from 'react';
import './App.modules.css';

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div className="App">
      <Layout>
        <p>Layout children!</p>
      </Layout>
      <h1>Hello World</h1>
      <BurgerBuilder />
    </div>
  );
}

export default App;
