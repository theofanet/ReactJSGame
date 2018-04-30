import React from "react";

import Tile from "./tile";


export default class Tileset{
    constructor(){
        this.images = {};
        this.tiles = [];
    }

    addImage = (key, image, tileSize, backSize=null) => {
        this.images[key] = {
            back: image,
            tile_size: tileSize,
            background_size: backSize
        };
    };

    addTile = (imageKey, posX, posY, srcX = 0, srcY = 0, world=null) => {
        if(this.images[imageKey]){
            let img = this.images[imageKey];
            let tile = new Tile(img.tile_size, 1, 1, {
                image: img.back,
                x: srcX * img.tile_size, 
                y: srcY * img.tile_size,
                size: img.background_size
            });
            tile.x = posX;
            tile.y = posY;
            this.tiles.push(tile);
            if(world)
                world.addEntity(tile);
        }

        return false;
    };

    drawTile = (imageKey, posX, posY, srcX, srcY) => {
        if(this.images[imageKey]){
            let img = this.images[imageKey];
            let tile = new Tile(img.tile_size, 1, 1, {
                image: img.back,
                x: srcX * img.tile_size, 
                y: srcY * img.tile_size,
                size: img.background_size
            });
            tile.x = posX;
            tile.y = posY;
            return tile.draw();
        }

        return null;
    };

    drawTileAsBlock = (imageKey, srcX, srcY, props={}) => {
        if(this.images[imageKey]){
            let img = this.images[imageKey];
           return <div style={{
                width: img.tile_size,
                height: img.tile_size,
                backgroundImage: 'url('+img.back+")",
                backgroundPosition: '-' + (srcX * img.tile_size) + "px -" + (srcY * img.tile_size) + "px"
           }} {...props}> </div>;
        }

        return null;
    };

    draw = () => {
        return <div>
        { 
            this.tiles.map(tile => {
                return tile.draw();
            }) 
        }
        </div>;
    };
}