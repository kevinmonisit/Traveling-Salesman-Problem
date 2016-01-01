/*
	Creating the foundations and inspirations for SkyNet.
*/

var arrayOfPlots = [];
		var max = 100,
			min = 0,
			numOfPlots = 10;

		for(var i = 0; i < numOfPlots; i++) {
			arrayOfPlots.push({
				x: Math.floor(Math.random() * (max - min + 1)) + min,
				y: Math.floor(Math.random() * (max - min + 1)) + min
			});
		}

TSP.plotMapArray = arrayOfPlots;

function getPlotArray() {
	return TSP.plotMapArray;
}

TSP.createGeneration();

//TSP.createGeneration();