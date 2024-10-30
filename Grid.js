class Grid {
	constructor(size) {
		this.size = size;
		this.grid = Array.from({ length: size }, () => Array(size).fill(0));
	}

	initializeGrid() {
		this.addNewTile();
		this.addNewTile();
		// this.grid[0][0] = 4;
	}

	displayGrid() {
		// console.clear();
		console.table(this.grid);
		// for (let row of this.grid) {
		// 	console.log(row);
		// }
	}

	addNewTile() {
		const newTileValue = Math.random() < 0.9 ? 2 : 4;
		const emptyCells = this.getEmptyCells();
		if (emptyCells.length === 0) return;
		const randomCell =
			emptyCells[Math.floor(Math.random() * emptyCells.length)];
		this.grid[randomCell.row][randomCell.col] = newTileValue;
	}

	getEmptyCells() {
		let emptyCells = [];
		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid.length; col++) {
				if (this.grid[row][col] === 0) {
					emptyCells.push({ row, col });
				}
			}
		}
		return emptyCells;
	}

	move(direction) {
		if (this.checkMove(direction)) {
			if (direction === "q") this.moveLeft();
			else if (direction === "d") this.moveRight();
			else if (direction === "z") this.moveUp();
			else if (direction === "s") this.moveDown();
			this.addNewTile();
			this.displayGrid();
		}
	}

	moveRowLeft(row) {
		let newRow = row.filter((cell) => cell !== 0);

		for (let i = 0; i < row.length - 1; i++) {
			if (newRow[i] === newRow[i + 1] && newRow[i] != 0 && newRow[i]) {
				newRow[i] *= 2;
				newRow[i + 1] = 0;
			}
		}

		newRow = newRow.filter((cell) => cell !== 0);
		while (newRow.length < this.size) {
			newRow.push(0);
		}

		return newRow;
	}

	moveLeft() {
		for (let i = 0; i < this.size; i++) {
			// Apply moveRowLeft to each row individually
			this.grid[i] = this.moveRowLeft(this.grid[i]);
		}
	}

	moveRight() {
		for (let i = 0; i < this.size; i++) {
			// Reverse, apply moveRowLeft, and then reverse back
			this.grid[i] = this.moveRowLeft(this.grid[i].reverse()).reverse();
		}
	}

	moveUp() {
		this.transposeGrid();
		for (let i = 0; i < this.size; i++) {
			this.grid[i] = this.moveRowLeft(this.grid[i]);
		}
		this.transposeGrid(); // Transpose back to original orientation
	}

	moveDown() {
		this.transposeGrid();
		for (let i = 0; i < this.size; i++) {
			this.grid[i] = this.moveRowLeft(this.grid[i].reverse()).reverse();
		}
		this.transposeGrid(); // Transpose back to original orientation
	}

	transposeGrid() {
		for (let i = 0; i < this.size; i++) {
			for (let j = i + 1; j < this.size; j++) {
				[this.grid[i][j], this.grid[j][i]] = [this.grid[j][i], this.grid[i][j]];
			}
		}
	}

	checkMove(direction) {
		//check if the given direction allows tiles to move or shift
		const originalGrid = JSON.stringify(this.grid);

		if (direction === "q") this.moveLeft();
		else if (direction === "d") this.moveRight();
		else if (direction === "z") this.moveUp();
		else if (direction === "s") this.moveDown();

		const afterMove = JSON.stringify(this.grid);

		this.grid = JSON.parse(originalGrid);

		return afterMove !== originalGrid;
	}

	checkLose() {
		//if move to every direction impossible -> lose
		return (
			!this.checkMove("a") &&
			!this.checkMove("q") &&
			!this.checkMove("s") &&
			!this.checkMove("z")
		);
	}

	checkWin() {
		// if a tile = 2048 -> win
		let win = false;
		for (const row of this.grid) {
			for (const col of row) {
				if (col == 2048) win = true;
			}
		}
		return win;
	}
}

module.exports = Grid;
