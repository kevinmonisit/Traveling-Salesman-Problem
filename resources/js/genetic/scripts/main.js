/*
	Creating the foundations and inspirations for SkyNet.
*/

/*
* TODO:
*
* Add crossoverIds and selectionIds for different methods
*
* Refactor
*
* Finish selection proccesses
*
* Fix bugs
* Test
*
* And then dive into Box2d!!! WOOO!
*
* */

var tests = {
	
	populationMAX: 6,
	population: new Population(null, 1),

	init: function() {
		this.population.selectionProcess = Population.selection.ROULETTE;
		this.population.populationMAX = this.populationMAX;

		this.population.createNewGeneration();
		console.log(this.population.individuals);

		//while(!this.population.weiner) {
		//	this.population.createNewGeneration();
		//}

	}

};

 tests.init();