
var tools = {

	_tempFitness: [12,6,3,12,12,8,1,1,9,10],

	crossover: {
		halfAndHalf: function(indiv, indiv2) {
			return 0;
		},

		/*
			Similar to the box2d algorithm for crossover
		*/
		randomTwoPoints: function(indiv, indiv2) {
			return 0;
		},

		toggleBetweenParents: function(indiv, indiv2, mutateRate) {
			var newChildGenome = [];

			for(var i = 0; i < indiv.genome.length; i++) {
				//randomly toggle between both parent's genome and push it into the child 
				newChildGenome.push(tools.getRandomInt(0,1) == 0 ? indiv.genome[i] : indiv2.genome[i])
			}

			for(var i = 0; i < mutateRate; i++) {
				var randomIndex = tools.getRandomInt(0, indiv.genome.length - 1);

				//mutate gene
				newChildGenome[randomIndex] = tools.getRandomInt(indiv.genomeConfig.min, indiv.genomeConfig.max);
			}

			return newChildGenome;
		}
	},

	selection: {
		/*

			Fi = fitness of individual
			N = population count

		 	pi = fi / Σ j(fj) for j = 1 … N
		*/
		rouletteWheel: function(individuals, crossoverID) {

			var newGeneration = [];
			var populationCount = individuals.length;

			var sumOfAllFitnesses = 0;
			for(var i = 0; i < individuals.length; i++)
				sumOfAllFitnesses = individuals.fitnessScore;

			for(var i = 0; i < individuals.length; i++) {
				individuals[i].probability = individuals[i].probability / sumOfAllFitnesses;
			}

			for(var i = 0; i < populationCount; i++) {
				newGeneration.push(new Individual());
				/*
					TODO:

						Add crossoverIDs
						Add selectionIDs
				* */
				newGeneration[i].genome = crossoverID == 1 ? tools.toggleBetweenParents() : null;
			}

		},

		tournament: function(individuals) {

		}
	},


	/*
		Temporary function
	*/
	fitnessTest: function(indiv) {
		var fitness = 0;

		for(var i = 0; i < this._tempFitness.length; i ++) {
			if(indiv.genome[i] == this._tempFitness[i]) 
				fitness++;
		}

		return fitness;
	},

	getRandomInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

};