/*
	TODO:
	Continue making TSP object
	Finish createGeneration - 
*/

var TSP = {
	//total population count of a generation
	populationCount: 12, 

	//array of all individuals in current generation
	individuals: [], 
	generation: 0,
	
	generation: 0,
	winner: true,
	
	genePoolPopulation: 3,
	possibleGenes: [],
	genomeLength: 10,

	plotMapArray: TSP.createPlotMap(10, 0, 100),

	createGeneration: function() {
		//generation is empty, therefore first generation
		if(individuals.length == 0) {
			for(var i = 0; i < TSP.populationCount) {
				individuals.push(new Individual()); 
				individuals[i].genome = TSP.shuffle(TSP.plotMapArray);
				individuals[i].fitnessScore = tools.fitnessTest(individuals[i]);
			}

			//finished creating first generation, stop here
			return;
		}
	},

	createPlotMap: function(numOfPlots, min, max) {
		var arrayOfPlots = [];

		for(var i = 0; i < numOfPlots; i++) {
			arrayOfPlots.push({
				x: Math.floor(Math.random() * (max - min + 1)) + min,
				y: Math.floor(Math.random() * (max - min + 1)) + min
			});
		}

		return arrayOfPlots;
	},

	shuffle: function(array) {
		var m = array.length, t, i;
		// While there remain elements to shuffle…
	  	while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}
}
/*
	If fitness level does not approve, save the two fittest parents and create a new generation!
*/

Population.prototype = {

	initGeneration: function() {
		this.generation++;
        console.log(this.generation);

		for(var i = 0; i < this.populationCount; i++) {
			this.individuals.push(new Individual());
			this.individuals[i].genomeConfig = this.genomeConfig;

			this.individuals[i].generateRandomGenome();
		}

		for(var i = 0; i < this.individuals.length; i++) {
			this.individuals[i].fitnessScore = tools.fitnessTest(this.individuals[i]);

			if(this.individuals[i].fitnessScore == this.genomeConfig.genomeLength) {
				this.winner = true;
				console.log("We have a winner! :" + " " + this.individuals[i].genome);
			}
		}

		console.log(this.individuals);

	},

    /*
        TODO:
			merge initGeneration and createNewGeneration functions together

			in case fitness doesnt increase in population, always include the fittest individual
			from last geneartion into new generation
   	*/

	/*
		Refactor createNewGeneration function
	*/
	createNewGeneration: function() {
		if(this.populationCount <= 0 || !this.populationCount)
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
                this.populationCount,
                this.genePoolPopulation
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
            this.winner = true;
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
        console.log(this.individuals);
    },

	_createGeneration: function() {
		if(this.populationCount <= 0 || !this.populationCount)
				throw new Error("populationMax is undefined");



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

	assignMutationToIndividual: function(individualIndex, genomeIndex, mutation) {
		if(!individualIndex || !genomeIndex || !mutation)
			throw Error("Parameters are invalid for assignMutationToIndividual function!");
		else if(!this.individuals.length)
			throw Error("Individuals/Current generation is empty!");

		this.individuals[individualIndex].genome[genomeIndex] = mutation;

	}, 
	assignGenomeToIndividual: function(individualIndex, genome) {
		if(!individualIndex| !genome)
			throw Error("IndividualIndex or genome is invalid.");
		else if(this.individuals.length == 0)
			throw Error("Individual array is empty!");

		this.individuals[individualIndex].genome = genome;
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