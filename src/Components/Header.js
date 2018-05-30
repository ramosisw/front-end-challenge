import React, {Component} from "react";
import {
    Collapse,
    NavbarToggler,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavDropdown,
    NavLink
} from "reactstrap";

//import Assets
import logo from '../../Assets/Images/SVG/bitso_logo.svg';


class Header extends Component {
    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    /**
     * Toggle collapse navbar
     */
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="//bitso.com">
                    <img src={logo} alt="bitso" className="logo"/> | EXCHANGE
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">1 BTC = 000,000,00 MXN</NavLink>
                        </NavItem>




                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;