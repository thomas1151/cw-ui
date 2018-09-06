import React from "react";
import App from "./App";
import { BrowserRouter,Route } from 'react-router-dom';
import { SrcContext } from "./contexts/api-context";

class AppWrapper extends React.Component {
    render() {
        return (
            <BrowserRouter>
                    <Route path="/" render={() =>{
                        return(
                                <App src={ {url:'192.168.1.107'}}/>  
                        )
                    }}/>
            </BrowserRouter>
        )
    }
}

export default AppWrapper;
