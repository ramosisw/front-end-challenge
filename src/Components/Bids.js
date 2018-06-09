import React, {Component} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Col, Table} from "reactstrap";

class Bids extends Component {
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
            <Col md={"6"} className={"bids"}>
                <div className={"table-header"}>
                    <h2>posturas de compra</h2>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>sum</th>
                        <th><span className={"currency-amount"}>btc</span>monto</th>
                        <th><span className={"currency-price"}>mxn</span>valor</th>
                        <th><span className={"currency-price"}>mxn</span>precio</th>
                    </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {
                            orders.map(order => {
                                let zeros = order.str_amount.replace(/^[0-9.]+[^0]/g, "");
                                let amount = order.str_amount.replace(/\.?[0]+$/g, "");
                                return (
                                    <CSSTransition key={order.key} timeout={700} classNames={"bid-flash"}>
                                        <tr>
                                            <td>-------------------</td>
                                            <td>{order.sum}</td>
                                            <td>{amount}<span className={"zeros"}>{zeros}</span></td>
                                            <td className={"buy"}>{order.value}</td>
                                            <td>{order.str_price}</td>
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

export default Bids;