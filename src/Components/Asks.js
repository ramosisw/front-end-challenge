import React, {Component} from "react";
import {Col, Table} from "reactstrap";

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
                    <tbody>
                    {
                        orders.map(order => {
                            let zeros = order.amount.replace(/^[0-9.]+[^0]/g, "");
                            let amount = order.amount.replace(/\.?[0]+$/g, "");
                            return (
                                <tr key={Math.random()} className={order.flash}>
                                    <td>{order.price}</td>
                                    <td className={"sell"}>{order.value}</td>
                                    <td>{amount}<span className={"zeros"}>{zeros}</span></td>
                                    <td>0</td>
                                    <td>-------------------</td>
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

export default Asks;