import React, {Component} from "react";
import {
    Collapse,
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
import PropTypes from 'prop-types';
//import Assets
import logo from '../../Assets/Images/SVG/bitso_logo.svg';


class Header extends Component {
    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isOpen: false
        };
    }

    /**
     * Toggle collapse navbar
     */
    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /**
     * Render view
     * @returns {*}
     */
    render() {
        const {book, price} = this.props;
        if (!book || !price) return "";
        const currencies = book.split("_");
        const currency_amount = currencies[0];
        const currency_price = currencies[1];
        return (
            <Navbar expand="md" dark={true}>
                <Container fluid>
                    <NavbarBrand href="//bitso.com">
                        <img src={logo} alt="bitso" className="logo"/>
                    </NavbarBrand>
                    <div className="logo-divider d-none d-md-block"/>
                    <NavLink href="#" className="apparment float-left">EXCHANGE</NavLink>
                    <NavbarToggler onClick={this.toggleNav}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto nav" navbar>
                            <NavItem>
                                <NavLink href={"#"}
                                         className={"price"}>1 {currency_amount} = {price} {currency_price}</NavLink>
                            </NavItem>
                            <NavItem className="menu-divider d-none d-md-block"/>
                            <Dropdown nav toggle={() => {
                            }}>
                                <DropdownToggle nav caret>
                                    Wallet
                                </DropdownToggle>
                                <DropdownMenu tag={"ul"}>
                                    <NavItem>
                                        <NavLink href="#">Option 1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Option 2</NavLink>
                                    </NavItem>
                                    <DropdownItem divider/>
                                    <NavItem>
                                        <NavLink href="#">Option 2</NavLink>
                                    </NavItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown nav toggle={() => {
                            }}>
                                <DropdownToggle nav caret>
                                    Exchange
                                </DropdownToggle>
                                <DropdownMenu tag={"ul"}>
                                    <NavItem>
                                        <NavLink href="#">Trading</NavLink>
                                    </NavItem>
                                    <DropdownItem divider/>
                                    <NavItem>
                                        <NavLink href="#">Resumen</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Live Trades</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Posturas</NavLink>
                                    </NavItem>
                                </DropdownMenu>
                            </Dropdown>
                            <NavItem>
                                <NavLink href="#">Ayuda</NavLink>
                            </NavItem>
                            <NavItem>
                                <img
                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhLS0gR2VuZXJhdG9yOiBHcmF2aXQuaW8gLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJfY2xpcFBhdGhfa1czR0R0c0o3VDg2RlRVaDhIQ0pxb0tJN3AwZEpMakYiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwUGF0aF9rVzNHRHRzSjdUODZGVFVoOEhDSnFvS0k3cDBkSkxqRikiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiIGZpbGw9InJnYigxMTksMTE5LDExOSkiLz48L2c+PC9zdmc+"
                                    alt="user-photo-profile"
                                    className="img-thumbnail rounded-circle user-profile-photo d-none d-md-inline"/>
                            </NavItem>
                            <Dropdown nav toggle={() => {
                            }}>
                                <DropdownToggle nav caret className={"menu-profile"}>
                                    Usuario
                                </DropdownToggle>
                                <DropdownMenu tag={"ul"}>
                                    <NavItem>
                                        <NavLink href="#">Perfil</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Salir</NavLink>
                                    </NavItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

Header.propTypes = {
    book: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default Header;