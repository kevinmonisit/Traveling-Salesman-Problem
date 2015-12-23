/*
	TODO:
	Continue making TSP object
	Finish createGeneration - 
*/

var TSP = {
	//total population count of a generation
	populationCount: 12, 

	//array of all individuals in current generation
	individuals: [], 
	generation: 0,
	
	generation: 0,
	winner: false,
	
	genePoolPopulation: 3,
	possibleGenes: [],
	genomeLength: 10,

	plotMapArray: (function() {
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

		return arrayOfPlots;
	})(),

	createGeneration: function() {

		//generation is empty, therefore first generation
		if(TSP.individuals.length == 0) {
			TSP.generation++;

			for(var i = 0; i < TSP.populationCount; i++) {
				TSP.individuals.push(new Individual()); 
				TSP.individuals[i].genome = TSP.shuffle(TSP.plotMapArray);
		
				TSP.individuals[i].fitnessScore = tools.fitnessTest(TSP.individuals[i]);
			}

			//finished creating first generation, stop here
			return;
		}

		TSP.generation++;
		//add safety net in case generaton is worse
		TSP.individuals = tools.selection.roulette(TSP.individuals, 4);
	},

	createPlotMap: function(numOfPlots, min, max) {
		var arrayOfPlots = [];

		for(var i = 0; i < numOfPlots; i++) {
			arrayOfPlots.push({
				x: Math.floor(Math.random() * (max - min + 1)) + min,
				y: Math.floor(Math.random() * (max - min + 1)) + min
			});
		}

		return arrayOfPlots;
	},

	shuffle: function(array) {
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
	},

	getFittestIndividual: function(indivArray) {
		var fittest = indivArray[1];
		for(var i = 1; i < indivArray.length; i++) {
		}
	}
}