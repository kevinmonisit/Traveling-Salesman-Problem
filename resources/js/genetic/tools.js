
var tools = {

	crossover: {

		twoPointCrossver: function(par1, par2, mutateRate ) {
			var genomeLength = par1.genome.length;

			var newChildGenome = [];

			//get two random points in genome
			var r1 = Math.floor(Math.random() * (genomeLength)),
				r2 = Math.floor(Math.random() * (genomeLength));

			var lowestRandomPoint = r2 < r1 ? r2 : r1,
				highestRandomPoint = lowestRandomPoint == r2 ? r1 : r2,
				selectedGenesFromParent2 = [];

			//im sorry to whoever is reading this code
			//i was in a rush, don't judge me

			for(var i = lowestRandomPoint; i <= highestRandomPoint; i++) {
				selectedGenesFromParent2.push(par2.genome[i]);
			}

			for(var i = 0; i < lowestRandomPoint; i++) {
				if(selectedGenesFromParent2.indexOf(par1.genome[i]) == -1)
					newChildGenome.push(par1.genome[i]);
			}

			newChildGenome = newChildGenome.concat(selectedGenesFromParent2);

			for(var i = lowestRandomPoint; i < par1.genome.length; i++) {
				if(selectedGenesFromParent2.indexOf(par1.genome[i]) == -1)
					newChildGenome.push(par1.genome[i]);
			}

			var random = Math.random();
			if(random < mutateRate) {
				var p1 = Math.floor(Math.random() * (genomeLength)),
					p2 = Math.floor(Math.random() * (genomeLength));

				//swap
				var a = newChildGenome[p1];
				newChildGenome[p1] = newChildGenome[p2];
				newChildGenome[p2] = a;
			}

			return newChildGenome;
		}
	},

	selection: {

		tournament: function(individuals) {
			var newGeneration = [];
			var mutateRate = 0.35;
			//potential bug: remember to check if the population count decrease or increase

			for(var i = 0; i < individuals.length; i++) {
				var par1 = tools.selection.tournamentSelect(individuals),
					par2 = tools.selection.tournamentSelect(individuals);

				//so we don't get the same exact parent
				// while(par2 == par1) {
				// 	par2 = tools.selection.tournamentSelect(individuals);
				// }

				var child = new Individual();

				child.genome = tools.crossover.twoPointCrossver(par1, par2, mutateRate);
				child._par1 = par1;
				child._par2 = par2;
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