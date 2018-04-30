import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../core";

const Buttons = {
    LEFT: 1,
    MIDDLE: 2,
    RIGHT: 3
};


export default class Mouse{
    static _buttonsdown = {};
    static _buttonsup = {};
    static _buttonsheld = {};

    static x = 0;
    static y = 0;

    static init(){
        window.addEventListener('mousedown', Mouse.buttondown);
        window.addEventListener('mouseup', Mouse.buttonup);
        window.addEventListener('mousemove', Mouse.mousemove);
    }

    static clear(){
        window.removeEventListener('mouseup', Mouse.buttonup);
        window.removeEventListener('mousedown', Mouse.buttondown);
        window.removeEventListener('mousemove', Mouse.mousemove);
    }

    static closeFrame(){
        Mouse._buttonsdown = {};
        Mouse._buttonsup = {};
    }

    static buttondown(e){
        let code = e.keyCode || e.which;
        if(!Mouse._buttonsheld[code]){
            Mouse._buttonsdown[code] = true;
            Mouse._buttonsup[code] = false;
        }
        Mouse._buttonsheld[code] = true;
    };

    static buttonup(e){
        let code = e.keyCode || e.which;
        Mouse._buttonsup[code] = true;
        Mouse._buttonsdown[code] = false;
        Mouse._buttonsheld[code] = false;
    }

    static mousemove(e){
        Mouse.x = e.clientX;
        Mouse.y = SCREEN_HEIGHT - e.clientY;
    }

    static isButtonDown(code){
        return Mouse._buttonsdown[code] || false;
    }

    static isButtonUp(code){
        return Mouse._buttonsup[code] || false;
    }

    static isButtonHeld(code){
        return Mouse._buttonsheld[code] || false;
    }
};

export { 
    Buttons
};