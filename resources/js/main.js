/*
	Genetic Algorithms | Laying the foundations for SkyNet.
	Kevin's Science Fair ---
*/

// TSP.createGeneration();
//  TSP.createGeneration();
// // TSP.createGeneration();

// (function(TSP) {
// 	var ctx = document.getElementById("canvas").getContext('2d');
	
// 	ctx.fillStyle = "#000";
	
// 	for(var i = 0; i < TSP.plotMapArray.length; i++) {
		
// 		console.log("a");
// 		ctx.beginPath();
// 		ctx.arc(TSP.plotMapArray[i].x,TSP.plotMapArray[i].y,12,0,2*Math.PI);
// 		ctx.stroke();
// 	}


// 	for(var i = 1; i < TSP.plotMapArray.length; i++) {
// 		ctx.beginPath();
// 		ctx.moveTo(TSP.individuals[0].genome[i - 1].x, TSP.individuals[0].genome[i - 1].y);
// 		ctx.lineTo(TSP.individuals[0].genome[i].x, TSP.individuals[0].genome[i].y);
// 		ctx.stroke();
// 	}

// 	console.log(TSP.individuals[0]);

// })(TSP);

var par = {
	genome: ['A', 'B', 'C', 'D', 'E']
}
var par2 = {
	genome: ['E', 'A', 'C', 'D', 'B']
}

console.log("Parent 1 Genome: " + par.genome);
console.log("Parent 2 Genome: " + par2.genome);
console.log();
console.log(tools.crossover.twoPointCrossver(par, par2));