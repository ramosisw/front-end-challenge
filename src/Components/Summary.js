import React, {Component} from "react";
import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from "reactstrap";


class Summary extends Component {
    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar expand="md" dark={true} className={"sub-nav"}>
                <Container fluid>
                    <Nav className="nav float-left" navbar>
                        <Dropdown nav toggle={() => {
                        }}>
                            <DropdownToggle nav caret>
                                BTC/MXN
                            </DropdownToggle>
                            <DropdownMenu tag={"ul"}>
                                <NavItem>
                                    <NavLink href="#">Option 1</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Option 2</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Option 2</NavLink>
                                </NavItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                    <div className={"row float-left"}>
                        <p>Volumen 24hrs. <span className={"value"}>000.00000000</span><span
                            className={"currency"}>BTC</span></p>
                        <p>Max. <span className={"value"}>000,000.00</span><span className={"currency"}>MXN</span></p>
                        <p>Min. <span className={"value"}>000,000.00</span><span className={"currency"}>MXN</span></p>
                        <p>Variación <span className={"value"}>000,000.00</span><span
                            className={"currency"}>MXN</span><span className={"percent"}>(0.0%)</span></p>
                    </div>
                </Container>
            </Navbar>
        );
    }
}

export default Summary;