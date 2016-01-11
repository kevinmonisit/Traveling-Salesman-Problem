/*
	Genetic Algorithms | Laying the foundations for SkyNet.
	Kevin's Science Fair ---
*/

TSP.createGeneration();

document.getElementById('btn').addEventListener("click", function() {
	TSP.createGeneration();
	main.updateRender();
});

window.addEventListener('keypress', function(e) {
	if(e.keyCode == 32) {
		TSP.createGeneration();
		main.updateRender();
	}
});

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

	}

};