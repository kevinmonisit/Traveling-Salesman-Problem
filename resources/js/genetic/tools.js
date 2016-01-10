
var tools = {

	crossover: {
		/*
			like the one from box2d
		*/
		randomTwoPoints: function(indiv, indiv2) {
			return 0;
		},

		twoPointCrossver: function(par1, par2, mutateRate ) {
			var genomeLength = par1.genome.length;

			var newChildGenome = [];

			//get two random points in genome
			var r1 = Math.floor(Math.random() * (genomeLength)),
				r2 = Math.floor(Math.random() * (genomeLength));

			// if(r1 == r2) {
			// 	console.log("r1 == r2");
			// 	if(r2 + 1 <= genomeLength)
			// 		r2++;
			// 	else if(r2 - 1 >= 0)
			// 		r2 --;
			// 	else
			// 		console.log('woah');
			// }

			var lowestRandomPoint = r2 < r1 ? r2 : r1,
				highestRandomPoint = lowestRandomPoint == r2 ? r1 : r2;

			console.log("Random 1 : " + r1);
			console.log("Random 2 : " + r2);
			console.log("LowestRandomPoint: " + lowestRandomPoint);

			var unselectedPar1Genome = [],
				unselectedPar2Genome = [],
				selectedPar2Genome = [];

			for(var i = 0; i < genomeLength; i++) {
				//get genes outside of the two random points
				if(i < lowestRandomPoint || i > highestRandomPoint) {
					unselectedPar1Genome.push(par1.genome[i]);
					unselectedPar2Genome.push(par2.genome[i]);
				}

				//get genes inside of the two random points
				if(i >= lowestRandomPoint && i <= highestRandomPoint) {
					selectedPar2Genome.push(par2.genome[i]);
				}
			}

			console.log("Original: " + unselectedPar2Genome);
			console.log("Original: " + unselectedPar1Genome);

			//delete duplicates in unselectedPar2Genome
			for(var i = 0; i < unselectedPar2Genome.length; i++) {
				if(unselectedPar1Genome.indexOf(unselectedPar2Genome[i]) > -1) {	
					unselectedPar2Genome.splice(i, 1);
					i--;
				}
			}

			console.log("unselectedPar2Genome: " + unselectedPar2Genome);
			console.log("unselectedPar1Genome: " + unselectedPar1Genome);
			console.log("selectedPar2Genome: " + selectedPar2Genome);
			
			for(var i = 0; i < genomeLength; i++) {
				if(i < lowestRandomPoint) {
					 newChildGenome.push(par1.genome[i]);
				} else if(i >= lowestRandomPoint && i <= highestRandomPoint) {

					if(!unselectedPar1Genome.indexOf(par2.genome[i])) {
						
						var randomIndex = Math.floor(Math.random() * (unselectedPar2Genome.length));
						newChildGenome.push(unselectedPar2Genome[randomIndex]);
						unselectedPar2Genome.splice(randomIndex, 1);

					} else {

						newChildGenome.push(par2.genome[i]);
					
					}

				} else if(i > highestRandomPoint) {
					newChildGenome.push(par1.genome[i]);
				}
			}

			return newChildGenome;

			/*
					0.15  0.2
					 |
				-----|----|-

				-------------
				r1 = 0.2
				r2 = 0.15

				r1 = Math.random(max, min)
				r2 = Math.random(max, min)

				if(r2 < r1) else r1 < r2

				Generate two random points in a genome;

				//get lowest point
				var lowestRandomPoint = r2 <= r1 ? r2 : r1;
				for(var i = 0; i < par1.genome.length; i++) {
					if(i <= lowestRandomPoint || i >= r2)
						newChildGenome.push(par1.genome[i]);
					else if(i > lowestRandomPoint && i < r2)
						newChildGenome.push(par2.genome[i]);

				}
			*/

		},

		toggleBetweenParents: function(indiv, indiv2, mutateRate) {
			var newChildGenome = [];

			for(var i = 0; i < indiv.genome.length; i++) {
				//randomly toggle between both parent's genome and push it into the child
				newChildGenome.push(Math.floor(Math.random() * (2)) == 0 ? indiv.genome[i] : indiv2.genome[i])
			}

			return newChildGenome;
		}
	},

	selection: {

				/*
			Pick a few individuals from array
			Pick the best genome of the gene pool
			Use it for crossover

			N = population size
P = create parent population by randomly creating N individuals
while not done
    C = create empty child population
    while not enough individuals in C
        parent1 = select parent   ***** HERE IS WHERE YOU DO TOURNAMENT SELECTION *****
        parent2 = select parent   ***** HERE IS WHERE YOU DO TOURNAMENT SELECTION *****
        child1, child2 = crossover(parent1, parent2)
        mutate child1, child2
        evaluate child1, child2 for fitness
        insert child1, child2 into C
    end while
    P = combine P and C somehow to get N new individuals
end while
		*/
		tournament: function(individuals) {
			var newGeneration = [];
			var mutateRate = 0.35;
			//potential bug: remember to check if the population count decrease or increase

			for(var i = 0; i < individuals.length; i++) {
				var par1 = tools.selection.tournamentSelect(individuals),
					par2 = tools.selection.tournamentSelect(individuals);

				var child = new Individual();

				child.genome = tools.crossover.twoPointCrossver(par1, par2, mutateRate);
				child.fitnessScore = tools.fitnessTest(child);

				newGeneration.push(child);
			}

			return newGeneration;
		},

		tournamentSelect: function(individuals) {
			var selectedIndivs = [];
			var genePoolPopulation = 6;

			//how many selected individuals we want
			for(var i = 0; i < genePoolPopulation; i++) {
				selectedIndivs.push(individuals[Math.floor(Math.random()*(individuals.length))]);
			}

			//find the fittest individual from the selected indivs
			var fittest = selectedIndivs[0];
			for(var i = 1; i < selectedIndivs.length; i++) {
				if(selectedIndivs[i].fitnessScore > fittest.fitnessScore) {
					fittest = selectedIndivs[i];
				}
			}

			return fittest;

		},

		roulette: function(individuals, genePoolPopulation) {
			if(!individuals)
				throw Error("Parameters have an invalid input!");

			var sumOfFitnesses = 0;
			var pairOfParents = [],
				newGeneration = [];

			for(var i = 0; i < individuals.length; i++) {
				sumOfFitnesses += individuals[i].fitnessScore;
				if(!individuals[i].fitnessScore)
					throw Error("Fitness score of individual " + i + " is invalid or 0!");
			}

			for(var i = 0; i < individuals.length; i++) {
				individuals[i].probability = individuals[i].fitnessScore / sumOfFitnesses;
			}

			//loop enough times to create a new generation
			for(var i = 0; i < individuals.length; i++) {
				//used to crossover genomes into child
				var pairOfParents = [];

				//search for a pair of parents
				for(var j = 0; j < 2; j++) {
					var r = Math.random();
					console.log(r);
					var runningScore = 0;

					//search for the picked individual
					for(var k = 0 ; k < individuals.length; k++) {
						if(r >= runningScore && r <= runningScore+individuals[k].probability) {
							pairOfParents.push(individuals[k]);
							break;
						}
						runningScore += individuals[k].probability;
					}
				}

				console.log(pairOfParents);

				newGeneration.push(new Individual());
				newGeneration[i].genome = tools.crossover.toggleBetweenParents(pairOfParents[0], pairOfParents[1], 1);
				newGeneration.fitnessScore = tools.fitnessTest();
			}

			return newGeneration;
		},

	},

	fitnessTest: function(indiv) {
		var totalDistance = 0;

		//calculate distance
		for(var i = 1; i < indiv.genome.length; i++) {
			//pythagorean theroem
			var deltaX = Math.pow(indiv.genome[i].x - indiv.genome[i - 1].x, 2);
			var deltaY = Math.pow(indiv.genome[i].y - indiv.genome[i - 1].y, 2);

			totalDistance += (Math.sqrt(deltaX + deltaY));
		}

		return 1 / totalDistance;
	}
};

//debug ~ makes life so much easier
function a(string) {
	console.log(string);
}