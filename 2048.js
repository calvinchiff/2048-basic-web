const Grid = require("./grid");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const askSizeGrid = () =>
	new Promise((resolve) =>
		rl.question("Choose the size of the grid (2 to 8): ", resolve)
	);

const getMoveInput = () =>
	new Promise((resolve) =>
		rl.question(
			"Enter move direction(w=up, a=left, d=right, s=down): ",
			(input) => {
				if (input === "q" || input === "s" || input === "z" || input === "d")
					resolve(input);
				else {
					console.log("Invalid direction. Please enter 'z', 'a', 's', or 'd'.");
					resolve(getMoveInput());
				}
			}
		)
	);

async function game2048() {
	console.log("2048 GAME");
	let size = 0;
	while (size < 2 || size > 8) {
		size = parseInt(await askSizeGrid(), 10);
		if (isNaN(size)) size = 0;
	}
	const gameGrid = new Grid(size);
	gameGrid.initializeGrid();
	gameGrid.displayGrid();

	while (!gameGrid.checkLose() && !gameGrid.checkWin()) {
		const moveDirection = await getMoveInput();
		gameGrid.move(moveDirection);
	}

	if (gameGrid.checkWin()) console.log("you won!");
	else if (gameGrid.checkLose()) console.log("you losed!");

	rl.close();
}

game2048();
