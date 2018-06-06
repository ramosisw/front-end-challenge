import React, {Component} from "react";
import ReactDOM from "react-dom";
import BitsoExchange from "./BitsoExchange.js";
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "./Lees/index.less";
import LastTrades from "./Components/LastTrades";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

class BitsoSwitch extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/:book"
                    render={props => (
                        <BitsoExchange {...props}/>
                    )}
                />
                <Route
                    path="/"
                    render={props => (
                        <BitsoExchange {...props}/>
                    )}
                />
            </Switch>
        )
    };
}

export default withRouter(BitsoSwitch);

ReactDOM.render(
    <BrowserRouter>
        <BitsoSwitch/>
    </BrowserRouter>,
    document.getElementById("root")
);