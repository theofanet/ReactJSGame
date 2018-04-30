import React, { Component } from "react";

import KeyBoard, { Keys } from "./io/keyboard";
import Mouse from "./io/mouse";

const FPS = 60;

let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

const SCREEN_WIDTH = w.innerWidth || e.clientWidth || g.clientWidth;
const SCREEN_HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;


export default class Game extends Component{
    constructor(props){
        super(props);

        this.state = {
            frame: 0,
            fps: 0,
            scene: this.props.scene,
            last_update_time: new Date()
        };

        this.start = new Date();
        this.main_loop_intervale = null;
    }

    componentDidMount(){
        KeyBoard.init();
        Mouse.init();
        this.start = new Date();
        this.main_loop_intervale = setInterval(this.loop, 1000 / FPS);
        if(this.refs.scene)
            this.refs.scene.init();
    }

    componentWillUnmount(){
        this.close();
    }

    componentWillReceiveProps(props){
        if(props.scene && props.scene !== this.state.scene)
            this.setScene(props.scene);
    }

    close = () => {
        if(this.main_loop_intervale)
            clearInterval(this.main_loop_intervale);
        if(this.refs.scene)
            this.refs.scene.close();
    };

    setScene = scene => {
        if(this.refs.scene)
            this.refs.scene.close();
        this.setState({scene: scene}, () => {
            this.refs.scene.init();
        });
    }

    loop = () => {
        if(KeyBoard.isKeyDown(Keys.ESC))
            this.close();
        
        let frame = this.state.frame + 1;
        let current_time = new Date();
        let dt = current_time - this.state.last_update_time;
        
        let scene = this.refs.scene;
        if(scene && scene.update)
            scene.update(dt);

        KeyBoard.closeFrame();
        Mouse.closeFrame();

        this.setState({
            fps: 1000 / dt,
            frame: frame,
            last_update_time: current_time
        });
    };

    render(){
        return (
            <div className="core-container">
                <div className="core-bench-info-container">
                    { this.state.fps.toFixed(2) } FPS<br />
                    { this.state.frame } frames
                </div>
                { this.state.scene ? React.cloneElement(this.state.scene, {ref: "scene"}) : null }
                { this.props.children }
            </div>
        );
    }
}

Game.defaultProps = {
    scene: null
}

export {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    FPS
}