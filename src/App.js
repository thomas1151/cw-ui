// import React from "react";
// import ReactDOM from 'react-dom';
// import { DragDropContext } from 'react-dnd';
// import TouchBackend from 'react-dnd-touch-backend';
// import HTML5Backend from 'react-dnd-html5-backend';
// 
import UIMenu from "./component/UIMenu";
import ScalesLoader from "./component/ScalesLoader";
import FooterControls from "./component/FooterControls";
import { withRouter } from 'react-router-dom';

// import { default as DragPreview } from '../logic/DragPreview.jsx';
// import Container from "../dustbin/Container.tsx";
// import MultiBackend, { HTML5DragTransition, TouchTransition } from "../../node_modules/dnd-multi-backend/src/index.js";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from "axios";
import queryString from './problem_modules/query-string';
import ScaleElement from "./component/ScaleElement";
import NewElementForm from "./component/newElementForm";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

const compress = (list) => {
    for (let i = 0; i <= list.length; i++) {
        console.log(list[i]);
        list[i].setState({index: i});
    }
}

const setIndex = (item,i) => {
    item.setState({ index: i })
}
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {

    console.log("Reorder vars");
    console.log(list);
    console.log(startIndex+" : "+endIndex);
    const result = Array.from(list);
    console.log(result);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    // compress(list);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    console.log("DEST");
    console.log(droppableDestination);
    
    let removed = Object.assign({}, sourceClone[droppableSource.index])
    destClone.splice(droppableDestination.index, 0, removed);
    console.log(removed);

    if(droppableDestination.droppableId === "ui_menu_topic_change"){
        
        destClone[droppableDestination.index].id += "-now-topic"
        console.log(removed);
    }else{
        sourceClone.splice(droppableSource.index,1);
    }

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log(result);
    return  result

};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class App extends Component {
    constructor(props) {
        super(props);
        this.changeLists = this.changeLists.bind(this);
        this.calcListsToUse = this.calcListsToUse.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleShowNewElement = this.toggleShowNewElement.bind(this);
        this.handleAddNewElement = this.handleAddNewElement.bind(this);
        this.calcListsToUse();
        this.state = {
            showUiMenu: false,
            showModal: false,
            showNewElement: false,
            lists: {ui_menu: [],ui_menu_topic_change:[{created:0,
            id:-1,
            image:null,
            title:"No Topic"}] }
    
        };
    }
    toggleMenu(){
        this.setState({showUiMenu: !this.state.showUiMenu})
    }
    renderNewElementForm(){
        return (<NewElementForm handleAddNewElement={this.handleAddNewElement} toggleShowNewElement={this.toggleShowNewElement}/>)
    }
    calcListsToUse(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        let stid = "linear1to3";
        if(params.lt){
            stid = params.lt;
        }
        let self =this;
        axios.get(this.props.src.url +'api/get/scale/?stid='+stid)
        .then(function (response) {
            let data = response.data[0];
            console.log(data)
            let lists = {}
            data['children_min'].forEach(element => {
                lists[ [element[0]] ] = []
            });
            console.log(lists);
            self.setState(function (prevState, props) {
                let nLists  =Object.assign(lists,prevState.lists);
                return ({lists:nLists,scaleType:data.title})
            })
        })
        .catch(function (error) {
            // handle error
            self.setState({
                isLoaded: true,
                error
            });
            console.log(error);
        })
        
    }

    changeLists(si,list){
        const temp_si = si;
        const temp_list = list;
        this.setState(function(prevState,props){
                        

            prevState.scaleLists[temp_si] = temp_list;
            return(prevState)
        })
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };
    
    handleClick = (buttonName) => {
        this.props.clickHandler(buttonName);
    };  
    handleAddNewElement = function(item){
        this.setState(function (prevState) {
            prevState.lists['ui_menu'].push(item)
            return { lists: prevState.lists }
        });
    }

    getList = id => this.state[this.id2List[id]];
    onDragStart = (start, provided) =>{

        if(start.source.droppableId==="ui_menu"){
            this.setState({showTopicChangeDroppable:true})
        }
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    }
    
    onDragEnd = result => {
        const { source, destination } = result;
        this.setState({showTopicChangeDroppable:false})
        // dropped outside the list
        if (!destination) {
            return;
        }
        console.log("S/D")
        console.log(source);
        console.log(destination);
        if (source.droppableId === destination.droppableId) {

            const items = reorder(
                this.state.lists[ [source.droppableId] ],
                source.index,
                destination.index
            );

            this.setState(function (prevState) {
                prevState.lists[source.droppableId] = items;
                return { lists: prevState.lists }
            });
        } else {
            const result = move(
                this.state.lists[source.droppableId],
                this.state.lists[destination.droppableId],
                source,
                destination
            );  

            this.setState(function(prevState){
                prevState.lists[source.droppableId] = result[source.droppableId];
                prevState.lists[destination.droppableId] = result[destination.droppableId];
                return {lists:prevState.lists}
            });

        }


    };
    
    refreshLists(){
            this.setState({ refreshLists: !this.state.refreshLists })
    }

    componentDidMount() {
        let self = this;
        axios.get(this.props.src.url +'/api/get/elements/')
            .then(function (response) {
                let data = response.data;
                self.setState(function(prevState,props){
                    prevState.lists["ui_menu"] =data;
                    return prevState
                });
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                self.setState({
                    isLoaded: true,
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }
    toggleShowNewElement(){
        this.setState({showModal:!this.state.showModal, showNewElement:!this.state.showNewElement})
    }

    render() {

        let validScales = []
        Object.keys(this.state.lists).forEach( k => {
            if(!(k === "ui_menu" || k=== "ui_menu_topic_change")){
                validScales.push({ [k]:this.state.lists[k]})
            }
        })
 
        return (
            <React.Fragment>
            <div className={"modal "+(this.state.showModal ? 'visible': 'hidden')} id="modal">
                <div className={"modal-content-wrapper "+(this.state.showModal ? 'visible': 'hidden')} id="modal">
                    <div className="modal-content card-wrapper">
                        {this.state.showNewElement && this.renderNewElementForm()}
                    </div>
                </div>
            </div>
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>

                  <div className="ui-wrapper-inner row" id="ui-wrapper-inner">       
                  <div className="view-wrapper  col-xs-12">

                      <div className="workspace">
                          <div className="scale row" id="workspace">
                                {validScales.length > 0 ? validScales.map( (el,i) => {
                                    let _key = Object.keys(el)[0];
                                    return(<ScaleElement string_identifier={_key} id={_key} scaleListClasses={"col-xs-"+( (12/validScales.length).toFixed(0) )} changeLists={this.changeLists} lists={this.state.lists} text={_key} elementType="" data-id={i} />)
                                }):null}
                          </div>
                      </div>
                    <div className="controls" id="ui-footer-control">
                          <FooterControls lists={this.state.lists} toggleMenu={this.toggleMenu}/>
                      </div>
                    {this.state.showUiMenu && 
                    <UIMenu toggleShowNewElement={this.toggleShowNewElement}  toggleMenu={this.toggleMenu} lists={this.state.lists} showTopicChange={this.state.showTopicChangeDroppable}/>
                    }
                  </div>
              </div>


            </DragDropContext>
            </React.Fragment>
        );
    }
}

// const AppWithSrcContext = (function(){
//     return(
//         <React.Fragment>

//             <SrcContext.Consumer>
//                 {src => { return(withRouter(<App src={src}/>))}
//             </SrcContext.Consumer>

//         </React.Fragment> 
//     )
// })

export default withRouter(App); 