/*
	Genetic Algorithms | Laying the foundations for SkyNet.
	Kevin's Science Fair ---
*/

//init the cities
TSP.cityArray = (function(TSP) {
	var arrayOfPlots = [];
	var max = document.getElementById('canvas').width,
		min = 0,
		numOfPlots = this.TSP.amountOfCities;

	for(var i = 0; i < numOfPlots; i++) {
		arrayOfPlots.push({
			x: Math.floor(Math.random() * (max - min + 1)) + min,
			y: Math.floor(Math.random() * (document.getElementById('canvas').height - min + 1)) + min
		});
	}

	return arrayOfPlots;

})(TSP);

//cityArraySave = JSON.stringify(TSP.cityArray);

TSP.createGeneration();

var main = {
	ctx: document.getElementById("canvas").getContext('2d'),

	updateRender: function() {
		main.ctx.fillStyle = "#000";
		main.ctx.clearRect(0, 0, 900, 900);

		var fittest = TSP.getFittestIndividualOfPopulation();

		for(var i = 0; i < TSP.cityArray.length; i++) {
	
			//draw starting point
			if(i == 0) {
				main.ctx.beginPath();

				main.ctx.arc(TSP.startingPoint.x,TSP.startingPoint.y,10,0,2*Math.PI);		
				main.ctx.fillStyle = '#EA4335';
			
				main.ctx.fill();
			
				main.ctx.lineWidth = 2;
				main.ctx.stroke();
			}
			
			main.ctx.beginPath();
		
			main.ctx.arc(TSP.cityArray[i].x,TSP.cityArray[i].y,9,0,2*Math.PI);
			main.ctx.lineWidth = 1;
			main.ctx.stroke();
		}

		main.ctx.beginPath();
		main.ctx.moveTo(TSP.startingPoint.x, TSP.startingPoint.y);
		main.ctx.lineTo(fittest.genome[0].x, fittest.genome[0].y);
		main.ctx.stroke();

		for(var i = 1; i < TSP.cityArray.length; i++) {
			main.ctx.beginPath();

			main.ctx.moveTo(fittest.genome[i - 1].x, fittest.genome[i - 1].y);
			main.ctx.lineTo(fittest.genome[i].x, fittest.genome[i].y);
			main.ctx.stroke();
		 }

 		main.ctx.beginPath();
		main.ctx.moveTo(fittest.genome[fittest.genome.length - 1].x, fittest.genome[fittest.genome.length - 1].y);
		main.ctx.lineTo(TSP.startingPoint.x, TSP.startingPoint.y);
		main.ctx.stroke();
	},

	setButtonFunction: function(id, func) {
		document.getElementById(id).addEventListener('click', func);
	},

	getMousePos: function(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
  	}

};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

main.updateRender();
TSP.createGeneration();