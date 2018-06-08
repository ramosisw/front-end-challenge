import React, {Component} from "react";
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
                    <tbody>
                    {
                        orders.map(order => {
                            let zeros = order.amount.replace(/^[0-9.]+[^0]/g, "");
                            let amount = order.amount.replace(/\.?[0]+$/g, "");
                            return (
                                <tr key={Math.random()} className={order.flash}>
                                    <td>-------------------</td>
                                    <td>0</td>
                                    <td>{amount}<span className={"zeros"}>{zeros}</span></td>
                                    <td className={"buy"}>{order.value}</td>
                                    <td>{order.price}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </Col>
        );
    }
}

export default Bids;