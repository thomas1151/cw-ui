import React from "react";
import ShowMenuButton from "./ShowMenuButton";
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '',
});


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',
    // styles we need to apply on draggables
    ...draggableStyle
});


class FooterControls extends React.Component {
    render() {
        return (
            <div className="controls">
                <div className="row center-xs">
                    <div className="left-controls control-group col-xs-4">
                        <div className="row">
                            <button onClick={this.props.toggleMenu} className="menu col-xs-3" id="menu-toggle"><i className="fa fa-bars" aria-hidden="true"></i><div className="mobile-hidden">Show Menu</div></button>
                            <button onClick={this.props.toggleScaleChange} className="menu col-xs-3" id="menu-toggle"><i className="fa fa-columns" aria-hidden="true"></i><div className="mobile-hidden">Change Scale</div></button>

                            {/* <ShowMenuButton  /> */}
                            {/* <div className="last-topic col-xs" id="last-topic">Last Topic: <span>None</span></div> */}
                        </div>
                    </div>

                    <div className="center-controls control-group  col-xs-4">

                        <div className="active-topic col-xs" id="active-topic">
  
                                        {this.props.lists.ui_menu_topic_change[0].title}
                                        
                        </div>
                        <label className="ui-label col-xs" htmlFor="active-topic" id="active-topic-label">Current Topic</label>
                    </div>  

                    <div className="right-controls  control-group col-xs-4">
                        <div className="row end-xs">
                            <button className="end-session col-xs-3" onClick={this.props.onReset}><i className="fa fa-undo" aria-hidden="true"></i><div className="mobile-hidden">Reset</div></button>
                            {/* <button className="end-session col-xs-3"><i className="fa fa-backward" aria-hidden="true"></i><div className="mobile-hidden">Back to last topic</div></button> */}
                            {/* <button className="end-session col-xs-3"><i className="fa fa-camera " aria-hidden="true"></i><div className="mobile-hidden">Snapshot</div></button> */}
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default FooterControls;
