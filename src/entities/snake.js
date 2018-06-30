import React from "react";

import Entity from "../game/physics/entity";
import KeyBoard, { Keys } from "../game/io/keyboard";
import { Subject } from "../game/events";

const Directions = {
    NONE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    UP: 4
};


class SnakeBody{
    constructor(x, y, velocity=null){
        this.body = new Entity(16, 16);
        this.body.gravity_scale = 0;
        this.body.x = x;
        this.body.y = y;
        this.direction = Directions.NONE;
        this.nextVelocity = [];
        if(velocity)
            this.setVelocity(velocity.x, velocity.y);
    }

    update = dt => {
        if(this.nextVelocity.length){
            if(this.body.x === this.nextVelocity[0].pos.x && this.nextVelocity[0].pos.y === this.body.y){
                this.setPosition(this.nextVelocity[0].pos.x, this.nextVelocity[0].pos.y);
                this.setVelocity(this.nextVelocity[0].v.x, this.nextVelocity[0].v.y);
                this.nextVelocity.shift();
            }
        }
        this.body.update({}, dt);
    };

    setPosition = (x, y) => {
        let last_pos = {x: this.body.x, y: this.body.y};
       
        this.body.x = x;
        this.body.y = y;

        if(this.body.x > last_pos.x)
            this.direction = Directions.RIGHT;
        else if(this.body.x < last_pos.x)
            this.direction = Directions.LEFT;
        else if(this.body.y > last_pos.y)
            this.direction = Directions.UP;
        else if(this.body.y < last_pos.y)
            this.direction = Directions.DOWN;
        else    
            this.direction = Directions.NONE;
    };

    setVelocity = (x, y) => {
        this.body.setVelocity(x, y);

        if(x > 0)
            this.direction = Directions.RIGHT;
        else if(x < 0)
            this.direction = Directions.LEFT;
        else if(y > 0)
            this.direction = Directions.UP;
        else if(y < 0)
            this.direction = Directions.DOWN;
        else
            this.direction = Directions.NONE;
    };

    addNextVelocity = (x, y, atX, atY) =>  {
        this.nextVelocity.push({
            v: {x: x, y: y},
            pos: {x: atX, y: atY}
        });
    };

    getNextBodyPosition = (addSize = true) => {
        let pos = {x: this.body.x, y: this.body.y};
        if(addSize){
            if(this.direction === Directions.DOWN)
                pos.y += this.body.height;
            else if(this.direction === Directions.LEFT)
                pos.x += this.body.width;
            else if(this.direction === Directions.RIGHT)
                pos.x -= this.body.width;
            else 
                pos.y -= this.body.height;
        }
        return pos;
    };

    draw = () => {
        let color = "red";
        if(this.direction === Directions.RIGHT)
            color = "green";
        else if(this.direction === Directions.LEFT)
            color = "blue";
        else if(this.direction === Directions.UP)
            color = "purple";
        else if(this.direction === Directions.DOWN)
            color = "yellow";

        return <div style={{
            backgroundColor: color,
            width: this.body.width,
            height: this.body.height,
            position: 'absolute',
            bottom: this.body.y || 0,
            left: this.body.x || 0
        }}> </div>;
    };
}


export default class Snake extends Subject{
    constructor(){
        super();
        this.speed = 4;
        this.init();
    }

    init = () => {
        this.head = new SnakeBody(100, 100, this.speed);
        this.bodies = [];
        this.head.setVelocity(0, this.speed);
    };

    addBody = () => {
        let last = this.bodies.length ? this.bodies[this.bodies.length - 1] : this.head;
        let pos = last.getNextBodyPosition();
        let body = new SnakeBody(pos.x, pos.y, last.body.velocity);
        if(last.nextVelocity.length){
            last.nextVelocity.forEach(v => {
                body.nextVelocity.push(v);
            });
        }
        this.bodies.push(body);
    };

    pushPosition = (x, y) => {
        this.positions_stack.push({x: x, y: y});
    };

    shiftPosition = () => {
        return this.positions_stack.shift();
    };

    getKeyDown = () => {
        if(KeyBoard.isKeyDown(Keys.UP))
            return Keys.UP;
        else if(KeyBoard.isKeyDown(Keys.DOWN))
            return Keys.DOWN;
        else if(KeyBoard.isKeyDown(Keys.LEFT))
            return Keys.LEFT;
        else if(KeyBoard.isKeyDown(Keys.RIGHT))
            return Keys.RIGHT;
        return false;
    };

    update = (dt, world) => {
        let key = this.getKeyDown();
        if(key !== false){
            let pos = {x: this.head.body.x, y: this.head.body.y};
            let vel = {x: 0, y: 0};

            if(key === Keys.UP && this.head.direction !== Directions.DOWN)
                vel.y = this.speed;
            else if(key === Keys.DOWN && this.head.direction !== Directions.UP)
                vel.y = -this.speed;
            else if(key === Keys.LEFT && this.head.direction !== Directions.RIGHT)
                vel.x = -this.speed;
            else if(key === Keys.RIGHT && this.head.direction !== Directions.LEFT)
                vel.x = this.speed;

            if(vel.x || vel.y){
                this.head.setVelocity(vel.x, vel.y);
                if(this.bodies.length){
                    this.bodies.forEach(b => {
                        b.addNextVelocity(vel.x, vel.y, pos.x, pos.y);
                    });
                }
            }
        }

        this.head.update(dt);

        this.bodies.forEach(b => {
            b.update(dt);
        });

        if(world.checkWallCollision(this.head.body))
            this.notify("GAMEOVER");
        else{
            for(let i = 1;i < this.bodies.length;i++){
                if(world.checkEntityCollision(this.head.body, this.bodies[i].body))
                    this.notify("GAMEOVER");
            }
        }
    };

    draw = () => {
        return <div>
            { this.head.draw() }
            {
                this.bodies.map(b => {
                    return b.draw();
                })
            }
        </div>;
    };
}