import React from "react";
import ReactDOM from "react-dom";
import BitsoExchange from "./BitsoExchange.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min"
import "./Lees/index.less";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
ReactDOM.render(
    <BitsoExchange/>,
    document.getElementById("root")
);