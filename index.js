//GLOBAL VARIABLES
const tileSize = 36;
let player
const classes = {
	' ': 'tile tile-space',
	'W': 'tile tile-wall',
	'G': 'tile tile-goal',
	'B': 'tile entity-block',
	'P': 'tile entity-player',
}

const setupBoard = ({ mapGrid, width, height }) => {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if ([mapGrid[y]] && [mapGrid[y][x]]) {
				let tile = document.createElement('div');
				$(tile)
					.addClass(classes[mapGrid[y][x]])
					.attr('id', `x:${x},y:${y}`);
				$('#board').append(tile)
			}
		}
	}
}





const updatePlayerPosition = (newPlayerId) => {



	console.log(newPlayerId);

	let targetNode = document.getElementById(newPlayerId)
	let targetNodeClass = targetNode.classList[1]

	$('.entity-player').toggleClass(`entity-player ${targetNodeClass}`)
	$(targetNode).toggleClass(`${targetNodeClass} entity-player`)

	player = $('.entity-player').attr('id')
	convertPlayerToObject()
}

const moveLeft = () => {
	console.log(player);
	let newPlayerId = `x:${player.x - 1},y:${player.y}`;
	updatePlayerPosition(newPlayerId)
}

const moveRight = () => {
	console.log(player);
	let newPlayerId = `x:${player.x + 1},y:${player.y}`;
	updatePlayerPosition(newPlayerId)
}

const moveUp = () => {
	console.log(player);
	let newPlayerId = `x:${player.x},y:${player.y - 1}`;
	updatePlayerPosition(newPlayerId)
}

const moveDown = () => {
	console.log(player);
	let newPlayerId = `x:${player.x},y:${player.y + 1}`;
	updatePlayerPosition(newPlayerId)
}

const playerMovement = ({ key }) => ({
	'ArrowLeft': () => moveLeft(),
	'ArrowRight': () => moveRight('right'),
	'ArrowUp': () => moveUp(),
	'ArrowDown': () => moveDown(),
})[key]?.() || null;


convertPlayerToObject = () => {
	player = $('.entity-player')
		.attr('id')
		.split(',')
		.reduce((obj, str) => {
			console.log('HERE', obj);
			let strParts = str.split(":");
			obj[strParts[0]] = parseInt(strParts[1]);
			return obj;
		}, {});
}




$(() => {
	//DEFAULT VALUES
	$('#board').css({
		display: 'grid',
		gridTemplateColumns: `1fr repeat(${tileMap01.width - 1}, ${tileSize}px)`,
		height: tileMap01.height * tileSize,
		width: 'fit-content'
	});

	setupBoard(tileMap01)
	convertPlayerToObject()

	//EVENTLISTENERS
	$(document).on('keydown', playerMovement)
})