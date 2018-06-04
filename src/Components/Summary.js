import React, {Component} from "react";
import PropTypes from "prop-types";

import {Container, Dropdown, DropdownMenu, DropdownToggle, Nav, Navbar, NavItem, NavLink} from "reactstrap";

/**
 * Resumen del exchange para ver rapidamente
 * .- Volumen 24 hrs.
 * .- Max. Precio
 * .- Min. Precio
 * .- Variación
 */
class Summary extends Component {
    /**
     * Default constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableBooks: props.availableBooks,
            isOpen: false,
            onSelectBook: props.onSelectBook
        };
        this.onSelectBook = this.onSelectBook.bind(this);
    }

    onSelectBook(book) {
        console.log(book);
        this.state.onSelectBook(book);
    }

    render() {
        const {selectedBook} = this.props;
        const book = selectedBook.replace("_", "/");
        return (
            <Navbar expand="md" dark={true} className={"sub-nav"}>
                <Container fluid>
                    <Nav className="nav float-left" navbar>
                        <Dropdown nav toggle={() => {
                        }} isOpen={this.state.isOpen}>
                            <DropdownToggle nav caret>
                                {book}
                            </DropdownToggle>
                            <DropdownMenu tag={"ul"}>
                                {this.state.availableBooks.map(item => {
                                    const book = item.book.replace("_", "/");
                                    return (
                                        <NavItem key={item.book}>
                                            <NavLink href="javascript:;"
                                                     onClick={() => this.onSelectBook(item.book)}>{book}</NavLink>
                                        </NavItem>
                                    );
                                })}
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

Summary.propTypes = {
    selectedBook: PropTypes.string.isRequired,
    availableBooks: PropTypes.array.isRequired,
    onSelectBook: PropTypes.func.isRequired
};

export default Summary;