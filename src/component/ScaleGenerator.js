import React from "react";
import ScaleElement from "./ScaleElement";

class ScaleGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            string_indentifier: null,
            scaleElements: [],
        };
        this.objects = [];
        const { error, isLoaded, items, list } = this.props;
    
        items.map(function (item, i) {
            const si = this.props.string_identifier + "droppable-" + i;
            let a = <ScaleElement string_identifier={si} id={i} changeLists={this.props.changeLists} list={this.props.scalesList} text={item[0]} elementType="" data-id={item[1]} />
            this.props.changeLists(a,[])
            this.setState(prevState => ({
                scaleElements: [...prevState.scaleElements, a]
            })); 
            this.objects.push(a);


            return [a]
        },  this)
    }
    render() {
        const { error, isLoaded, items,list } = this.props;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            // console.log(this);
            return (
                    this.objects

            );
        }
    }

}
export default ScaleGenerator;