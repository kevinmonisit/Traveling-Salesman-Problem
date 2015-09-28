function Population(populationMAX) {
	
	this.populationMAX = populationMAX;

	this.individuals = [];	
	this.generation = 0;
	
	this.genomeConfig = {
		genomeLength: 10,

		binaryGenome: true,
		//if binartGenome is true, ignore below variables
		min: null,
		max: null
	};

}

Population.prototype = {
	
	createNewGeneration: function() {
		if(this.populationMAX <= 0 || !this.populationMAX)
			throw new Error("populationMAX is undefined!");

		this.generation++;
		
		for(var i = 0; i < this.populationMAX; i++) {
			this.individuals.push(new Individual());	
			this.individuals[i].genomeConfig = this.genomeConfig;
			this.individuals[i].generateRandomGenome();
		}

	}, 

	getFittestIndividual: function() {
		var fittest = this.individuals[0];
		
		for(var i = 1; i < this.individuals.length; i++) {
			if(fittest.fitnessScore < this.individuals[i].fitnessScore)
				fittest = this.individuals[i];
		}

		return fittest;
	}

};