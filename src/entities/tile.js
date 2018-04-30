import React from "react";

import Entity from "../game/physics/entity";


export default class Tile extends Entity{
    constructor(baseSize=32, cols=1, rows=1, background=null){
        super();
        this.dynamic = false;

        this.color = 'transparent';
        this.background = background;

        this.base_size = baseSize;
        this.width = this.base_size*cols;
        this.height = this.base_size*rows;
    }

    draw = () => {
        let style = {
            width: this.width,
            height: this.height,
            backgroundColor: this.color,
            position: 'absolute',
            bottom: this.y,
            left: this.x
        };

        if(this.background){
            style = {
                ...style,
                backgroundImage: 'url('+this.background.image+")",
                backgroundPosition: '-'+this.background.x + "px -" + this.background.y + "px",
                backgroundSize: this.background.size ? this.background.size : null,
                transform: this.background.revert ? 'scaleX(-1)' : null
            }
        }

        return  <div style={style}> </div>;
    };
}