
function Population(populationMAX, mutationRate) {

	this.populationMAX = populationMAX;
	this.mutateRate = mutationRate;

	this.individuals = [];	
	this.generation = 0;

	this.weiner = false;
	this.selectionProcess = 1; //set to this.selection.ROULETTE
	this.crossoverID = 1;

    this.matingPoolLength = 3;

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

	initGeneration: function() {
		if(this.populationMAX <= 0 || !this.populationMAX)
			throw new Error("populationMax is undefined");


		this.generation++;
        console.log(this.generation);

		for(var i = 0; i < this.populationMAX; i++) {
			this.individuals.push(new Individual());
			this.individuals[i].genomeConfig = this.genomeConfig;

			this.individuals[i].generateRandomGenome();
		}

		for(var i = 0; i < this.individuals.length; i++) {
			this.individuals[i].fitnessScore = tools.fitnessTest(this.individuals[i]);

			if(this.individuals[i].fitnessScore == this.genomeConfig.genomeLength) {
				this.weiner = true;
				console.log("WE GOTTA WINENENERNERNRENERN! :" + " " + this.individuals[i].genome);
			}
		}

	},

    /*
        TODO:
			finish up new generation functions

			merge initGeneration and createNewGeneration functions together

			in case fitness doesnt increase in population, always include the fittest individual
			from last geneartion into new generation
   	*/

	/*
		Refactor createNewGeneration function
	*/
	createNewGeneration: function() {
		if(this.populationMAX <= 0 || !this.populationMAX)
			throw new Error("populationMax is undefined");

        var newGeneration = [];

        if(this.generation < 1)
            this.initGeneration();

        var fittest = this.getFittestIndividual(this.individuals);

        //check if fitness improved since last generation
        var generationIsBetterThanLast = false;

		this.generation++;
        console.log(this.generation);

		if(this.selectionProcess == 1) { //roulette wheel selection
            newGeneration = tools.selection.roulette(
                this.individuals,
                this.genomeConfig,
                this.crossoverID,
                this.populationMAX,
                this.matingPoolLength
            ); //returns a newGeneration array using roulette TODO: last parameter is sketchy
		} else
            throw new Error("Selection ID is invalid!");

        /*
            Assign fitness to each individual in newGeneration array.

            Check if new generation has improved in fitness
         */
        for(var i = 0; i < newGeneration.length; i++) {
            newGeneration[i].fitnessScore = tools.fitnessTest(newGeneration[i]);

            if(newGeneration[i].fitnessScore >= fittest.fitnessScore)
                generationIsBetterThanLast = true;
        }

        if(tools.weinerChecker(newGeneration, this.genomeConfig.genomeLength)) {
            this.weiner = true;
            console.log("WE GOT A WEINEINERNENERNRENR!");
            throw Error('we done bruh');
        }

        /*
            If generation does not improve, delete an individual from array
            and push the fittest individual from last generation into array.

            This will prevent declines in fitness after generations.
         */
        if(!generationIsBetterThanLast) {
            newGeneration.pop();
            newGeneration.push(fittest);
        }

        this.individuals = newGeneration;
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
	sortArrayOfFittestIndividuals: function() {
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
	TOGGLE_BETWEEN_PARENTS: 1
};