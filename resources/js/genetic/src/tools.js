
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
		rouletteWheel: function(individuals, genomeConfig, crossoverID, populationMAX) {

			var newGeneration = [];
			var populationCount = populationMAX;

			var sumOfAllFitnesses = 0;
			for(var i = 0; i < individuals.length; i++) {
				sumOfAllFitnesses += individuals[i].fitnessScore;
			}

			for(var i = 0; i < individuals.length; i++) {
				individuals[i].probability = individuals[i].fitnessScore / sumOfAllFitnesses;

				if(isNaN(individuals[i].probability)) individuals[i].probability = 0; //divided by 0! oh noes!
			}

			for(var i = 0; i < populationCount; i++) {
				var _genome = [];
				var par1, par2;
				newGeneration.push(new Individual());
				newGeneration[i].genomeConfig = genomeConfig;

				/*
					TODO:

						Finish probability and find two parents
				*/

				//find two pairs of parent using probability
				for(var parentCount = 0; parentCount < 1; parentCount++) {
					var r = Math.random();
					var _noFitnessCount = 0; //if variable equals populationMAX, all individuals have 0 fitness

					for(var j = 1; j < individuals.length; j++) {

						if (tools.fitnessTest(individuals[j]) == 0) _noFitnessCount++;

						//check if current individual is closer to random number than the last
						if (Math.abs(r - individuals[j].probability) < Math.abs(r - individuals[i - 1].probability)) {
							if (parentCount == 0) {
								par1 = individuals[j];
								break;
							} else {
								par2 = individuals[j];
								break;
							}
						}
					}
				}

				if(crossoverID == 1) {
					//console.log(par1 + " " + par2);
					//_genome = tools.crossover.toggleBetweenParents(par1, par2);
				} else throw new Error("CrossoverID is invalid!");
				newGeneration[i].genome = _genome;
			}

			return newGeneration;
		},

		/*

		 Fi = fitness of individual
		 N = population count

		 pi = fi / Σ j(fj) for j = 1 … N
		 */
		roulette: function(individuals, genomeConfig, crossoverID) {
			var newGeneration = [];
			var sumOfAllFitnesses = 0;
			var par1, par2;
			var bias = 0.1;

			if(!individuals || !genomeConfig || !crossoverID) throw Error("Invalid parameters!");

			for(var i = 0; i < individuals.length; i++) {
				sumOfAllFitnesses += individuals[i].fitnessScore;
			}

			for(var i = 0; i < individuals.length; i++) { //set probability for individuals
				individuals[i].probability = individuals[i].fitnessScore / sumOfAllFitnesses;

				if(isNaN(individuals[i].probability)) individuals[i].probability = 0; //divided by 0! oh noes!
			}

			/*
			 http://stackoverflow.com/a/10949834
			* */

			for(var parentCount = 0; parentCount < 2; parentCount++) {
				var r = Math.random();
				var runningScore = 0;
				for(var i = 0; i < individuals.length; i++) {
					if(r >= runningScore && r <= runningScore+individuals.probability)
						return "adakdla";
					runningScore += individuals[i].probability;
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