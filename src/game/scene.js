import React, { Component } from "react";


export default class Scene extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: "Scene",
            showTitle: false,
            backgroundColor: 'transparent'
        };

        this.scale = 2;
    }

    init = () => {
    };
    update = dt => {};
    close = () => {};
    draw = () => { return <div /> };

    render(){
        return (
            <div className="scene-container" style={{
                backgroundColor: this.state.backgroundColor
            }}>
                { this.state.showTitle ? <div className="scene-title">{ this.state.title }</div> : null }
                { this.draw() }
            </div>
        );
    }
}