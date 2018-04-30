import React from "react";

import Animation from "./animation";



export default class Sprite{
    constructor(backgroundImage, width, height){
        this.animations = {};
        this.animation = null;
        this.backgroundImage = backgroundImage;
        this.backgroundPosition = {x: 0, y: 0};

        this.width = width;
        this.height = height;

        this.x = 0;
        this.y = 0;

        this.update = this.update.bind(this);

        this.revert = false;
    }

    addAnimation = (label, conf={}) => {
        let config = Object.assign({
            nbFrame: 1,
            startX: 0,
            startY: 0,
            once: false,
            frequency: 100
        }, conf);

        this.animations[label] = new Animation(
            config.nbFrame, 
            {x: config.startX, y: config.startY}, 
            {w: this.width, h: this.height}, 
            config.frequency, 
            config.once
        );
    };

    setAnimation = (label, revert=false) => {
        if(this.animations[label]){
            this.animation = this.animations[label];
            this.animation.start();
        }

        this.revert = revert;

        return false;
    };

    update(dt){
        if(this.animation){
            this.animation.update(dt);
            this.backgroundPosition = this.animation.getTexturePosition();
        }
    };

    draw = () => {
        return (
            <div>
                <div style={{
                    width: this.width,
                    height: this.height,
                    position: 'absolute',
                    bottom: this.y,
                    left: this.x,
                    backgroundImage: 'url('+this.backgroundImage+")",
                    backgroundPosition: '-'+this.backgroundPosition.x + "px -" + this.backgroundPosition.y + "px",
                    transform: this.revert ? 'scaleX(-1)' : null
                }}> </div>
            </div>
        );
    }
}