import React from "react";
import App from "./App";
import { BrowserRouter,Route } from 'react-router-dom';

class AppWrapper extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        )
    }
}

export default AppWrapper;
