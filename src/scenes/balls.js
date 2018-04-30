import React from "react";

import Scene from "../game/scene";
import World from "../game/physics/world";
import Ball from "../entities/ball";


export default class GravityBalls extends Scene{
    constructor(props){
        super(props);

        this.world = new World();

        this.nb_balls = 20;
        this.balls = [];

        this.inputs = {
            gravity: this.world.configs.gravity,
            absorption: this.world.configs.absorption,
            nb_balls: this.nb_balls
        };

        for(let i = 0; i < this.nb_balls; i++){
            let ball = new Ball();
            ball.setSize(this.getRandomInt(60, 30));
            ball.color = this.getRandomColor();
            ball.velocity.x = (this.getRandomInt(2) === 1 ? -1 : 1) * this.getRandomInt(50);
            ball.velocity.y = this.getRandomInt(50);
            ball.x = this.getRandomInt(this.world.configs.width - ball.width);
            ball.y = this.getRandomInt(this.world.configs.height - ball.height);
            this.balls.push(ball);
            this.world.addEntity(ball);
        }
    }

    resetBalls = () => {
        this.balls = [];
        
        this.nb_balls = this.inputs.nb_balls;
        this.world.configs.gravity = parseFloat(this.inputs.gravity);
        this.world.configs.absorption = parseFloat(this.inputs.absorption);
        this.world.resetntities();

        for(let i = 0; i < this.nb_balls; i++){
            let ball = new Ball();
            ball.setSize(this.getRandomInt(60, 30));
            ball.color = this.getRandomColor();
            ball.velocity.x = (this.getRandomInt(2) === 1 ? -1 : 1) * this.getRandomInt(50);
            ball.velocity.y = this.getRandomInt(50);
            ball.x = this.getRandomInt(this.world.configs.width - ball.width);
            ball.y = this.getRandomInt(this.world.configs.height - ball.height);
            this.balls.push(ball);
            this.world.addEntity(ball);
        }
    };

    getRandomInt = (max, min=0) => {
        return Math.floor(Math.random() * Math.floor(max - min)) + min;
    };
    
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) 
            color += letters[Math.floor(Math.random() * 16)];
        return color;
    };

    init = () => {
        this.setState({
            title: "Gravity Balls",
            showTitle: true
        });
    };

    update = dt => {
        this.world.update(dt);
    };

    setGravity = e => {
        this.inputs.gravity = e.target.value;
    };

    setAbsorption = e => {
        this.inputs.absorption = e.target.value;
    };

    setNbBalls = e => {
        this.inputs.nb_balls = parseInt(e.target.value, 10);
    };

    draw = () => {
        return (
            <div>
                <div className="settings-container">
                    <div>
                        <label>Nombre de balls</label>
                        <input type="text" value={ this.inputs.nb_balls } onChange={ this.setNbBalls } />
                    </div>
                    <div>
                        <label>Gravit&eacute;</label>
                        <input type="text" value={ this.inputs.gravity } onChange={ this.setGravity } />
                    </div>
                    <div>
                        <label>Absorption</label>
                        <input type="text" value={ this.inputs.absorption } onChange={ this.setAbsorption } />
                    </div>

                    <input type="button" value="Relancer la simulation" onClick={ this.resetBalls } />
                </div>

                { this.balls.map(ball => {return ball.draw();}) }
            </div>
        );
    }
}