
var tools = {

	crossover: {
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

		roulette: function(individuals, genePoolPopulation) {
			if(!individuals)
				throw Error("Parameters have an invalid input!");

			var sumOfFitnesses = 0;
			var pairOfParents = [],
				newGeneration = [];

			for(var i = 0; i < individuals.length; i++) {
				sumOfFitnesses += individuals[i].fitnessScore;
				if(!individuals[i].fitnessScore)
					throw Error("Fitness score of individual " + i + " is invalid or 0!");
			}

			for(var i = 0; i < individuals.length; i++) {
				individuals[i].probability = individuals[i].fitnessScore / sumOfFitnesses;
			}

			for(var i = 0; i < individuals.length; i++) {
				var pairOfParents = [];

				//search for a pair of parents
				for(var i = 0; i < 2; i++) {
					var r = Math.random();
					var runningScore = 0;

					//search for the picked individual				
					for(var i = 0 ; i < individuals.length; i++) {
						if(r >= runningScore && r <= runningScore+individuals[i].probability) {
							pairOfParents.push(individuals[i]);
						}
					}
				}

				newGeneration.push(new Individual());
				newGeneration[i].genome = tools.crossover.toggleBetweenParents(pairOfParents[0], pairOfParents[1], 1);

			}

			return newGeneration;
		},

		tournament: function(individuals) {

		},
	},

	fitnessTest: function(indiv) {
		var totalDistance = 0;

		//calculate distance
		for(var i = 1; i < indiv.genome.length; i++) {
			//pythagorean theroem
			var deltaX = Math.abs(indv.genome[i].x - indv.genome[i - 1].x);
			var deltaY = Math.abs(indv.genome[i].y - indv.genome[i - 1].y);
			
			totalDistance += (Math.sqrt(deltaX + deltaY));
		}

		return 1 / totalDistance;
	},
};