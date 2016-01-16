
var tools = {

	crossover: {

		twoPointCrossver: function(par1, par2, mutateRate, crossoverRate) {
			var genomeLength = par1.genome.length;

			var newChildGenome = [];

			var crossoverProbability = Math.random();
			if(crossoverProbability < crossoverRate) {
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

			} else {
				newChildGenome = par1.fitnessScore > par2.fitnessScore ? par1.genome : par2.genome;
			}
		
			/*
				2optSwap(route, i, k) {
			       1. take route[1] to route[i-1] and add them in order to new_route
			       2. take route[i] to route[k] and add them in reverse order to new_route
			       3. take route[k+1] to end and add them in order to new_route
			       return new_route;
			   	}
			*/

			// if(twoOptSwap) {
			// 	var r = Math.floor(Math.random() * (newChildGenome.length)),
			// 		r2 = Math.floor(Math.random() * (newChildGenome.length));

			// 	newChildGenome = tools.crossover.twoOptSwap(newChildGenome, r, r2);
			// }

			var random = Math.random();
			if(random < mutateRate) {
				var p1 = Math.floor(Math.random() * ((genomeLength - 1) - 1 ) + 1),
					p2 = Math.floor(Math.random() * ((genomeLength - 1) - 1) + 1);

				//swap
				var a = newChildGenome[p1];
				newChildGenome[p1] = newChildGenome[p2];
				newChildGenome[p2] = a;
			}


			return newChildGenome;
		},

		/*
		   2optSwap(route, i, k) {
		       1. take route[1] to route[i-1] and add them in order to new_route
		       2. take route[i] to route[k] and add them in reverse order to new_route
		       3. take route[k+1] to end and add them in order to new_route
		       return new_route;
		   }

		   i and k are arbitary
		*/
		twoOptSwap: function(genome, randomPoint, randomPoint2) {
			var new_route = [];

			// var lowestRandomPoint = randomPoint2 < randomPoint ? randomPoint2 : randomPoint,
			// 	highestRandomPoint = lowestRandomPoint == randomPoint2 ? randomPoint : randomPoint2;
			
			for(var i = 1; i <= randomPoint - 1; i ++) {
				new_route.push(genome[i]);
			}

			//reverse order
			for(var i = randomPoint2; i >= randomPoint; i--) {
				new_route.push(genome[i]);
			}
			
			var _t = [];
			for(var i = randomPoint; i <= randomPoint2; i++) {
				_t.push(genome[i]);
			}

			_t.reverse();

			new_route.concat(_t);

			for(var i = randomPoint2 + 1; i < genome.length; i++) {
				new_route.push(genome[i]);
			}
			
			return new_route;
		}
	},

	selection: {

		tournament: function(individuals, mutateRate, twoOptMutation) {
			var newGeneration = [];

			for(var i = 0; i < individuals.length; i++) {
				//get two random parents using tournament selection
				var par1 = tools.selection.tournamentSelect(individuals),
					par2 = tools.selection.tournamentSelect(individuals);

				//so we don't get the same exact parent
				while(par2 == par1) {
				 	par2 = tools.selection.tournamentSelect(individuals);
				}

				var child = new Individual();

				child.genome = tools.crossover.twoPointCrossver(par1, par2, mutateRate, twoOptMutation);
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
			//distance formula
			var deltaX = Math.pow(indiv.genome[i].x - indiv.genome[i - 1].x, 2);
			var deltaY = Math.pow(indiv.genome[i].y - indiv.genome[i - 1].y, 2);

			totalDistance += (Math.sqrt(deltaX + deltaY));
		}

		return 1 / totalDistance;
	}
};