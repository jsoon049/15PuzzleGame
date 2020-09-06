function start_puzzle(){
	for(i=1; i<17; i++){
		document.getElementById("tile"+i).addEventListener("click", function(){clickTile(event)});
	}
	var tileOrder = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	for(i=0;i<tileOrder.length;i++){
		if(tileOrder[i]==0) document.getElementById("tile"+(i+1)).className = "tile0";
		else document.getElementById("tile"+(i+1)).innerHTML += tileOrder[i];
	}
}

function shuffle(nums){
  var current = nums.length, temp, shuffledNum;
  while (0 !== current) {
    shuffledNum = Math.floor(Math.random() * current);
    current -= 1;
    temp = nums[current];
    nums[current] = nums[shuffledNum];
    nums[shuffledNum] = temp;
  }
  return nums;
}

function clickTile(event){
	var tile = event.target.id;
	var tileNum = 0;
	if(tile.length==5) tileNum = parseInt(tile.slice(-1));
	else tileNum = tileNum = parseInt(tile.slice(-2));
	var values = getRowCol(tileNum);
	var row = values[0];
	var col = values[1];
	var emptyTile = "";
	if(col<3 && document.getElementById("game").rows[row].cells[col+1].className=="tile0"){//right
		emptyTile = document.getElementById("game").rows[row].cells[col+1].id;
		swapTile(tile, emptyTile);
	}
	else if(col>0 && document.getElementById("game").rows[row].cells[col-1].className=="tile0"){//left
		emptyTile = document.getElementById("game").rows[row].cells[col-1].id;
		swapTile(tile, emptyTile);
	}	
	else if(row>0 && document.getElementById("game").rows[row-1].cells[col].className=="tile0"){//up
		emptyTile = document.getElementById("game").rows[row-1].cells[col].id;
		swapTile(tile, emptyTile);
	}
	else if(row<3 && document.getElementById("game").rows[row+1].cells[col].className=="tile0"){//down
		emptyTile = document.getElementById("game").rows[row+1].cells[col].id;
		swapTile(tile, emptyTile);
	}	
	else alert("Illegal move! Please click one of the tiles next to the empty tile!");
	if(puzzleSolved()) {
		if(confirm('You won! Do you want to play again?'))location.reload();
	}
}

function getRowCol(tileNum){
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			if(document.getElementById("game").rows[i].cells[j].id=="tile"+String(tileNum)) return [i,j];
		}
	}
}

function swapTile(tile, emptyTile){
	var oldEmpty = document.getElementById(emptyTile);
	var newEmpty = document.getElementById(tile);
	var tmp = newEmpty.innerHTML;
	oldEmpty.classList.remove("tile0");
	oldEmpty.innerHTML += tmp;
	newEmpty.innerHTML = "";
	newEmpty.className = "tile0";
}

function puzzleSolved(){
	for(i = 1; i<16; i++) {
		var temp = document.getElementById("tile"+i).innerHTML;
		if(temp != i) return false;
	}
	return true;
}

