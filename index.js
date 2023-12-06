//GLOBAL VARIABLES
let player;
const tileSize = 36;
const classes = {
	' ': 'tile tile-space',
	'W': 'tile tile-wall',
	'G': 'tile tile-goal',
	'B': 'tile entity-block',
	'P': 'tile entity-player',
};

//FUNCTIONS
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
	let playerNode = document.getElementById(newPlayerId)
	let targetNodeClass = playerNode.classList[1]

	if (targetNodeClass == 'tile-wall') return;
	if (targetNodeClass == 'tile-goal') targetNodeClass = 'tile-space'; //"goal" (orange dots)

	if (targetNodeClass == 'entity-block') { //move the block
		console.log('newPlayerId', newPlayerId);
		console.log('player', player);
		


	}


	$('.entity-player').toggleClass(`entity-player ${targetNodeClass}`)
	$(playerNode).toggleClass(`${targetNodeClass} entity-player`)


	// player = $('.entity-player').attr('id')
	// console.log('targetNodeClass', targetNodeClass);
	convertPlayerToObject()
}

const playerMovement = ({ key }) => ({
	'ArrowLeft': () => updatePlayerPosition(`x:${player.x - 1},y:${player.y}`),
	'ArrowRight': () => updatePlayerPosition(`x:${player.x + 1},y:${player.y}`),
	'ArrowUp': () => updatePlayerPosition(`x:${player.x},y:${player.y - 1}`),
	'ArrowDown': () => updatePlayerPosition(`x:${player.x},y:${player.y + 1}`),
})[key]?.() || null;

convertPlayerToObject = () => {
	player = $('.entity-player')
		.attr('id')
		.split(',')
		.reduce((obj, str) => {
			let strParts = str.split(":");
			obj[strParts[0]] = parseInt(strParts[1]);
			return obj;
		}, {});
}

//DOMCONTENT LOADED
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