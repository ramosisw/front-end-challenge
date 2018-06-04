import React, {Component} from "react";
import {Col, Table} from "reactstrap";
import PropTypes from 'prop-types';
import axios from "axios";
import moment from "moment";

/**
 * Ultimos trades
 */
class LastTrades extends Component {
    constructor(props) {
        super(props);
        console.log("LastTrades Props:")
        console.log(props);
        this.state = {
            book: this.props.book,
            trades: []
        };
        this.getTrades();
    }

    getTrades() {
        const _this = this;
        axios.get("https://api.bitso.com/v3/trades/", {
            params: {book: _this.state.book, sort: "desc", limit: 100}
        }).then(message => {
            if (!message.data && !message.data.success) return;
            let response = message.data;
            console.log("getTrades: " + JSON.stringify(response.payload[0]));
            _this.setState({
                trades: response.payload
            });
        });
    }

    /**
     * Renders view
     * @returns {*}
     */
    render() {
        let flash = true;
        const {book, trades} = this.props;
        for (let trade of trades) {
            /*TradeResponse[{"i":7693045,"a":"0.00099991","r":"153697.55","v":"153.68371722","mo":"CyQQFbmz7GhBbsbI","to":"aJZUXFxbvzAV1MIE","t":0}]*/
            this.state.trades.unshift({
                market_side: trade.t == 0 ? "buy" : "sell",
                created_at: moment().toISOString(),
                tid: trade.i,
                price: trade.r,
                amount: trade.a
            });
        }
        if (this.state.trades.length > 50) {
            this.state.trades = this.state.trades.slice(0, 50);
        }
        if (book !== this.state.book && (this.state.book = book)) this.getTrades();
        const currencies = book.split("_");
        const currency_amount = currencies[0];
        const currency_price = currencies[1];
        return (
            <Col md={"3"} className={"last-trades"}>
                <div className={"table-header"}>
                    <h2>últimos trades</h2>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Hora</th>
                        <th><span className={"currency-price"}>{currency_price}</span>PRECIO</th>
                        <th><span className={"currency-amount"}>{currency_amount}</span>MONTO</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.trades.map(trade => {
                        /*getTrades: {"book":"btc_mxn","created_at":"2018-06-03T18:59:52+0000","amount":"0.00220640","maker_side":"sell","price":"154097.40","tid":7693079}*/
                        return (
                            <tr key={trade.tid} className={"flash"}>
                                <td>{moment(trade.created_at).format("H:mm:ss")}</td>
                                <td>{trade.price}</td>
                                {/*<td>1.090484<span className={"zeros"}>00</span></td>*/}
                                <td>{trade.amount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Col>
        );
    }
}

LastTrades.propTypes = {
    book: PropTypes.string.isRequired,
    trades: PropTypes.array.isRequired
};

export default LastTrades;