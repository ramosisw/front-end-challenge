import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
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
            <Navbar expand="md" dark={true}>
                <NavbarBrand href="//bitso.com">
                    <img src={logo} alt="bitso" className="logo"/>
                </NavbarBrand>
                <div className="logo-divider d-none d-md-block"/>
                <NavLink href="#" className="apparment float-left">EXCHANGE</NavLink>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">1 BTC = 000,000,00 MXN</NavLink>
                        </NavItem>
                        <NavItem className="menu-divider d-none d-md-block"/>
                        <NavItem>
                            <NavLink href="#">Wallet</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Exchange</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Ayuda</NavLink>
                        </NavItem>
                        <NavItem>
                            <img
                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhLS0gR2VuZXJhdG9yOiBHcmF2aXQuaW8gLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJfY2xpcFBhdGhfa1czR0R0c0o3VDg2RlRVaDhIQ0pxb0tJN3AwZEpMakYiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwUGF0aF9rVzNHRHRzSjdUODZGVFVoOEhDSnFvS0k3cDBkSkxqRikiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiIGZpbGw9InJnYigxMTksMTE5LDExOSkiLz48L2c+PC9zdmc+"
                                alt="user-photo-profile"
                                className="img-thumbnail rounded-circle user-profile-photo d-none d-md-inline"/>
                            <NavLink href="#" style={{display: "inline-block"}}>Usuario</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;