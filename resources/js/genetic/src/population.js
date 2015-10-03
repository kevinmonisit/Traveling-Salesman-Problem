function Population(populationMAX, mutationRate) {
	
	this.populationMAX = populationMAX;
	this.mutateRate = 1;

	this.individuals = [];	
	this.generation = 0;
	this.sorted = false;

	this.genomeConfig = {
		genomeLength: 10,

		binaryGenome: true,
		//if binartGenome is true, ignore below variables
		min: null,
		max: null
	};

}

/*
	If fitness level does not approve, save the two fittest parents and create a new generation!
*/

Population.prototype = {
	
	/*
		Rewrite createNewGeneration function! It looks so messy!

		Fix sorted boolean, its disgusting
	*/
	createNewGeneration: function() {
		if(this.populationMAX <= 0 || !this.populationMAX) 
			throw new Error("populationMAX is undefined!");

		//if this is not the initial generation, sort array
		if(this.generation > 0) {
			this.sortArrayOfFittestIndividual();
		}
			
		this.generation++;
		console.log("Generation: " + this.generation);

		var newGenerationArray = [];
		for(var i = 0; i < this.populationMAX; i++) {
			newGenerationArray.push(new Individual());	
			newGenerationArray[i].genomeConfig = this.genomeConfig;
			
			//crossover two of fittest individuals into individual's genome	
			if(this.generation > 1)
				newGenerationArray[i].genome = tools.crossover.toggleBetweenParents(this.individuals[0], this.individuals[1], this.mutateRate);
			else 
				//if its the first generation, generate random genome
				newGenerationArray[i].generateRandomGenome();
		}

		//reset current individuals array to the new generation
		this.individuals = newGenerationArray;

		for(var i = 0; i < this.individuals.length; i++) {
			this.individuals[i].fitnessScore = tools.fitnessTest(this.individuals[i]); 
			if(this.individuals[i].fitnessScore == this.genomeConfig.genomeLength)
				console.log("WE GOTTA WINNNERRENNRNERN! : " + this.individuals[i].genome);
		}

		this.sortArrayOfFittestIndividual();
		console.log(this.individuals);

		this.sorted = false;
	},

	getFittestIndividual: function() {
		if(this.individuals.length <= 0)
			throw new Error("Cannot get fittest individual when individual array is null! getFittestIndividual()");

		var fittest = this.individuals[0];
		
		for(var i = 1; i < this.individuals.length; i++) {
			if(fittest.fitnessScore < this.individuals[i].fitnessScore)
				fittest = this.individuals[i];
		}

		return fittest;
	},

	/*
		Returns an array of the fittest individuals from biggest smallest
	*/
	sortArrayOfFittestIndividual: function() {
		this.sorted = true;
		if(this.individuals.length == 0)
			throw new Error("Cannot sort array when individuals array is empty!");

		//bubble sort
		var swapped = true;
		while(swapped) {
			swapped = false;
		
				for(var i = 0; i < this.individuals.length - 1; i ++) {
					if(this.individuals[i].fitnessScore < this.individuals[i+1].fitnessScore) {
						var temp = this.individuals[i];
						//swap elements
						this.individuals[i] = this.individuals[i+1];
						this.individuals[i+1] = temp;
						swapped = true;
					}
			}
		}

	}

};