import React from "react";

class NewElementForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="modal-card focused-element" tabindex="0">
                <div class="card-header">
                    <h2>Create Blank Element</h2>
                    <button class="quit-modal">X</button>
                </div>
                <form class="modal-form">
                    <div class="form-element">
                        <label for="element-text" tabindex="0">Element Text</label>
                        <input type="text" name="element-text"/>
                    </div>
                    <div class="form-element">
                        <label for="preserve-element" tabindex="0">Save this element</label>
                        <div class="custom-checkbox">
                            <input type="checkbox" value="1" id="custom-checkbox" name="preserve-element" checked />
                            <label for="custom-checkbox"></label>
                        </div>
                    </div>
                    <button class="sub-button" type="button" tabindex="0" >Submit</button>
                </form>
            </div>
        );
    }
}

export default NewElementForm;
