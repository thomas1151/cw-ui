import React, {Component} from "react";
// import { DragSource } from 'react-dnd';
import WorkspaceElement from "./WorkspaceElement";
// import update from 'react-addons-update';
// import update from 'react/lib/update';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// const scaleTarget = {
//     drop(props) {
//         console.log("Card has been dropped")

//     }
// };

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : null,
    // width: #250
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});


/**
 * Moves an item from one list to another list.
**/

class ScaleElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], listReady: false};

        // this.props.changeLists(this.isListReady(),this.props.string_identifier, [],this);
        // this.isListReady = this.isListReady.bind(this);

    }
    isListReady(obj){
        // obj.setState({listReady:true});
    }
    componentWillReceiveProps(props) {
        const { refresh, id } = this.props;
        if (props.refresh !== refresh) {
            
        }
    }

    
    render() {
        if (this.props.lists.hasOwnProperty(this.props.string_identifier)) {           
            return(
                <div className={"scale-group col-xs "+this.props.scaleListClasses}>
                    <div className="scale-header">
                        <div className="scale-value col-xs">{this.props.text}</div>

                    </div>
                    <div className="scale-list col-xs ">
                        <Droppable droppableId={this.props.string_identifier}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}                                            
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    className="listWrap">
                                    {this.props.lists[this.props.string_identifier].map((item, index) =>{
                                            return(<Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (

                                                    <li className={"item col-xs draggable"} ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <div><img alt="" src={item.image}/>{item.title}</div>
                                                    </li>


                                                )}
                                            </Draggable>)
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>


                        
                    </div>
                </div>

            );
        } else {    
            return <div>Loading...</div>;
        }
    }
}


export default (ScaleElement);



// export default DropTarget('workspace-element', scaleTarget, collect)(ScaleElement);

// export default ScaleElement;
