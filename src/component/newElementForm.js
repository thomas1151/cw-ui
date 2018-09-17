import React from "react";
import { Checkbox } from "./Checkbox";
import { SrcContext } from "../contexts/api-context";
import axios from "axios";

class NewElementForm extends React.Component {
    constructor(props) {
        super(props);
        this.updatePreserve = this.updatePreserve.bind(this);
        this.onSub = this.onSub.bind(this);
        this.state = {
            text: "",
            preserve: false,
        }
    }
    updateText(e){
        this.setState({text:e.target.value})
    }
    updatePreserve(e){
        this.setState({preserve: !(this.state.preserve)})
    }
    onSub(){
        let result = {};
        result['title'] = this.state.text;
        result['preserve'] = this.state.preserve;
        result['date'] = new Date();
        result['created'] = '';
        result['id'] = Math.random(-50,0);
        if(this.state.preserve){
            console.log(result);
            axios.post(this.props.src.url+"api/post/element", result)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });  
        }
        if(this.props.handleAddNewElement){
            this.props.handleAddNewElement(result)
        }
    }
    render() {
        return (
            <div class="modal-card focused-element">
                <div class="card-header">
                    <h2>Create Blank Element</h2>
                    <button onClick={this.props.toggleShowNewElement} class="quit-modal">X</button>
                </div>
                <div class="modal-form">
                    <div class="form-element">
                        <label for="element-text" >Element Text</label>
                        <input onChange={(e) => this.updateText(e)} type="text" name="element-text"/>
                    </div>
                    <div class="form-element">
                        <label for="preserve-element">Save this element</label>
                        <Checkbox onChange={this.updatePreserve}/>
                        {/* <div class="custom-checkbox">
                            <input type="checkbox" value="1" id="custom-checkbox" name="preserve-element" checked />
                            <label for="custom-checkbox"></label>
                        </div> */}
                    </div>
                    <button class="sub-button" onClick={this.onSub} type="button">Submit</button>
                </div>
            </div>
        );
    }
}


export default props => (
    <SrcContext.Consumer>
        {src => <NewElementForm {...props} src={src} />}
    </SrcContext.Consumer>
);
