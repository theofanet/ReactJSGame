import React from "react";

import Scene from "../game/scene";
import World from "../game/physics/world";
import Player from "../entities/player";


export default class SpritesTest extends Scene{
    constructor(props){
        super(props);

        this.world = new World({
            absorption: 0,
            gravity: 0.01962,
        });
        this.player = new Player();
    }

    init = () => {
        this.setState({
            title: "Sprites Test",
            showTitle: true
        });
    };

    update = dt => {
        this.world.update(dt);
        this.player.update(dt, this.world);
    };

    draw = () => {
        return (
            <div>
                <div className="settings-container">
                    Skin :
                    <ul className="bordered">
                        {
                            [0, 1, 2, 3].map((s, i) => {
                                return <li className={s === this.player.skin ? 'current' : null} key={"sk-"+i} onClick={ () => { this.player.skin = s; } }>
                                { this.player.drawSkin(s) }
                                </li>;
                            })
                        }
                    </ul>
                </div>
                { this.player.draw() }
            </div>
        );
    }
}