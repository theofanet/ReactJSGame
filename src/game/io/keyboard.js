const Keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ESC: 27,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    WIN: 91,
    BACK: 8,
    TAB: 9,
    SPACE: 32,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84, 
    u: 85,
    v: 86,
    w: 87,
    x: 88, 
    y: 89, 
    z: 90
};

export default class KeyBoard{
    static _keysdown = {};
    static _keysup = {};
    static _keysheld = {};
    
    static init(){
        window.addEventListener('keyup', KeyBoard.keyup);
        window.addEventListener('keydown', KeyBoard.keydown);
    }

    static clear(){
        window.removeEventListener('keyup', KeyBoard.keyup);
        window.removeEventListener('keydown', KeyBoard.keydown);
    }

    static closeFrame(){
        KeyBoard._keysdown = {};
        KeyBoard._keysup = {};
    }

    static keydown(e){
        let code = e.keyCode || e.which;
        if(!KeyBoard._keysheld[code]){
            KeyBoard._keysdown[code] = true;
            KeyBoard._keysup[code] = false;
        }
        KeyBoard._keysheld[code] = true;
    }

    static keyup(e){
        let code = e.keyCode || e.which;
        KeyBoard._keysup[code] = true;
        KeyBoard._keysdown[code] = false;
        KeyBoard._keysheld[code] = false;
    }

    static isKeyDown(code){
        return KeyBoard._keysdown[code] || false;
    }

    static isKeyUp(code){
        return KeyBoard._keysup[code] || false;
    }

    static isKeyHeld(code){
        return KeyBoard._keysheld[code] || false;
    }
}

export { 
    Keys
};