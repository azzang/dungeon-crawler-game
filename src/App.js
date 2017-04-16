import React, { Component } from 'react';
import './App.css';
import getDungeon from './Dungeon';
import Player from './models/characters/Player';
import Vector from './models/utilities/Vector';
import './Dungeon.css';
//import _ from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('app constructor underway...');

    const dungeon = getDungeon(0);
    const player = new Player(dungeon);

    this.state = { dungeon, player };

    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);

    ///document.addEventListener('keydown', _.debounce(this.handleKeyDown.bind(this)), false);
  }

  handleKeyDown(e) {
    const player = this.state.player;
    let dungeon = this.state.dungeon;

    player.move(e.keyCode, dungeon);
    this.setState({ dungeon, player });

    if (player.isDead()) {
      window.alert('Game Over!');
      window.location.reload();
    }

    if (player.isVictorious()) {
      window.alert('Victory!');
      window.location.reload();
    }

    if (player.shouldLevelUp()) {
      dungeon = getDungeon(player.level);
      player.levelUp(dungeon);
      this.setState({ dungeon, player });
    }
  }

  getItemsAroundPlayer() {
    const viewBoxOrigin = this.state.player.origin.plus(new Vector(-5, -5));
    const viewBox = [];
    for (let i = 0, row; i < 11; i++) {
      row = this.state.dungeon[i + viewBoxOrigin.y];
      viewBox[i] = [];
      for (let j = 0, item; j < 11; j++) {
        item = row ? row[j + viewBoxOrigin.x] : undefined;
        viewBox[i][j] = (<div className={item ? 'cell ' + item.selector : 'cell'}></div>);
      }
    }
    return viewBox;
  }

  render() {
    return (
      <div className="App">
        <h1>Dungeon Crawler</h1>
        <div className='dungeon'>{this.getItemsAroundPlayer()}</div>
        <div className="dashboard">
          <div><strong>Health: </strong>{this.state.player.health}</div>
          <div><strong>Level: </strong>{this.state.player.level}</div>
          <div><strong>Experience: </strong>{this.state.player.experience}</div>
          <div><strong>Weapon: </strong>{this.state.player.weaponName}</div>
          <div><strong>Lethality: </strong>{this.state.player.weaponLethality}</div>
        </div>
      </div>
    );
  }
}

export default App;
