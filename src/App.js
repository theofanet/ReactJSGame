import React, { Component } from 'react';

import GameCore from "./game/core";

import TestScene from "./scenes/test";
import SpritesTest from "./scenes/sprites";
import GravityBalls from "./scenes/balls";
import TilesTest from "./scenes/tiles";

import './App.scss';


class App extends Component {
  constructor(props){
    super(props);

    this.scenes = [
      {title: "Tiles Test", scene: <TilesTest />},
      {title: "Test Keyboard", scene: <TestScene />},
      {title: "Gravity Balls", scene: <GravityBalls />},
      {title: "Sprites Test", scene: <SpritesTest />}
    ];

    this.state = {
      scene: this.scenes[0].scene
    };
  }

  setScene = scene => {
    this.setState({scene: scene});
  };

  render() {
    return (
      <GameCore scene={ this.state.scene }>
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
      </GameCore>
    );
  }
}

export default App;
