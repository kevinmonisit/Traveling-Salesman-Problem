
var tools = {

	_tempFitness: [],

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
				var randomIndex = tools.getRandomInt(0, indiv.genome.length);
				
				/*
					Bug here:!!!! 

					When genomeConfig.binaryGenome is toggled off, this messes everything up!
				*/

				//toggle a gene
				newChildGenome[randomIndex] = newChildGenome[randomIndex] == 0 ? 1 : 0;
			}

			return newChildGenome;
		}
	},

	/*
		Temporary function
	*/
	_tempGenerateGoal: function(genomeLength) {
		for(var i = 0; i < genomeLength; i++)
			this._tempFitness.push(0);
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