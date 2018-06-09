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
        const {orders} = this.props;
        if (!orders) return "";
        return (
            <Col md={"6"} className={"asks"}>
                <div className={"table-header"}>
                    <h2>posturas de venta</h2>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th><span className={"currency-price"}>mxn</span>precio</th>
                        <th><span className={"currency-price"}>mxn</span>valor</th>
                        <th><span className={"currency-amount"}>btc</span>monto</th>
                        <th>sum</th>
                        <th></th>
                    </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {
                            orders.map(order => {
                                let zeros = order.str_amount.replace(/^[0-9.]+[^0]/g, "");
                                let amount = order.str_amount.replace(/\.?[0]+$/g, "");
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