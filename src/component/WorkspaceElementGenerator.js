import React from "react";
import WorkspaceElement from "./WorkspaceElement";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Card from "./Card";


// class WorkspaceElementGenerator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             listReady:false,
//             items: [],
//             id: -1,
//             els: []
//         };

//         this.si = "droppable-compartment";
//         this.props.changeLists(this.si, []);
//         this.isListReady = this.isListReady.bind(this);
//     }
//     isListReady(obj) {
//         console.log(obj);
//         console.log("list says ready");
//         // obj.setState({ listReady: true });
//     }
//     doListUpdate(){
//         // console.log("Item added to state")
//     }
//     componentDidMount() {
//         // let w = "";
   
//         // // console.log(w);
//         // fetch("http://192.168.1.108/mats/public_html/api/elements/",{
//         //     mode: 'cors',
//         //     method: 'get',
//         //     headers: {
//         //         Accept: 'application/json'
//         //     }
//         // })
//         //     .then(res => console.log(res))
//         //     .then(res => res.json())
//         //     .then(
//         //         (result) => {
//         //             console.log(result);
//         //             this.setState({
//         //                 isLoaded: true,
//         //                 items: result
//         //             });
                    
//         //             this.state.items.map(function (item, i) {
//         //                 let w = <WorkspaceElement listId={this.state.id} index={i} text={item.title} elementType="" id={item.id} item={item} key={item.id} />                      
//         //                 this.props.changeLists(this.doListUpdate, this.si, [...this.props.scaleLists[this.si],w]);
//         //                 this.setState({
//         //                     els: [...this.state.els, w]
//         //                 })
//         //             }, this)
                    
//         //         },
//         //         // Note: it's important to handle errors here
//         //         // instead of a catch() block so that we don't swallow
//         //         // exceptions from actual bugs in components.
//         //         (error) => {
//         //             this.setState({
//         //                 isLoaded: true,
//         //                 error
//         //             });
//         //         }
//         //     )
//     }

//     render() {
//         const { error, isLoaded, items,els } = this.state;
//         const a = this.a;
//         if (error) {
//             return <div>Error: {error.message}</div>;
//         } else if (!isLoaded) {
//             return <div>Loading...</div>;
        
//         // } else if (!this.state.listReady){
//         //     return <div> List Loading </div>;
//         }   
//         else if(!this.listReady){
//             return <div>LIST STILL Won't LOAD</div>
//         }
//         else{
//             console.log(this.props.scaleLists[this.si]);
//             return (
//                 <Droppable droppableId={this.si}>
//                     {(provided, snapshot) => (
//                         <div
//                             ref={provided.innerRef}
//                             style={getListStyle(snapshot.isDraggingOver)}>
//                             {provided.placeholder}

//                             {this.props.scaleLists[this.si].map((item, index) =>
//                                 <Draggable
//                                     key={item.props.item.id}
//                                     draggableId={item.props.item.id}
//                                     index={index}>
//                                     {(provided, snapshot) => (

//                                         <li className={"item col-xs draggable" + item.props.elementType} ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             style={getItemStyle(
//                                                 snapshot.isDragging,
//                                                 provided.draggableProps.style
//                                             )}>
//                                             <div>{item.props.text}</div>
//                                         </li>


//                                     )}
//                                 </Draggable>
//                             )}


//                             {/* {this.props.scaleLists[this.si]} */}
//                             })
//                         </div>
//                     )}
//                 </Droppable>
//             );
//         }

//     }
// }
// export default WorkspaceElementGenerator;
