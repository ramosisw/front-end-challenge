import React, {Component} from "react";
import ReactDOM from "react-dom";
import BitsoExchange from "./BitsoExchange.js";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "./Lees/index.less";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

/*---------------PROTO------------*/
if (!String.prototype.formatCurrency) {
    (function () {
        var rgx = new RegExp("(\\d)(?=(\\d{3})+\\.)", "g");
        String.prototype.formatCurrency = function (currencySymbol) {
            if (!currencySymbol && currencySymbol !== "") currencySymbol = "$";
            if (this === undefined) return currencySymbol + "0.00";
            return currencySymbol + " " + (this).replace(rgx, "$1,");
        }
    })();
}

if (!Math.randomInt) {
    (function () {
        Math.randomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    })();
}

/*------------END PROTO------------*/

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