import React from "react";

import Entity from "../game/physics/entity";


export default class Ball extends Entity{
    constructor(){
        super();

        this.width = 40;
        this.height = 40;

        this.color = 'red';
    }

    setSize = size => {
        this.width = size;
        this.height = size;
    };

	subjectCollisionReaction = (subject, side, penetration) => {

	};

    draw = () => {
        return <div style={{
            backgroundColor: this.color,
            width: this.width,
            height: this.height,
            borderRadius: '50%',
            position: 'absolute',
            bottom: this.y || 0,
            left: this.x || 0,
            border: '1px solid white'
        }}> </div>;
    };
}
