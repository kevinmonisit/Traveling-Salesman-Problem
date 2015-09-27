/*

	TODO:
		Make Genome more flexible and more organized

*/


function Individual(genomeLength) {	
	if(genomeLength && isNaN(genomeLength))
		throw new Error("genomeLength argument of Individual is not a number! Defaulting genomeLength to 10!");

	this.genome = [];
	this.fitnessScore = 0;

	this.genomeConfig = {
		genomeLength: genomeLength,

		binaryGenome: true,
		//if binaryGenome is true, ignore below variables
		min: null,
		max: null
	};

}

Individual.prototype = {

	generateRandomGenome: function() {
		if(this.genomeConfig.binaryGenome == false && (!min || !max))
			throw new Error("Custom numbers is toggled on but min and max are still null! Check genomeConfig and try again!");

		var config = this.genomeConfig;
		for(var i = 0; i < config.genomeLength; i++) {
			
			if(config.binaryGenome) 
				this.genome.push(this.getRandomInt(0, 1));
			else if(!config.binaryGenome)
				this.genome.push(this.getRandomInt(config.min, config.max));
			else
				throw new Error("Genome Config of individual is not a boolean!");

		}
	},

	crossOver: function(individual) {

	},

	getRandomInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

};