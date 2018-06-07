import React from 'react';
import LastTrades from '../../src/Components/LastTrades';
import renderer from 'react-test-renderer';

console.error = jest.fn();
const componentName = "LastTrades ";

test(componentName + 'Exception on required props', () => {
    renderer.create(
        <LastTrades/>
    );
    expect(console.error).toHaveBeenCalledTimes(2);
});

test(componentName + 'Render with out errors', () => {
    const component = renderer.create(
        <LastTrades book={"btc_mxn"} trades={[]}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test(componentName + 'Render trade', () => {
    const component = renderer.create(
        <LastTrades book={"btc_mxn"} trades={[{
            tid: 7693045,
            amount: "0.00099991",
            price: "153697.55",
            flash: "",
            maker_side: "buy",
            created_at: 1235123412
        }]}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test(componentName + 'Render 10 Trades', () => {
    const _10Trades = [{
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:01+0000",
        "amount": "0.01020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:02+0000",
        "amount": "0.02020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:03+0000",
        "amount": "0.03020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:04+0000",
        "amount": "0.04020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:05+0000",
        "amount": "0.05020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:06+0000",
        "amount": "0.06020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:07+0000",
        "amount": "0.07020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:08+0000",
        "amount": "0.08020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:09+0000",
        "amount": "0.09020640",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }, {
        "book": "btc_mxn",
        "created_at": "2018-06-03T18:59:10+0000",
        "amount": "0.01002060",
        "maker_side": "sell",
        "price": "154097.40",
        "tid": 7693079
    }];
    const component = renderer.create(
        <LastTrades book={"btc_mxn"} trades={_10Trades}/>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});