import React from "react";
import ReactDOM from "react-dom";
import "./index.modules.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import CreateSagaMiddleware from "redux-saga";
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
});

const sagaMiddleware = CreateSagaMiddleware();

const store =
    process.env.NODE_ENV === "development"
        ? createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)))
        : createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
