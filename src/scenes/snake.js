import React from "react";
import Scene from "../game/scene";
import Snake from "../entities/snake";
import Ball from "../entities/ball";
import World from "../game/physics/world";


export default class SnakeScene extends Scene{
    constructor(){
        super();
        
        this.world = new World({
            gravity: 0,
            absorption: 0
        });

        this.snake = new Snake();
        this.apple = new Ball();
        this.apple.setSize(16);
    }

    init = () => {
        this.snake.init();
        this.apple.x = this.getRandomInt(this.world.configs.width - this.apple.width);
        this.apple.y = this.getRandomInt(this.world.configs.height - this.apple.height);
    };

    update = dt => {
        if(this.world.checkEntityCollision(this.snake.head.body, this.apple)){
            this.snake.addBody();
            this.apple.x = this.getRandomInt(this.world.configs.width - this.apple.width);
            this.apple.y = this.getRandomInt(this.world.configs.height - this.apple.height);
        }
        this.snake.update(dt, this.world);
    };

    getRandomInt = (max, min=0) => {
        return Math.floor(Math.random() * Math.floor(max - min)) + min;
    };

    draw = () => {
        return <div>
            { this.snake.draw() }
            { this.apple.draw() }
            <div className="snake-score-panel">score: {this.snake.bodies.length}</div>
        </div>;
    };
}