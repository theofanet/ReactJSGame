export default class Animation{
    constructor(nbFrames, startPosition={x: 0, y: 0}, size = {w: 0, h: 0}, frequence=100, once=false){
        this.nbFrames = nbFrames;
        this.frequence = frequence;
        this.startPosition = startPosition;
        this.size = size;
        this.frame = 1;
        this.once = once;
        this.stop = false;
        this.elapsedTime = 0;
    }

    start = (reset=false) => {
        if(reset){
            this.dt = 0;
            this.frame = 0;
        }

        this.stop = false;
    };

    update = dt => {
        this.elapsedTime += dt;
        if(this.elapsedTime > this.frequence){
            this.elapsedTime -= this.frequence;
            if(!this.stop){
                if(this.frame < this.nbFrames - 1)
                    this.frame++;
                else{
                    if(this.once){
                        this.stop = true;
                        this.frame = this.nbFrames - 1;
                    }
                    else
                        this.frame = 0;
                }
            }
        }
    };

    getTexturePosition = () => {
        return {
            x: this.startPosition.x + (this.frame * this.size.w),
            y: this.startPosition.y
        };
    }
}