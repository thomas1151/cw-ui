import React from "react";
import { Checkbox } from "./Checkbox";
import { SrcContext } from "../contexts/api-context";
import axios from "axios";

class ChangeScale extends React.Component {
    constructor(props) {
        super(props);
        this.updatePreserve = this.updatePreserve.bind(this);
        this.onSub = this.onSub.bind(this);
        this.state = {
            text: "",
        }
    }

    updateText(e) {

    }
    updatePreserve(e) {

    }
    onSub() {

        
    }
    render() {
        return (
            <div class="modal-card focused-element">
                <div class="card-header">
                    <h2>Change the Scale in Use</h2>
                    <button onClick={this.props.toggleScaleChange} class="quit-modal">X</button>
                </div>
                <div class="modal-form">
                    <div class="form-element">
                        <label for="element-text" >New Scale</label>
                        <select className="element=text">
                            <option>Select a Scale</option>
                        </select>
                        <div className="selectable-wrapper">
                            {this.props.scales.map( (el,i)=>{
                                return(<button onClick={() => this.props.onScaleChange(el)} className={"scale card-selectable "+(el.title === this.props.currentScaleType && 'selected')}>
                                    <div className="card-title">
                                        {el.title}
                                    </div>
                                    <div className="card-details-array">
                                        {el['children_min'].map( (el,i)=>{
                                            return(
                                                <div className="scale-img">
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="card-summary">
                                        {el.summary}
                                    </div>
                                </button>)
                            })}
                        </div>

                    </div>
                    <button class="sub-button" onClick={this.onSub} type="button">Submit</button>
                </div>
            </div>
        );
    }
}


export default props => (
    <SrcContext.Consumer>
        {src => <ChangeScale {...props} src={src} />}
    </SrcContext.Consumer>
);
