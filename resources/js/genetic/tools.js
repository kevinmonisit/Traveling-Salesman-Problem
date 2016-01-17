
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

				for(var i = lowestRandomPoint; i < par1.genome.length ; i++) {
					if(selectedGenesFromParent2.indexOf(par1.genome[i]) == -1)
						newChildGenome.push(par1.genome[i]);
				}

			} else {
				newChildGenome = par1.fitnessScore > par2.fitnessScore ? par1.genome : par2.genome;
			}

			var random = Math.random();
			if(random < mutateRate) {
				// var p1 = Math.floor(Math.random() * ((genomeLength - 1) - 1 ) + 1),
				// 	p2 = Math.floor(Math.random() * ((genomeLength - 1) - 1) + 1);

				// //swap
				// var a = newChildGenome[p1];
				// newChildGenome[p1] = newChildGenome[p2];
				// newChildGenome[p2] = a;
			
				var k = Math.floor(Math.random() * (genomeLength - 1)),
				 	i = Math.floor(Math.random() * (genomeLength - 1));
				
				while(i == k) {
					i = Math.floor(Math.random() * (genomeLength - 1));
				}

				var lowestRandomPoint = k < i ? k : i,
					highestRandomPoint = lowestRandomPoint == k ? i : k,
				 
				newChildGenome = tools.crossover.twoOptSwapGenome(newChildGenome, lowestRandomPoint, highestRandomPoint);
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
		twoOptSwapGenome: function(genome, k, j) {
			var new_route = [];

			for(var i = 0; i <= k - 1; i ++) {
				new_route.push(genome[i]);			
			}

			//reverse order
			for(var i = j; i >= k; i--) {
				new_route.push(genome[i]);
			}
			
			for(var i = j + 1; i < genome.length; i++) {
				new_route.push(genome[i]);
			}
			
			return new_route;
		}
	},

	selection: {

		tournament: function(individuals, mutateRate, twoOptMutation) {
			var newGeneration = [];
<<<<<<< HEAD
			var mutateRate = 0.05;
			//potential bug: remember to check if the population count decrease or increase
=======
>>>>>>> Custom-Route-Feature

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
			var genePoolPopulation = Math.floor(TSP.populationCount * 0.2);

			//how many selected individuals we want
			for(var i = 0; i < genePoolPopulation; i++) {
				selectedIndivs.push(individuals[Math.floor(Math.random() * (individuals.length))]);
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

	/*
		Calculates distance travled and automatically adds the starting point
		in the calculation. (Starts and reconnects to this point)
	*/
	fitnessTest: function(indiv) {
		var totalDistance = 0;
		var genomeLength = indiv.genome.length - 1;

		totalDistance += tools.distanceToStartingPoint(indiv, 0);

		//calculate distance
		for(var i = 1; i < genomeLength; i++) {

			//distance formula
			var deltaX,
				deltaY;

		
			try{
				deltaX  = Math.pow(indiv.genome[i].x - indiv.genome[i - 1].x, 2);
				deltaY = Math.pow(indiv.genome[i].y - indiv.genome[i - 1].y, 2);
			} catch(e) {
				console.log(indiv);
			}

			totalDistance += (Math.sqrt(deltaX + deltaY));
		}

		totalDistance += tools.distanceToStartingPoint(indiv, genomeLength);
		//larger distance gives off a smaller number1
		return 1 / totalDistance;
	},

	//absolute value?
	distanceToStartingPoint: function(indiv, genomeIndex) {

		var deltaX = Math.abs(Math.pow(TSP.startingPoint.x - indiv.genome[genomeIndex].x, 2));
		var deltaY = Math.abs(Math.pow(TSP.startingPoint.y - indiv.genome[genomeIndex].y, 2));
		
		return (Math.sqrt(deltaX + deltaY));
	},
};