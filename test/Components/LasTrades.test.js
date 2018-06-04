import React from 'react';
import LastTrades from '../../src/Components/LastTrades';
import renderer from 'react-test-renderer';

console.error = jest.fn();

test('Exception on required props', () => {
    const component = renderer.create(
        <LastTrades/>
    );
    expect(console.error).toHaveBeenCalledTimes(2);
});