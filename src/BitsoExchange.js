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

class BitsoExchange extends Component {


    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedBook: null,
            firstBook: null,
            availableBooks: null,
            loading: true,
            trades: []
        };

        this.onSelectBook = this.onSelectBook.bind(this);
        this.onMessage = this.onMessage.bind(this);
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
                state.loading = false;
                _this.setState(state);
            }
        });
        this.websocket = new WebSocket("wss://ws.bitso.com");
        this.websocket.onopen = () => {
            this.websocket.send(
                JSON.stringify({
                    action: "subscribe",
                    book: _this.state.selectedBook,
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
        };
        this.websocket.onmessage = this.onMessage;
    }

    /**
     *
     */
    componentWillUnmount() {
        this.websocket.close();
    }

    onSelectBook(book) {
        console.log("selected book: " + book);
        this.setState({
            selectedBook: book
        })
    }

    onMessage(message) {
        let response;
        if (message.data) response = JSON.parse(message.data);
        if (response.action) return console.log(response);
        switch (response.type) {
            case "trades":
                console.log("TradeResponse" + JSON.stringify(response.payload));
                this.setState({
                    trades: response.payload
                });
                break;
        }
    }

    /**
     * Render
     * @returns {*} view
     */
    render() {
        if (this.state.loading) return <Header/>;
        return (
            <div className="App">
                <Header/>
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