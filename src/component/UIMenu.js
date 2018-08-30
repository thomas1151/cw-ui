import React from "react";
import WorkspaceElementGenerator from "./WorkspaceElementGenerator";
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '' : '',
});


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',
    // styles we need to apply on draggables
    ...draggableStyle
});


class UIMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: false };
    }
    render() {
        return (
            <div className="menu-overlay col" id="menu-overlay">
                <div className="title-bar">
                    <div className="title">
                        Elements Dashboard
                    </div>
                    <div className="buttons">
                        <button className="closeDash">Close</button>
                    </div>

                </div>
                <div className="column menu scale-list">
                <Droppable droppableId="ui_menu" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}                                            
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    className="">

                                    <button className={"item new-element"}>                                       
                                        <div>New</div>
                                    </button>
                                    {this.props.lists.ui_menu.map((item, index) => {
                                            return(
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (

                                                    <div className={"item draggable " + item.elementType} ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <div>{item.title}</div>
                                                    </div>


                                                )}
                                            </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                </Droppable>
                </div>

                <div className="column menu bottom-menu-items">
                    <div className={ "topic-wrap "+(this.props.showTopicChange ? 'active' : 'inactive') }>
                    <div className="topicDrop">
                    <Droppable  droppableId="ui_menu_topic_change">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}                                            
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    className={"topic "+(snapshot.isDraggingOver ? 'hovering' : '')}
                                    >
                                    {provided.placeholder}
                                   
                                    Current Topic: {this.props.lists.ui_menu_topic_change[0].title}
                                    </div>

                            )}
                    </Droppable>
                    </div>
                    </div>
                </div>
            </div>
            
        )
    }

}

export default UIMenu;
