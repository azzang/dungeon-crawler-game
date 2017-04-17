import React, { Component } from 'react';
import getDungeon from './Dungeon';
import Player from './models/characters/Player';
import Vector from './models/utilities/Vector';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  getInitialState() {
    const dungeon = getDungeon(0);
    const player = new Player(dungeon);
    return { dungeon, player };
  }

  levelUp(player) {
    const dungeon = getDungeon(player.level + 1);
    player.levelUp(dungeon);
    this.setState({ dungeon, player });
  }

  handleKeyDown(e) {
    const player = this.state.player;
    const dungeon = this.state.dungeon;

    player.move(e.keyCode, dungeon);

    this.setState({ dungeon, player });

    if (player.isDead()) {
      window.alert('Game Over!');
      this.setState(this.getInitialState());
    }

    if (player.isVictorious()) {
      window.alert('Victory!');
      this.setState(this.getInitialState());
    }

    if (player.shouldLevelUp()) {
      this.levelUp(player);
    }
  }

  getDungeonView() {
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
        <div className='dungeon'>{this.getDungeonView()}</div>
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
