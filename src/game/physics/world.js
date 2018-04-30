import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../core";
import configs from "../configs";


const defaultConfgs = {
    gravity: configs.GRAVITY,
    absorption: configs.ABSORBTION,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
};

const Sides = {
    NONE: 0,
    TOP: 1,
    BOTTOM: 2,
    RIGHT: 3,
    LEFT: 4
};


export default class World{
    constructor(configs){
        this.configs = Object.assign(defaultConfgs, configs);
        this.entities = [];
    }

    resetntities = () => {
        this.entities = [];
    };

    addEntity = entity => {
        this.entities.push(entity);
    };

    update = dt => {
        for(let entity of this.entities)
            this.updateEntity(entity, dt);
    }

    updateEntity = (entity, dt) => {
        let old_position = Object.assign({}, {x: entity.x, y: entity.y});
        entity.update(this.configs, dt);
        if(entity.dynamic){
            this.checkEntitiesCollision(entity, dt, old_position);
            this.checkWallCollision(entity);
            entity.grounded = entity.velocity.y === 0;
        }
    };

    checkEntitiesCollision = (entity, dt, old_position) => {
        for(let subject of this.entities){
            if(entity !== subject){
                let penetration = this.checkEntityCollision(entity, subject);
                if(penetration !== false){
                    let side = this.getCollisionSide(entity, subject);
                    entity.subjectCollisionReaction(subject, side, penetration);
                }
            }
        }
    };

    checkEntityCollision = (entity, subject) => {
        let collide = !((subject.x >= entity.x + entity.width)
            || (subject.x + subject.width <= entity.x)
            || (subject.y >= entity.y + entity.height)
            || (subject.y + subject.height <= entity.y));
        
        if(collide){
            let mx = 0;
            let my = 0;

            if(entity.x > subject.x && entity.x <= subject.x + subject.width)
                mx = subject.x + subject.width - entity.x;
            else if(entity.x + entity.width > subject.x && entity.x + entity.width <= subject.x + subject.width)
                mx = subject.x - (entity.x + entity.width);
            if(entity.y > subject.y && entity.y <= subject.y + subject.height)
                my = subject.y + subject.height - entity.y;
            else if(entity.y + entity.height > subject.y && entity.y + entity.height <= subject.y + subject.height)
                my = subject.y - (entity.y + entity.height);

            return {
                x: mx,
                y: my
            };
        }
        
        return false;
    };

    checkWallCollision = entity => {
        if(entity.x < 0){
            entity.x = 0;
            entity.velocity.x *= -this.configs.absorption * entity.bounce_scale;
            entity.velocity.y *= this.configs.absorption * entity.bounce_scale;
        }
        else if(entity.x > this.configs.width - entity.size){
            entity.x = this.configs.width - entity.size;
            entity.velocity.x *= -this.configs.absorption * entity.bounce_scale;
            entity.velocity.y *= this.configs.absorption * entity.bounce_scale;
        }
        if(entity.y < 0){
            entity.y = 0;
            entity.velocity.y *= -this.configs.absorption * entity.bounce_scale;
            entity.velocity.x *= this.configs.absorption * entity.bounce_scale;
        }
        else if(entity.y > this.configs.height - entity.size){
            entity.y = this.configs.height - entity.size;
            entity.velocity.y *= -this.configs.absorption * entity.bounce_scale;
            entity.velocity.x *= this.configs.absorption * entity.bounce_scale;
        }
    };

    getCollisionSide = (entity, subject) => {
        let w = 0.5 * (entity.width + subject.width);
        let h = 0.5 * (entity.height + subject.height);
        let dx = entity.getCenter().x - subject.getCenter().x;
        let dy = entity.getCenter().y - subject.getCenter().y;
    
        let wy = w * dy;
        let hx = h * dx;
    
        if(Math.abs(dx) > w || Math.abs(dy) > h)
            return Sides.NONE;
    
        if (wy > hx){
            if (wy > -hx)
                return Sides.TOP;
            else
                return Sides.RIGHT;
        }
        else{
            if (wy > -hx)
                return Sides.LEFT;
            else
                return Sides.BOTTOM;
        }
    }
}

export {
    Sides
};