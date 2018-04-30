import React from "react";

import Scene from "../game/scene";
import World from "../game/physics/world";
import Player from "../entities/player";
import Tileset from "../entities/tileset";
import Tile from "../entities/tile";

import Mouse, { Buttons } from "../game/io/mouse";


export default class TilesTest extends Scene{
    constructor(props){
        super(props);

        this.world = new World({
            absorption: 0,
            gravity: 0.01962,
        });
        this.player = new Player();
        this.player.setPosition(162, 128);

        this.tileset = new Tileset();
        this.tileset.addImage('level', require("../assets/level.png"), 16);
        [...Array(16)].map((v, i) => {
            this.tileset.addTile('level', i*16, 0, 8, 0, this.world);
        });

        this.tile = new Tile(16);
        this.tile.color = 'red';

        this.selected_tile = {x: 8, y: 0};
        this.mouse_position = {x: 0, y: 0};
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

        this.mouse_position.x = Math.ceil((Mouse.x - 8) / 16, 10) * 16;
        this.mouse_position.y = Math.ceil((Mouse.y - 8) / 16, 10) * 16;

        if(Mouse.isButtonDown(Buttons.LEFT) && !this.tile_selection)
            this.tileset.addTile('level', this.mouse_position.x, this.mouse_position.y, this.selected_tile.x, this.selected_tile.y, this.world);
    };

    selectTile = (x, y, e) => {
        this.selected_tile = {x: x, y: y};
    };

    draw = () => {
        return (
            <div>
                <div className="settings-container" onMouseOver={() => { this.tile_selection = true;}} onMouseOut={() => { this.tile_selection = false; }}>
                    {
                        [...Array(7)].map((u, y) => {
                            let line = [...Array(16)].map((v, x) => {
                                return this.tileset.drawTileAsBlock('level', x, y, {
                                    className: (x === this.selected_tile.x && y === this.selected_tile.y ? 'current' : ''),
                                    onClick: e => { this.selectTile(x, y, e); }
                                });
                            });

                            return <div className="tile-selection-line">{line}</div>;
                        })
                    }
                </div>

                { this.tileset.draw() }
                { this.player.draw() }
                { !this.tile_selection && this.tileset.drawTile('level', this.mouse_position.x, this.mouse_position.y, this.selected_tile.x, this.selected_tile.y) }
            </div>
        );
    }
}