import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/Components/Header';

console.error = jest.fn();
const componentName = "Header ";

test(componentName + "Exception on required props", () => {
    renderer.create(
        <Header/>
    );
    expect(console.error).toHaveBeenCalledTimes(2);
});

test(componentName + "Render OK", () => {
    const component = renderer.create(
        <Header book={"btc_mxn"} price={"$ 150,000.00"}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test(componentName + "Toggle nav", () => {
    const component = renderer.create(
        <Header book={"btc_mxn"} price={"$ 150,000.00"}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //Header.toggleNav();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});