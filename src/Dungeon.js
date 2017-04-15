import React, { Component } from 'react';
//import setupLevel from './setup/init';
import Cells from './setup/Dungeon';
import Player from './setup/characters/Player';
import Vector from './setup/utility/Vector';
import './Dungeon.css';
import _ from 'underscore';

class Dungeon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log('dungeon will mount');
    /*const newCells = this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = 'wall';
    });*/
    const cells = new Cells(0);
    const player = new Player(cells);
    player.draw(cells);
    //const player = setupLevel(newCells, 0); // possibly make level a prop ?
    //console.log(player);
    this.setState({ cells: cells, player: player });

    document.addEventListener('keydown', _.debounce(this.handleKeyDown.bind(this)), false);

  }

  handleMove(move) {
    const dungeon = this.state.cells;
    const player = this.state.player;
    player.move(move, dungeon);
    this.setState({ cells: dungeon, player: player });
    //var stuff = this.state.player.mov(move, this.state.cells);
    //console.log(stuff);
    //this.setState({cells: stuff});
    /*const current = this.state.playerLocation;
    const next = current.plus(move);
    const itemInWay = this.state.cells[next.y][next.x];
    if (itemInWay === 'room') {
      const stuff = this.copyCells();
      //const stuff = this.state.cells;
      stuff[current.y][current.x] = 'room';
      stuff[next.y][next.x] = 'player';
      this.setState({
        cells: stuff,
        playerLocation: next
      });
      //this.props.setCells(stuff);
    }*/
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

  componentDidMount() {
    console.log('dungeon did mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('dungeon getting new props');
  }

  copyCells() {
    return this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = cells[row][col];
    });
  }

  getItems() {
    return this.state.cells.map((arr, row) =>
      arr.map((item, col) => (<div className={item.selector + ' cell'}></div>)))
  }

  getItems2() {
    const current = this.state.playerLocation;
    const viewBoxOrigin = current.plus(new Vector(-5, -5));
    const viewBox = [];
    for (let i = 0, row; i < 11; i++) {
      row = this.state.cells[i + viewBoxOrigin.y];
      viewBox[i] = [];
      for (let j = 0, col; j < 11; j++) {
        col = row ? row[j + viewBoxOrigin.x] : undefined;
        viewBox[i][j] = (<div className={col ? 'cell ' + col : 'cell'}></div>);
      }
    }
    return viewBox;
  }

  traverse(action) {
    const cells = this.state.cells;
    const newCells = [];
    for (let row = 0; row < 100; row++) {
      newCells[row] = [];
      for (let col = 0; col < 100; col++) {
        action(row, col, cells, newCells);
      }
    }
    return newCells;
  }

  render() {
    return (
      <div className='dungeon'>{this.getItems()}</div>
    );
  }
}

export default Dungeon;
