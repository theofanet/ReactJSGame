import React from "react";

import KeyBoard, { Keys } from "../game/io/keyboard";
import Sprite from "../game/graphics/sprite";
import Entity from "../game/physics/entity";

const SPEED = 1;


export default class Player extends Sprite{
    constructor(){
        super(require('../assets/characters.png'), 32, 32);

        this.addAnimation('idle', {nbFrame: 1});
        this.addAnimation('run', {nbFrame: 4});
        this.addAnimation('jump', {nbFrame: 4, startX: 160, once: true});
        this.setAnimation('idle');

        this.update = this.update.bind(this);

        this.body = new Entity(10, 16);

        this.skin = 0;

        this.speed = SPEED;
    }

    setPosition = (x, y) => {
        this.body.x = x;
        this.body.y = y;
    };

    update(dt, world){
        super.update(dt);
        this.backgroundPosition.y = this.skin * this.height;

        world.updateEntity(this.body, dt);
        this.x = this.body.x - 10;
        this.y = this.body.y;

        if(KeyBoard.isKeyHeld(Keys.x))
            this.speed = SPEED * 10;
        else if(KeyBoard.isKeyUp(Keys.SHIFT))
            this.speed = SPEED;

        if(this.body.grounded && KeyBoard.isKeyDown(Keys.SPACE)){
            let kLeft = KeyBoard.isKeyHeld(Keys.LEFT);
            let x = 0;
            if(kLeft || KeyBoard.isKeyHeld(Keys.RIGHT))
                x = 0.1;
            this.body.addImpulse(x * (kLeft ? -1 : 1), 0.38);
            this.setAnimation("jump", kLeft);
        }
        else if(this.body.grounded){
            if(KeyBoard.isKeyHeld(Keys.LEFT)){
                this.body.velocity.x = -SPEED;
                this.setAnimation("run", true);
            }
            else if(KeyBoard.isKeyHeld(Keys.RIGHT)){
                this.body.velocity.x = SPEED;
                this.setAnimation("run");
            }
            else if(KeyBoard.isKeyUp(Keys.LEFT) || KeyBoard.isKeyUp(Keys.RIGHT)){
                this.setAnimation("idle", KeyBoard.isKeyUp(Keys.LEFT) || KeyBoard.isKeyUp(Keys.a));
                this.body.velocity.x = 0;
            }
        }
    };

    drawSkin = skin => {
        let y = skin * this.height;
        return (
                <div style={{
                    width: this.width,
                    height: this.height,
                    backgroundImage: 'url('+this.backgroundImage+")",
                    backgroundPosition: "0 -" + y + "px"
                }}> </div>
        );
    };
}