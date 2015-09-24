var ANN = {

	Neuron: synaptic.Neuron,
    Layer: synaptic.Layer,
    Network: synaptic.Network,
    Trainer: synaptic.Trainer,
    Architect: synaptic.Architect,

    _tempNetwork: null,

    init: function(inputLayers, hiddenLayers, outputLayers) {
    	if(!inputLayers || !hiddenLayers || !outputLayers)
    		return "null arguments for ANN.init()!"
    	
    	var inputLayer = new Layer(inputLayers);
    	var hiddenLayer = new Layer(hiddenLayers);
    	var outputLayer = new Layer(outputLayers);
    
    	ANN._tempNetwork = new Network({
    		input: inputLayers,
    		hidden: hiddenLayer,
    		output: outputLayer
    	});
    }
    
};
