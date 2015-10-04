function Population(populationMAX, mutationRate) {

	this.populationMAX = populationMAX;
	this.mutateRate = mutationRate;

	this.individuals = [];	
	this.generation = 0;

	this.weiner = false;
	this.selectionProcess = 0; //set to this.selection.ROULETTE
	this.crossover =

	this.genomeConfig = {
		genomeLength: 10,

		binaryGenome: false,
		//if binaryGenome is true, ignore below variables
		min: 0,
		max: 20
	};

}

/*
	If fitness level does not approve, save the two fittest parents and create a new generation!
*/

Population.prototype = {

	createNewGeneration: function() {
		if(this.populationMAX <= 0 || !this.populationMAX) 
			throw new Error("populationMAX is undefined!");
			
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

		//evaluate each individual and set their fitnessScore
		for(var i = 0; i < this.individuals.length; i++) {
			this.individuals[i].fitnessScore = tools.fitnessTest(this.individuals[i]); 
			
			//check if we got a weiner
			if(this.individuals[i].fitnessScore == this.genomeConfig.genomeLength) {
				this.weiner = true;
				console.log("WE GOTTA WINNNERRENNRNERN! : " + this.individuals[i].genome);
			}
		}

		this.sortArrayOfFittestIndividual();

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

Population.selection = {
	TOURNAMENT: 0,
	ROULETTE: 1
};

Population.crossover = {
	TWO_RANDOM_POINTS: 0,
	TOGGLE_BETWEEN_PARENTS: 1,

	/* Not really a good choice*/
	HALF_AND_HALF: 2
};