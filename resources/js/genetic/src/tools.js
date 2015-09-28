
var tools = {

	_tempFitness: [],

	crossOver: {
		halfAndHalf: function(indiv, indiv2) {
			return 0;
		},

		/*
			Similar to the box2d algorithm for crossover
		*/
		randomTwoPoints: function(indiv, indiv2) {
			return 0;
		},

		toggleBetweenParents: function(indiv, indiv2) {
			return 0;			
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
		for(var i = 0; i < _tempFitness.length; i ++) {
			indiv.genome[i] == _tempFitness[i];
		}

		return fitness;
	},

	getRandomInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

};