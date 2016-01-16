/*
	Genetic Algorithms | Laying the foundations for SkyNet.
	Kevin's Science Fair ---
*/


TSP.createGeneration();


var main = {
	ctx: document.getElementById("canvas").getContext('2d'),

	updateRender: function() {
		main.ctx.fillStyle = "#000";
		main.ctx.clearRect(0, 0, 900, 900);

		var fittest = TSP.getFittestIndividualOfPopulation();

		for(var i = 0; i < TSP.plotMapArray.length; i++) {
			
			main.ctx.beginPath();
			main.ctx.arc(TSP.plotMapArray[i].x,TSP.plotMapArray[i].y,12,0,2*Math.PI);
			main.ctx.stroke();
		}

		for(var i = 1; i < TSP.plotMapArray.length; i++) {
			main.ctx.beginPath();
			main.ctx.moveTo(fittest.genome[i - 1].x, fittest.genome[i - 1].y);
			main.ctx.lineTo(fittest.genome[i].x, fittest.genome[i].y);
			main.ctx.stroke();
		}

	},

	setButtonFunction: function(id, func) {
		document.getElementById(id).addEventListener('click', func);
	}

};

var a = [1, 2, 3, 4, 5];
var b = a.slice();

function twoOptSwap(genome, randomPoint, randomPoint2) {
	var new_route = [];

	// var lowestRandomPoint = randomPoint2 < randomPoint ? randomPoint2 : randomPoint,
	// 	highestRandomPoint = lowestRandomPoint == randomPoint2 ? randomPoint : randomPoint2;
	
	for(var i = 0; i <= randomPoint - 1; i ++) {
		new_route.push(genome[i]);
	}

	//reverse order
	for(var i = randomPoint2; i >= randomPoint; i--) {
		new_route.push(genome[i]);
	}

	for(var i = randomPoint2 + 1; i < genome.length; i++) {
		new_route.push(genome[i]);
	}
	
	return new_route;
}


main.setButtonFunction('btn-gen', function() {
	TSP.createGeneration();
	main.updateRender();	
});

main.setButtonFunction('btn-2opt', function() {
	if(TSP.toggleTwoOptMutation())
		this.innerHTML = 'Untoggle 2-opt mutation';
	else
		this.innerHTML = 'Toggle 2-opt mutation';
});

main.setButtonFunction('btn-reset', function() {
	TSP.resetGeneration();
	main.updateRender();
});

window.addEventListener('keypress', function(e) {
	if(e.keyCode == 32) {
		TSP.createGeneration();
		main.updateRender();
	}
});

