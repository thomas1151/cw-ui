import React from "react";
import App from "./App";
import { BrowserRouter,Route } from 'react-router-dom';
import { SrcContext } from "./contexts/api-context";

const AppWithSrcContext = (props) =>{
    return(
        <SrcContext.Consumer>
            {src =>
            <App src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}
class AppWrapper extends React.Component {
    render() {
        return (
            <BrowserRouter>
                    <Route path="/" render={AppWithSrcContext}/>
            </BrowserRouter>
        )
    }
}

export default AppWrapper;
