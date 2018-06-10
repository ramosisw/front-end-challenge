import React, {Component} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Col, Table} from "reactstrap";
import PropTypes from 'prop-types';

class Asks extends Component {
    /**
     * Default constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders
     */
    render() {
        const {orders, book} = this.props;
        if (!orders || !book) return "";
        const currencies = book.split("_");
        const currency_amount = currencies[0];
        const currency_price = currencies[1];
        return (
            <Col md={"6"} className={"asks"}>
                <div className={"table-header"}>
                    <h2>posturas de venta</h2>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th><span className={"currency-price"}>{currency_price}</span>precio</th>
                        <th><span className={"currency-price"}>{currency_price}</span>valor</th>
                        <th><span className={"currency-amount"}>{currency_amount}</span>monto</th>
                        <th>sum</th>
                        <th></th>
                    </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {
                            orders.map(order => {
                                const zeros = order.str_amount.replace(/^[0-9.]+[^0]/g, "");
                                const amount = order.str_amount.replace(/\.?[0]+$/g, "");
                                return (
                                    <CSSTransition key={order.key} timeout={700} classNames={"ask-flash"}>
                                        <tr>
                                            <td>{order.str_price}</td>
                                            <td className={"sell"}>{order.value}</td>
                                            <td>{amount}<span className={"zeros"}>{zeros}</span></td>
                                            <td>{order.sum}</td>
                                            <td>-------------------</td>
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

Asks.propTypes = {
    orders: PropTypes.array.isRequired,
};

export default Asks;