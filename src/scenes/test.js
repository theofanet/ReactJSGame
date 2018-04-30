import React from "react";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../game/core";
import KeyBoard, { Keys } from "../game/io/keyboard";
import Scene from "../game/scene";

const SPEED = 10;


export default class TestScene extends Scene{
    init = () => {
        this.setState({
            title: "Test Keyboard",
            showTitle: true,
            x: 0,
            y: 0
        });
    };

    update = dt => {
        let x = this.state.x;
        let y = this.state.y;

        if(KeyBoard.isKeyHeld(Keys.LEFT) || KeyBoard.isKeyHeld(Keys.a))
            x -= SPEED;
        else if(KeyBoard.isKeyHeld(Keys.RIGHT) || KeyBoard.isKeyHeld(Keys.d))
            x += SPEED;
            
        if(KeyBoard.isKeyHeld(Keys.UP) || KeyBoard.isKeyHeld(Keys.w))
            y += SPEED;
        else if(KeyBoard.isKeyHeld(Keys.DOWN) || KeyBoard.isKeyHeld(Keys.sdw))
            y -= SPEED;
        
        if(x < 0)
            x = 0;
        else if(x > SCREEN_WIDTH - 40)
            x = SCREEN_WIDTH - 40;
        if(y < 0)
            y = 0;
        else if(y > SCREEN_HEIGHT - 40)
            y = SCREEN_HEIGHT - 40;
        
        if(x !== this.state.x || y !== this.state.y)
            this.setState({x: x, y: y});
    };

    draw = () => {
        return (
            <div>
                <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'red',
                    position: 'absolute',
                    bottom: this.state.y,
                    left: this.state.x
                }}> </div>
            </div>
        );
    }
}