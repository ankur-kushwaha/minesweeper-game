import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Theme/style.css';
import 'preact-material-components/Button/style.css';

import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';
import style from './style';
import * as MinesweeperService from './minesweeper.service';

export default class Home extends Component {

	state={};

	constructor(props) {
		super(props);
		let bombs = 200;
		let grid = MinesweeperService.createMineGrid(40,bombs);
		let gridObject = this.createGridObject(grid);
		console.log(grid);
		
		this.state = {
			grid: gridObject,
			flagCount: bombs
		};
	}
	
	createGridObject = (grid) => {
		for (let i = 0; i < grid.length; i++) {
			const row = grid[i];
			for (let j = 0; j < row.length; j++) {
				const column = row[j];
				grid[i][j] = {
					value: column
				};
			}
			
		}
		return grid;
	}

	checkForBomb =(gridItem) => {
		if (gridItem.value == '*'){
			return true;
		}
		return false;
	}

	revealNeighbours = (grid,x,y) => {
		console.log('checkneightbours', x, y);
		let t = [-1,0,1];
		for (let i of t) {
			for (let j of t) {
				if (i == 0 && j == 0){
					continue;
				}
				else {
					try {
						if (grid[x+i][y+j].state == undefined){
							if (grid[x+i][y+j].value != '*'){
								grid[x+i][y+j].state = 'REVEAL';
							}

							if (grid[x+i][y+j].value == '0'){
								this.revealNeighbours(grid,x+i,y+j);
							}
						}
					}
					catch (e){

					}
				}
			}
		}
		return grid;
	}

	revealAll = (grid) => {
		for (let i = 0; i < grid.length; i++) {
			const row = grid[i];
			for (let j = 0; j < row.length; j++) {
				const column = row[j];
				if (column.state == 'FLAGGED' && column.value != '*' ){
					column.state = 'GREEN';
				}
				else {
					column.state = 'REVEAL';
				}
				
				
			}
		}
		return grid;
	}

	reveal = (i,j) => (e) => {
		console.log(e);
		
		let grid = this.state.grid;
		let gridItem = grid[i][j];

		if (this.checkForBomb(gridItem)){
			grid = this.revealAll(grid);
			this.setState({
				gameState: 'OVER',
				grid
			});
		}

		if (gridItem.value == '0'){
			grid = this.revealNeighbours(grid,i,j);
		}

		gridItem.state = 'REVEAL';
		grid[i][j] = gridItem;

		this.setState({
			grid
		});
	}

	contextMenu = (i,j) => (e) => {
		e.preventDefault();
		let grid = this.state.grid;
		let flagCount  = this.state.flagCount;
		
		if (grid[i][j].state == 'FLAGGED'){
			delete grid[i][j].state;
			flagCount++;
		}
		else if (flagCount >0){
			grid[i][j].state = 'FLAGGED';
			flagCount--;
		}
		this.setState({
			grid,
			flagCount
		});
	}

	render() {
		return (
			<div class={`${style.home} page`}>

				<h1>Minesweeper</h1>
				Remaining Flags : {this.state.flagCount}
				{this.state.grid.map((rows,i) => (<div>
					{rows.map((column,j) =>

						(<Elevation class={`${style[column.state]} ${style.elevation} ${(column.value == '*' && column.state =='REVEAL')?style.red:''}`} z={column.state == 'REVEAL'?0:4}> <div class={style.box} onClick={this.reveal(i,j)} outlined onContextMenu={this.contextMenu(i,j)}>
							{column.state == 'FLAGGED' && 'X'}
							{column.state == 'REVEAL' && column.value}
							{!column.state && ' '}

							{/* {column.reveal && column.value} */}
						</div></Elevation>)
					)}
					<br />
				</div>)
				)}
			</div>
		);
	}
}
