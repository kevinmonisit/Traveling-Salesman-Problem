/*
	Creating the foundations and inspirations for SkyNet.
*/

var tests = {
	
	populationMAX: 10,
	population: new Population(null, 1),

	init: function() {
		
		this.population.populationMAX = this.populationMAX;
		this.population.createNewGeneration();
		
		//tools._tempGenerateGoal(this.population.genomeConfig.genomeLength);
		
		for(var i = 0; i < this.population.individuals.length; i++) {
			this.population.individuals[i].fitnessScore = tools.fitnessTest(this.population.individuals[i]); 
		}

		while(!this.population.weiner) {
			this.population.createNewGeneration();
		}

	}

};

tests.init();