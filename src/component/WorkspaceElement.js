import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const style = {
    // border: '1px dashed gray',
    // padding: '0.5rem 1rem',
    // margin: '.5rem',
    // backgroundColor: 'white',
    cursor: 'move'
};


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});



class WorkspaceElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { index: this.props.index };
        this.setIndex = this.setIndex.bind(this);

    }

    setIndex(i) {
        this.setState({index:i})
    }

    render() {
        
        const { isDragging, connectDragSource, text } = this.props;
        const opacity = isDragging ? 0 : 1;
        
        return(
            <Draggable
                key={this.props.item.id}
                draggableId={this.props.item.id}
                index={this.state.index}>
                {(provided, snapshot) => (

                    <li style={style} className={"item col-xs draggable" + this.props.elementType} ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                        <div>{text}</div>
                    </li>
                )}
            </Draggable>


        );
    }
    
    
}
{/* <img className="i-image" src={this.props.item.image}/> */}

export default (WorkspaceElement);
