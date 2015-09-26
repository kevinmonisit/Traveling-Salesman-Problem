//Gene Framework

function population(populationMAX) {
	
	this.populationMAX = populationMAX;
	if(populationMAX <= 0 || !populationMAX)
		return "populationMAX is undefined!";
	this.individuals = [];	

	this.generation = 0;
}

population.prototype = {
	
	//create next generation of individuals
	createGeneration: function() {
		for(var i = 0; i < this.populationMAX; i++) {

		}
	}

};