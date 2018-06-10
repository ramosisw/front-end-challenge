import React, {Component} from "react";
import {Col, Table} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PropTypes from 'prop-types';
import moment from "moment";

/**
 * Ultimos trades
 */
class LastTrades extends Component {
    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders view
     * @returns {*}
     */
    render() {
        const {book, trades} = this.props;
        if (!trades || !book) return "";

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
                    <TransitionGroup component="tbody">
                        {
                            trades.map(trade => {
                                let zeros = trade.amount.replace(/^[0-9.]+[^0]/g, "");
                                let amount = trade.amount.replace(/\.?[0]+$/g, "");
                                let flashClass = trade.flash ? `flash-${trade.maker_side}` : '';
                                return (
                                    <CSSTransition key={trade.tid} timeout={700} classNames={flashClass}>
                                        <tr>
                                            <td>{moment(trade.created_at).format("H:mm:ss")}</td>
                                            <td className={trade.maker_side}>{trade.price}</td>
                                            <td>{amount}<span className={"zeros"}>{zeros}</span></td>
                                        </tr>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </Table>
            </Col>
        );
    }
}

LastTrades.propTypes = {
    book: PropTypes.string.isRequired,
    trades: PropTypes.array.isRequired,
};

export default LastTrades;