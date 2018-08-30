import React from "react";
import ScaleGenerator from "./ScaleGenerator";

class ScalesLoader extends React.Component {
    constructor(props) {
        // this.isLoaded = false;
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
        this.objects = [];
        this.items = [];
        const lists = [ [{ "title": "Who is", "created": 1523546026, "image": null, "id": 1015 },{ "title": "What is", "created": 1523546235, "image": null, "id": 1018 }, { "title": "Holiday", "created": 1523564175, "image": null, "id": 1032 }],[],[]]
        fetch(window.location.hostname + "mats/public_html/api/get/scales")
            .then(res => res.json())
            .then(
                (result) => {
                    this.items = result;
                    this.items.map(function(item,i) {
                        var l = lists[i];
                        // console.log(i);
                        // console.log(item);
                        // console.log(lists[i]);
                        this.objects.push(<ScaleGenerator scalesList={this.props.scaleLists} changeLists={this.props.changeLists} list={[]} string_identifier={item.string_identifier} isLoaded={true} items={item.children_min} text={item.title} elementType="" id={item.id} />);
                    },this)
                    
                    this.setState({
                        isLoaded: true,
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // console.log("SCALES HANDLER LOOK");

            // console.log(this.items);
            // console.log(this.objects);
            // console.log(this);
            for (let i = 0; i < this.objects.length; i++) {
                if (this.objects[i].props.string_identifier == this.props.desired_scale) {
                    return (this.objects[i])
                }
            }

        }
    }

}

export default ScalesLoader;
