/*
	Creating the foundations and inspirations for SkyNet.
*/

// var tests = {

// 	populationMAX: 6,
// 	population: new Population(null, 1),

// 	init: function() {
// 		this.population.selectionProcess = Population.selection.ROULETTE;
// 		this.population.populationMAX = this.populationMAX;

// 		this.population.createNewGeneration();
// 		console.log(this.population.individuals);

// 		//while(!this.population.weiner) {
// 		//	this.population.createNewGeneration();
// 		//}

// 	}

// };

//tests.init();

/*
	
	var Car = (function() {
		function Car() {
	
		}

		Car.prototype. = blah blah
		return Car;
	})();

*/

/*
 */

(function() {
		var cityArray = createPlotMap(10, 1, 10),
		populationCount = 6,
		population = new Population(populationCount);

		function createPlotMap(numOfPlots, min, max) {
			var arrayOfPlots = [];

			for(var i = 0; i < numOfPlots; i++) {
				arrayOfPlots.push({
					x: Math.floor(Math.random() * (max - min + 1)) + min,
					y: Math.floor(Math.random() * (max - min + 1)) + min
				});
			}

			return arrayOfPlots;
		}

		//fisher yates shuffle
		function shuffle(array) {
			var m = array.length, t, i;
			// While there remain elements to shuffle…
		  	while (m) {

				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);

				// And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}

			return array;
		}

		population.selectionProcess = Population.selection.ROULETTE;
		
		population.createNewGeneration();

		while(!population.winner) {
			population.createNewGeneration();
		}

})();
