
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
		roulette: function(individuals, genomeConfig, crossoverID, populationMAX, matingPoolLength, mutateRate) {
			var newGeneration = [];
			var sumOfAllFitnesses = 0;

			var matingPool = [];
			var bias = 0.1;

			if(!individuals || !genomeConfig || !crossoverID || !populationMAX || !matingPoolLength) throw Error("Invalid parameters!");

			for(var i = 0; i < individuals.length; i++) {
				sumOfAllFitnesses += individuals[i].fitnessScore;
			}

			for(var i = 0; i < individuals.length; i++) { //set probability for individuals
				individuals[i].probability = individuals[i].fitnessScore / sumOfAllFitnesses;

				if(isNaN(individuals[i].probability)) individuals[i].probability = 0; //divided by 0! oh noes!
			}

			/*
				Function based on:
					http://stackoverflow.com/a/10949834
			 		http://www.geatbx.com/docu/algindex-02.html
			*/

			for(var j = 0; j < matingPoolLength; j++) {
				var r = Math.random();
				var runningScore = 0;

				for(var i = 0; i < individuals.length; i++) {
					if(r >= runningScore && r <= runningScore+individuals[i].probability) {
						matingPool.push(individuals[i]);
					}
					runningScore += individuals[i].probability;
				}
			}

            //TODO
            //if fitness does not approve, include last parents into current generation

            //no individual was fit enough!!
            if(matingPool.length === 0) {
                matingPool = individuals; //resort back
            }

			/*

			TODO:
				Sometimes, there is an error that indiv.genome is null on line 21

				This is due to the gene pool being empty and this for loop calling upon it

				The reason why its empty is that none of the individuals have a fitness, therefore
				it does not get into roulette algorithm and cries in the corner because he is sad
			* */

			for(var i = 0; i < populationMAX; i++) {
				newGeneration.push(new Individual());

				switch (crossoverID) {
					case 1: //toggle between parent genomes

						//get random pair of parents from mating pool
						newGeneration[i].genome = tools.crossover.toggleBetweenParents(
							matingPool[tools.getRandomInt(0, matingPool.length - 1)],
							matingPool[tools.getRandomInt(0, matingPool.length - 1)],
							mutateRate //mutate rate
						);
						break;
					default:
						console.log("CrossoverID error!");
						break;
				}

			}

			return newGeneration;
		},

		tournament: function(individuals) {

		},

		getRandomIndividual: function() {

		}
	}
	,


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

	/*
		Temporary function
	*/
	weinerChecker: function(individuals, genomeLength) {
		var weiner = false;
		for(var i = 0; i < individuals.length; i++) {
			if(individuals[i].fitnessScore == genomeLength) {
				weienr = true;
			}
		}

		return weiner;
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	log: function() {}

};