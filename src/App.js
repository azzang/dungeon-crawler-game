import React, { Component } from 'react';
//import Dungeon from './Dungeon';
import './App.css';
import Cells from './setup/Dungeon';
import Player from './setup/characters/Player';
import Vector from './setup/utility/Vector';
import './Dungeon.css';
import _ from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('app constructor underway...');


    const cells = new Cells(4);
    const player = new Player(cells);
    //player.draw(cells);
    //player.setOriginRandomly(cells);
    //player.draw(cells);
    this.state = { cells, player };

    document.addEventListener('keydown', _.debounce(this.handleKeyDown.bind(this)), false);
  }

  componentWillMount() {
    console.log('app will mount');
  }

  handleMove(move) {
    const player = this.state.player;
    let dungeon = this.state.cells;
    player.move(move, dungeon);
    if (player.shouldLevelUp()) {
      dungeon = new Cells(player.level);
      player.levelUp(dungeon);
      //player.setOriginRandomly(dungeon);
      //player.draw(dungeon);
    }
    this.setState({ cells: dungeon, player: player });
  }

  handleKeyDown(e) {
    switch(e.keyCode) {
      case 37: // left
        return this.handleMove(new Vector(-1, 0));
      case 38: // up
        return this.handleMove(new Vector(0, -1));
      case 39: // right
        return this.handleMove(new Vector(1, 0));
      case 40: // down
        return this.handleMove(new Vector(0, 1));
      default: return;
    }
  }

  getItems() {
    return this.state.cells.map((arr, row) =>
      arr.map((item, col) => (<div className={item.selector + ' cell'}></div>)))
  }

  render() {
    return (
      <div className="App">
        <h1>Dungeon Crawler</h1>
        <div className='dungeon'>{this.getItems()}</div>
        <div className="dashboard">
          <div><strong>Health:</strong>{this.state.player.health}</div>
          <div><strong>Weapon:</strong>{this.state.player.weaponName}</div>
          <div><strong>Weapon Lethality:</strong>{this.state.player.weaponLethality}</div>
          <div><strong>Level:</strong>{this.state.player.level}</div>
          <div><strong>Experience:</strong>{this.state.player.experience}</div>
        </div>
      </div>
    );
  }
}

export default App;
