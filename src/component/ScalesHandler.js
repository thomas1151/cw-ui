import React from "react";
import ScaleElement from "./ScaleElement";

class ScalesHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            string_indentifier: "1to3",
        };
    }

    componentDidMount() {
        fetch(window.location.hostname + "mats/public_html/api/scales")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    render() {
        return (
            null
            // console.log(this.objects)
        )
    }
}
export default ScalesHandler;
