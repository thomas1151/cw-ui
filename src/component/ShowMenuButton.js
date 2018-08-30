import React from "react";

class ShowMenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        console.log("AHIAHI");

        //Push this into UIMenu, as it is its properties
        let el = document.getElementById('menu-overlay');
        if(this.state.isToggleOn){
            el.classList.add("visible");   
        }else{
            el.classList.remove("visible");   
        }
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick} className="menu col-xs-3" id="menu-toggle"><i className="fa fa-bars" aria-hidden="true"></i><div className="mobile-hidden"> {this.state.isToggleOn ? 'Show' : 'Hide'} Menu</div></button>
        );
    }
}

export default ShowMenuButton;
