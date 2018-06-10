import React, {Component} from "react";
import {Col} from "reactstrap";

class Markerts extends Component {
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
        return (
            <Col md={3} className={"col-md-3 float-left col-1 pl-0 pr-0 collapse width show"} id={"markerts"}>
                <div id={"toggle"}>
                    <span>mercados</span>
                </div>
            </Col>
        );
    }
}

export default Markerts;