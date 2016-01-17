<<<<<<< HEAD
/*
	TODO:
	Continue making TSP object
	Finish createGeneration - 

	Implement 2-opt swap in mutation algorithm
*/

var TSP = {
	//total population count of a generation
	populationCount: 1000, 
=======

var TSP = {
	//total population count of a generation
	populationCount: 150, 
>>>>>>> Custom-Route-Feature

	//array of all individuals in current generation
	individuals: [],
	lastFittestIndividual: null,

	generation: 0,
	mutateRate: 0.30,
	crossoverRate: 0.8,

	genePoolPopulation: 3,
	possibleGenes: [],
	genomeLength: 50,

<<<<<<< HEAD
	//if average fitness decreases, it will give the program 10 tries to get a higher fitness
	warningIteration: 50,

	plotMapArray: (function() {
		var arrayOfPlots = [];
		var max = document.getElementById('canvas').width, // temporary, kevin, you'll probably forget anyways, so i will make this comment big and wide so you'll see it
 			min = 0,
			numOfPlots = 50;
=======
	twoOptMutation: true,
	init: false,

	plotMapArray: null,
>>>>>>> Custom-Route-Feature

	startingPoint: (function() {
		var max = document.getElementById('canvas').width,
			min = 0;

		return {
			x: Math.floor(Math.random() * (max - min + 1)) + min,
			y: Math.floor(Math.random() * (document.getElementById('canvas').height - min + 1)) + min
		};

	})(),

	//fisher yates
	shuffle: function(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
			array[j] = temp;
	    }

	    return array;
	},

	createGeneration: function() {
		TSP.generation++;

		console.log("GENERATION: " + TSP.generation + " =============================");

		//check if it's the first generation
		if(TSP.individuals.length == 0) {
			for(var i = 0; i < TSP.populationCount; i++) {
				TSP.individuals.push(new Individual());

				//dereference variable to not cause shuffle bug
				var _genome = TSP.plotMapArray.slice();
				
				TSP.individuals[i].genome = TSP.shuffle(_genome);
				TSP.individuals[i].genome = _genome;

//				TSP.individuals[i].fitnessScore = tools.fitnessTest(TSP.individuals[i]);
			}

			return;
		}

		lastFittestIndividual = TSP.getFittestIndividualOfPopulation();
		TSP.individuals = tools.selection.tournament(TSP.individuals, TSP.mutateRate, TSP.twoOptMutation);
		//TSP.individuals.push(lastFittestIndividual);
	
		console.log(TSP.getAverageFitnessOfPopulation());
	},

	getAverageFitnessOfPopulation: function() {
		var sum = 0;

		for(var i = 0; i < TSP.individuals.length; i++) {
			sum += TSP.individuals[i].fitnessScore;
		}
		return sum / TSP.individuals.length;
	},

	getFittestIndividualOfPopulation: function() {
		var fittest = TSP.individuals[0];
		for(var i = 1; i < TSP.individuals.length; i++) {
			if(TSP.individuals[i].fitnessScore > fittest)
				fittest = TSP.individuals[i];
		}

		return fittest;
	},

	resetGeneration: function() {
		console.log("RESETING GENERATION!");
		
		TSP.plotMapArray = (function() {
			var arrayOfPlots = [];
			var max = document.getElementById('canvas').width,
	 			min = 0,
				numOfPlots = 100;

			for(var i = 0; i < numOfPlots; i++) {
				arrayOfPlots.push({
					x: Math.floor(Math.random() * (max - min + 1)) + min,
					y: Math.floor(Math.random() * (max - min + 1)) + min
				});
			}

			return arrayOfPlots;

		})();
		TSP.individuals = [];
		TSP.createGeneration();
	},

	toggleTwoOptMutation: function() {
		if(this.twoOptMutation)
			this.twoOptMutation = false;
		else
			this.twoOptMutation = true;

		return this.twoOptMutation;
	}
}
