import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "reactstrap";
import {polyfill} from "babel-polyfill";
import "../Assets/Fonts/DINPro-Light.otf";
import "../Assets/Fonts/DINPro-Medium.otf";
import "../Assets/Fonts/DINPro-Regular.otf";

import Header from "./Components/Header";
import Summary from "./Components/Summary";
import LastTrades from "./Components/LastTrades";
import moment from "moment/moment";
import Chart from "./Components/Chart";
import Bids from "./Components/Bids";
import Asks from "./Components/Asks";

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
            asks: [],
            bids: [],
            isPriceCurrency: false,
            lastPrice: "$ 0.00",
            tickerInterval: null,
            ticker: null
        };

        this.onSelectBook = this.onSelectBook.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    /**
     * Register websocker on book
     * @param book to register
     */
    websocketRegister(book) {
        if (!this.websocket || this.websocket === undefined) return;
        this.websocket.send(
            JSON.stringify({
                action: "subscribe",
                book,
                type: "trades"
            })
        );
        this.websocket.send(
            JSON.stringify({
                action: "subscribe",
                book,
                type: "diff-orders"
            })
        );
    }

    /**
     * Get ticker every second
     * @param book
     */
    tickerRegister(book) {
        if (this.state.tickerInterval) {
            clearInterval(this.state.tickerInterval);
            this.setState({ticker: null});
        }
        const tickerInterval = setInterval(() => {
            axios.get("https://api.bitso.com/v3/ticker/", {
                params: {book}
            }).then(message => {
                if (!message.data && !message.data.success) return;
                const response = message.data;

                let ticker = response.payload;
                ticker.variation = (ticker.last * 1 - ticker.vwap * 1);
                ticker.variation_percent = ticker.variation / (ticker.vwap * 1);
                let positive = ticker.variation > 0;
                ticker.variation = Math.abs(ticker.variation);
                ticker.variation_percent = Math.abs(ticker.variation_percent);
                if (this.state.isPriceCurrency) {
                    ticker.high = ticker.high.formatCurrency();
                    ticker.low = ticker.low.formatCurrency();
                    ticker.variation = ticker.variation.toFixed(this.state.valueDecimals).formatCurrency();
                }
                ticker.variation = (positive ? "+" : "-") + ticker.variation;
                ticker.variation_percent = (positive ? "" : "-") + ticker.variation_percent.toFixed(2);
                this.setState({ticker});
            });
        }, 1000);
        this.setState({tickerInterval});
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

    getDecimals(currency) {
        switch (currency) {
            case 'xau':
            case 'xrp':
                return 6;
            case 'btc':
            case 'eth':
            case 'bch':
            case 'ltc':
                return 8;
            case 'mxn':
            case 'cad':
            case 'usd':
            default:
                return 2;
        }
    }

    /**
     * When book is selected
     * @param book
     */
    onSelectBook(book) {
        console.log("selected book: " + book);
        //Close if is open
        if (this.websocket || this.websocket !== undefined) {
            this.websocket.close();
        }

        this.websocket = new WebSocket("wss://ws.bitso.com")
        this.websocket.onopen = () => {
            this.websocketRegister(book);
        };
        this.websocket.onmessage = this.onMessage;

        let b_split = book.split("_");
        let isPriceCurrency = b_split.length >= 2 && b_split[1].toLowerCase() == this.state.nationalCurrency;

        let amountDecimals = this.getDecimals(b_split[0]);
        let valueDecimals = this.getDecimals(b_split[1]);

        this.setState({
            amountDecimals,
            valueDecimals,
            isPriceCurrency,
            selectedBook: book,
            trades: [],
            lastPrice: "$ 0.00"
        });
        this.tickerRegister(book);
        this.getTrades(book);
        this.getOrders(book);
    }

    /**
     * When a message received on websocket, process here
     * @param message
     */
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
            case 'diff-orders':
                //console.log(response);
                break;
        }
    }

    /**
     * Get the last 50 trades
     * @param book of trades
     * @returns {Promise<AxiosResponse<any>>}
     */
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

    getOrders(book) {
        return axios.get("https://api.bitso.com/v3/order_book/", {
            params: {book}
        }).then(message => {
            if (!message.data && !message.data.success) return;
            const response = message.data;
            console.log(response);
            let orders = response.payload;
            let asks = orders.asks;
            let bids = orders.bids;

            for (let ask of asks) {
                ask.value = (ask.price * ask.amount).toFixed(this.state.valueDecimals);
                if (this.state.isPriceCurrency) {

                }
            }

            for (let bid of bids) {
                bid.value = (bid.price * bid.amount).toFixed(this.state.valueDecimals);
                if (this.state.isPriceCurrency) {

                }
            }

            this.setState({asks, bids});
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
                         onSelectBook={book => this.onSelectBook(book)} ticker={this.state.ticker}/>
                <Container fluid className={"main"}>
                    <Row>
                        <LastTrades book={this.state.selectedBook} trades={this.state.trades}/>
                        <Col md={"9"} className={"last-trades"}>
                            <Chart/>
                            <Row>
                                <Bids orders={this.state.bids}/>
                                <Asks orders={this.state.asks}/>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BitsoExchange;