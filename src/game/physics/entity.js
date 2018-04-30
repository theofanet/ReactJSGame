import React from "react";

import { Sides } from "./world";


export default class Entity {
    constructor(width, height){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;

        this.dynamic = true;

        this.gravity_scale = 1.0;
        this.bounce_scale = 1.0;
        this.grounded = true;

        this.impulses = [];
        
        this.velocity = {x: 0, y: 0};
    }

    addImpulse = (x=0, y=0) => {
        this.impulses.push({
            x: x,
            y: y
        });
    };

    getCenter = () => {
        return {x: this.x + (this.width / 2), y: this.y + (this.height / 2)};
    };

    update = (worldConfig, dt) => {
        if(this.dynamic){
            // acceleration
            let a = {x:0, y: 0}

            // Adding gravity
            if(worldConfig.gravity)
                a.y += -worldConfig.gravity*this.gravity_scale;
            for(let i of this.impulses){
                a.x += i.x;
                a.y += i.y;
            }
            this.impulses = [];
        
            // Applying acceleration to velocity
            this.velocity.x += a.x * dt;
            this.velocity.y += a.y * dt;
    
            // Setting new positions
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            this.grounded = this.velocity.y === 0;
        }
    };

    drawBBox = () => {
        return <div className="entity-bbox" style={{
            position: 'absolute',
            bottom: this.y, 
            left: this.x,
            width: this.width, 
            height: this.height
        }}> </div>;
    };

    subjectCollisionReaction = (subject, side, penetration) => {
        if(side === Sides.TOP || side === Sides.BOTTOM)
            this.y += penetration.y;
        else if(side === Sides.LEFT || side === Sides.RIGHT)
            this.x += penetration.x;

        this.velocity.y = 0;
        this.velocity.x = 0;
    };
}