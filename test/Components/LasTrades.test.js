import React from 'react';
import LastTrades from '../../src/Components/LastTrades';
import renderer from 'react-test-renderer';

console.error = jest.fn();

test('Exception on required props', () => {
    renderer.create(
        <LastTrades/>
    );
    expect(console.error).toHaveBeenCalledTimes(2);
});

test('Render with out errors', () => {
    const component = renderer.create(
        <LastTrades book={"btc_mxn"} trades={[]}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});