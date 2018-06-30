import React, { Component } from 'react';

import GameCore from "./game/core";

import TestScene from "./scenes/test";
import SpritesTest from "./scenes/sprites";
import GravityBalls from "./scenes/balls";
import TilesTest from "./scenes/tiles";
import SnakeScene from "./scenes/snake";
import {Observer} from "./game/events";

import './App.scss';
import {Sides} from "./game/physics/world";


class App extends Component {
  constructor(props){
    super(props);

    this.observer = new Observer();
    this.observer.observe("SCENE-STARTED", () => {
      this.setState({gameOver: false});
    });
    this.observer.observe("SCENE-CLOSED", () => {
      this.setState({gameOver: true});
    });

    this.scenes = [
      {title: "Snake", scene: <SnakeScene />},
      {title: "Test Keyboard", scene: <TestScene />},
      {title: "Gravity Balls", scene: <GravityBalls />},
      {title: "Sprites Test", scene: <SpritesTest />},
		  {title: "Tiles Test", scene: <TilesTest />}
    ];

    this.state = {
      scene: this.scenes[0].scene,
      gameOver: false
    };
  }

  setScene = scene => {
    this.setState({scene: scene});
  };

  render() {
    return (
      <GameCore scene={ this.state.scene }>
        {
          this.state.gameOver ?
            <div className="app-scene-listing-container">
              Scenes :
              <ul>
                {
                  this.scenes.map((s, i) => {
                    return <li className={s.scene === this.state.scene ? 'current' : null} key={"s-"+i} onClick={ () => { this.setScene(s.scene) } }>
                      { s.title }
                    </li>;
                  })
                }
              </ul>
            </div>
            : 
            null
        }
      </GameCore>
    );
  }
}

export default App;
