/*
	Creating the foundations and inspirations for SkyNet.
*/

var tests = {
	
	populationMAX: 5,
	population: new Population(),

	init: function() {
		this.population.populationMAX = 5;
		this.population.createNewGeneration();
		
		
	}

};

tests.init();
