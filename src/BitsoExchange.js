import React, {Component} from "react";
import "../Assets/Fonts/DINPro-Light.otf";
import "../Assets/Fonts/DINPro-Medium.otf";
import "../Assets/Fonts/DINPro-Regular.otf";

import Header from "./Components/Header";
import Summary from "./Components/Summary";

class BitsoExchange extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Summary/>
            </div>
        );
    }
}

export default BitsoExchange;