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

	shuffle: function(array) {
	    console.log(array);

	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
			array[j] = temp;
	    }

	    return array;
	},

	createGeneration: function() {
		if(TSP.individuals.length == 0) {
			for(var i = 0; i < TSP.populationCount; i++) {
				TSP.individuals.push(new Individual());

				//dereference variable to not cause trouble
				var _genome = TSP.plotMapArray.slice();
				TSP.individuals[i].genome = TSP.shuffle(_genome);
			}

			return;
		}
		
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
	getFittestIndividual: function(indivArray) {
		var fittest = indivArray[1];
		for(var i = 1; i < indivArray.length; i++) {
		}
	},

	getAverageFitnessOfPopulation: function() {
		var sum = 0;
		for(var i = 0; i < TSP.individuals; i++) {
			sum += TSP.individuals.fitnessScore;	
		}

		return sum / TSP.individuals.length;
	}
}

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}