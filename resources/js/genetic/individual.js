
function Individual(genomeLength) {	
	if(genomeLength && isNaN(genomeLength))
		throw new Error("genomeLength argument of Individual is not a number! Defaulting genomeLength to 10!");

	this.genome = [];
	this.fitnessScore = 0;
	//used for the roulette algorithm
	this.probability = 0;
}