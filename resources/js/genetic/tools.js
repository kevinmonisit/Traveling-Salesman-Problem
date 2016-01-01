
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

			//loop enough times to create a new generation
			for(var i = 0; i < individuals.length; i++) {
				//used to crossover genomes into child
				var pairOfParents = [];

				//search for a pair of parents
				for(var j = 0; j < 2; j++) {
					var r = Math.random();
					console.log(r);
					var runningScore = 0;

					//search for the picked individual				
					for(var k = 0 ; k < individuals.length; k++) {
						if(r >= runningScore && r <= runningScore+individuals[k].probability) {
							pairOfParents.push(individuals[k]);
							break;
						}
						runningScore += individuals[k].probability;
					}
				}

				console.log(pairOfParents);

				newGeneration.push(new Individual());
				newGeneration[i].genome = tools.crossover.toggleBetweenParents(pairOfParents[0], pairOfParents[1], 1);
				newGeneration.fitnessScore = tools.fitnessTest();
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
			var deltaX = Math.pow(indiv.genome[i].x - indiv.genome[i - 1].x, 2);
			var deltaY = Math.pow(indiv.genome[i].y - indiv.genome[i - 1].y, 2);
			
			totalDistance += (Math.sqrt(deltaX + deltaY));
		}

		return totalDistance;
	}
};