
var TSP = {
	
	populationCount: 100,

	mutateRate: 0.4,
	crossoverRate: 0.8,

	individuals: [],
	lastFittestIndividual: null,
	
	cityArray: null,
	amountOfCities: 100,

	generation: 0,

	selection: "TOURNAMENT",
	//unused
	crossover: "two",
	mutation: "INVERSE",

	//the route starts and ends at this point
	startingPoint: (function() {
		var max = document.getElementById('canvas').width,
			min = 0;

		return {
			x: Math.floor(Math.random() * (max - min + 1)) + min,
			y: Math.floor(Math.random() * (document.getElementById('canvas').height - min + 1)) + min
		};

	})(),

	generationCountElement: document.getElementById("generationCount"),
	averageFitnessElement: document.getElementById("avgFitness"),

	createGeneration: function() {
		console.log("GENERATION: " + TSP.generation++);

		TSP.generationCountElement.innerHTML = TSP.generation;
		TSP.averageFitnessElement.innerHTML = TSP.getAverageFitnessOfPopulation();

		//check if its the first generation
		if(TSP.individuals.length == 0) {
			for(var individualIndex = 0; individualIndex < TSP.populationCount; individualIndex++) {	
				TSP.individuals.push(new Individual());

				//dereference cityArray to not cause problems using slice
				var cityArray = TSP.cityArray.slice();
				
				TSP.individuals[individualIndex].genome = TSP.shuffle(cityArray);
				TSP.individuals[individualIndex].genome = cityArray;

				TSP.individuals[individualIndex].fitnessScore = tools.fitnessTest(TSP.individuals[individualIndex]);
			}

			return;
		}

		lastFittestIndividual = TSP.getFittestIndividualOfPopulation();

		if(TSP.selection.toLowerCase() == "roulette")
			TSP.individuals = tools.selection.roulette(TSP.individuals, TSP.mutateRate);
		else if(TSP.selection.toLowerCase() == "tournament") 
			TSP.individuals = tools.selection.tournament(TSP.individuals, TSP.mutateRate);
		else 
			throw Error("I don't know how this happened. Selection string is messed up for selection.");

		TSP.individuals.push(lastFittestIndividual);

		console.log(TSP.getAverageFitnessOfPopulation());
		if(TSP.generation > 0)
			textFile += (TSP.getAverageFitnessOfPopulation()* Math.pow(10, 5) + "\n")
	},

	getAverageFitnessOfPopulation: function() {
		var sumOfFitness = 0;

		for(var individualIndex = 0; individualIndex < TSP.individuals.length; individualIndex++) {
			sumOfFitness += TSP.individuals[individualIndex].fitnessScore;
		}

		return sumOfFitness / TSP.individuals.length;
	},

	getFittestIndividualOfPopulation: function() {
		var fittest = TSP.individuals[0];
		
		for(var individualIndex = 1; individualIndex < TSP.individuals.length; individualIndex++) {
			if(TSP.individuals[individualIndex].fitnessScore > fittest)
				fittest = TSP.individuals[individualIndex];
		}

		return fittest;
	},

	resetIndividuals: function() {
		console.log("Resetting individuals.");
		TSP.individuals = [];
	
		TSP.createGeneration();
	},

	resetEverything: function() {
		console.log("Resetting everything.");
		//reset variables
		TSP.individuals = [];
		TSP.cityArray = [];

		TSP.cityArray = (function(TSP) {

			var newCityArray = [];

			var maxRandomCoordinate = document.getElementById('canvas').width,
			minimumRandomCordinate = 0;

			for(var cityIndex = 0; cityIndex < TSP.amountOfCities; cityIndex++) {
			
				newCityArray.push({
					x: Math.floor(Math.random() * (maxRandomCoordinate - minimumRandomCordinate + 1)) + minimumRandomCordinate,
					y: Math.floor(Math.random() * (document.getElementById('canvas').height - minimumRandomCordinate + 1)) + minimumRandomCordinate
				});
			
			}

			return newCityArray;

		})(TSP);

		TSP.createGeneration();

	},

	//fisher yates
	shuffle: function(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
			array[j] = temp;
	    }

	    return array;
	}

}
