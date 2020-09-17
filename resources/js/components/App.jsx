import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Top from "./Top";

const App = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Top />
            </React.Fragment>
        </BrowserRouter>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
