import React, {Component} from "react";
import axios from "axios";
import {polyfill} from "babel-polyfill";
import "../Assets/Fonts/DINPro-Light.otf";
import "../Assets/Fonts/DINPro-Medium.otf";
import "../Assets/Fonts/DINPro-Regular.otf";

import {Container, Row} from "reactstrap";

import Header from "./Components/Header";
import Summary from "./Components/Summary";
import LastTrades from "./Components/LastTrades";
import moment from "moment/moment";

class BitsoExchange extends Component {


    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            nationalCurrency: "mxn",
            amountDecimals: 8,
            valueDecimals: 2,
            selectedBook: null,
            firstBook: null,
            availableBooks: null,
            loading: true,
            trades: [],
            isPriceCurrency: false,
            lastPrice: "$ 0.00"
        };

        this.onSelectBook = this.onSelectBook.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    websocketRegister(book) {
        if (!this.websocket || this.websocket === undefined) return;
        this.websocket.send(
            JSON.stringify({
                action: "subscribe",
                book,
                type: "trades"
            })
        );
        /*this.websocket.send(
            JSON.stringify({
                action: "subscribe",
                book: _this.state.selectedBook,
                type: "diff-orders"
            })
        );*/
    }

    /**
     *
     */
    async componentDidMount() {
        const _this = this;
        await axios.get("https://api.bitso.com/v3/available_books/").then(message => {
            let state = {};
            if (!message.data) return;
            let response = message.data;
            if (!response.success) return;
            if (Array.isArray(response.payload) && response.payload.length >= 1) {
                state.firstBook = response.payload[0].book;
                state.availableBooks = response.payload;
                let exist;
                for (let item of state.availableBooks) {
                    if (exist = _this.state.selectedBook === item.book) break;
                }
                if (_this.state.selectedBook === null || !exist) {
                    state.selectedBook = state.firstBook;
                }
                _this.setState(state);
            }
        });
        this.onSelectBook(this.state.selectedBook);
    }

    /**
     *
     */
    componentWillUnmount() {
        this.websocket.close();
    }

    onSelectBook(book) {
        console.log("selected book: " + book);
        //Close if is open
        if (this.websocket || this.websocket !== undefined) {
            console.log("close ws");
            this.websocket.close();
            this.websocket.onmessage = null;
            this.websocket = null;
        }
        this.websocket = new WebSocket("wss://ws.bitso.com")
        this.websocket.onopen = () => {
            this.websocketRegister(book);
        };
        this.websocket.onmessage = this.onMessage;

        let amountDecimals;
        let valueDecimals;
        let b_split = book.split("_");
        let isPriceCurrency = b_split.length >= 2 && b_split[1].toLowerCase() == this.state.nationalCurrency;

        for (let item of this.state.availableBooks) {
            if (item.book === book) {
                let a_split = item.maximum_amount.split(".");
                let v_split = item.maximum_value.split(".");

                if (a_split && a_split.length == 2) amountDecimals = a_split[1].length;
                if (v_split && v_split.length == 2) valueDecimals = v_split[1].length;
                break;
            }
        }
        this.setState({
            amountDecimals,
            valueDecimals,
            isPriceCurrency,
            selectedBook: book,
            trades: [],
            lastPrice: "$ 0.00"
        });
        this.getTrades(book);
    }

    onMessage(message) {
        let response;
        if (message.data) response = JSON.parse(message.data);
        if (response.action) return console.log(response);
        switch (response.type) {
            case "trades":
                for (let trade of response.payload) {
                    //evitar duplicados
                    for (let item of this.state.trades) {
                        if (trade.i == item.tid) continue;
                    }

                    trade.r = (trade.r * 1).toFixed(this.state.valueDecimals);
                    trade.a = (trade.a * 1).toFixed(this.state.amountDecimals);
                    if (this.state.isPriceCurrency) trade.r = trade.r.formatCurrency();

                    this.state.trades.unshift({
                        maker_side: trade.t == 0 ? "buy" : "sell",
                        created_at: moment().toISOString(),
                        tid: trade.i,
                        price: trade.r,
                        amount: trade.a,
                        flash: "flash"
                    });
                }
                if (this.state.trades.length > 50) {
                    this.state.trades = this.state.trades.slice(0, 50);
                }
                this.setState({
                    lastPrice: this.state.trades[0].price,
                    trades: this.state.trades
                });

                break;
        }
    }

    getTrades(book) {
        return axios.get("https://api.bitso.com/v3/trades/", {
            params: {book, sort: "desc", limit: 50}
        }).then(message => {
            if (!message.data && !message.data.success) return;
            const response = message.data;
            let trades = response.payload;
            for (let trade of trades) {
                trade.flash = "";
                trade.price = (trade.price * 1).toFixed(this.state.valueDecimals);
                trade.amount = (trade.amount * 1).toFixed(this.state.amountDecimals);
                if (this.state.isPriceCurrency) trade.price = trade.price.formatCurrency();
            }
            this.setState({
                lastPrice: trades[0].price,
                trades,
                loading: false
            });
        });
    }

    /**
     * Render
     * @returns {*} view
     */
    render() {
        if (this.state.loading) return "";
        return (
            <div className="BitsoExchange">
                <Header book={this.state.selectedBook} price={this.state.lastPrice}/>
                <Summary selectedBook={this.state.selectedBook} availableBooks={this.state.availableBooks}
                         onSelectBook={book => this.onSelectBook(book)}/>
                <Container fluid className={"main"}>
                    <Row>
                        <LastTrades book={this.state.selectedBook} trades={this.state.trades}/>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BitsoExchange;