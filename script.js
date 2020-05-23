function createGrid(gridSize){
	let grid=[];
	for (let i = 0; i < gridSize; i++) {
		grid[i] = Array(gridSize).fill(0);
	}
	return grid;
}

function putBombs(grid, bombCount){
	let size = grid.length;

	for (let i = 0; i < bombCount; i++) {
		let x = Math.floor(Math.random() * size);
		let y = Math.floor(Math.random() * size);
		if (grid[x][y] == '*'){
			i--;
		}
		else {
			grid[x][y] = '*';
		}
  
	}
  
	return grid;
}

function printGrid(grid){
	for (let i = 0; i < grid.length; i++) {
		const element = grid[i];
		for (let j = 0; j < grid.length; j++) {
			let div = document.createElement('div');
			div.classList.add('block');
			div.textContent = grid[i][j];
			document.getElementById('grid').append(div);
			div.addEventListener('click',() => {
				grid[i][j].reveal = true;
			});
		}
		document.getElementById('grid').appendChild( document.createElement('br'));
		console.log(element.join(' '));

	}
}

function checkNeighbours(grid,x,y){
	let t = [-1,0,1];
	for (let i of t) {
		for (let j of t) {
			if (i == 0 && j == 0){
				continue;
			}
			else {
				try {
					if (grid[x+i][y+j] == '*'){
						grid[x][y]++;
					}
				}
				catch (e){

				}
			}
		}
	}
	// return count;
}

function putNumbers(grid){
	let size = grid.length;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (grid[i][j] != '*'){
				checkNeighbours(grid,i,j);
			}
		}
	}
	return grid;
}

let grid = createGrid(10);
putBombs(grid, 30);
// printGrid(grid);
putNumbers(grid);
console.log('------------------');
printGrid(grid);


var grid={
	x: 10,
	getX(){
		return this.x;
	}
};

var grid = function(){
	10;
	return {
		getX(){
			return this.x;
		}
	};
};
console.log(grid().getX());