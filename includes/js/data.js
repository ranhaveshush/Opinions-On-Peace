function rondomDataset() {
	var initYear = 2003;
	var dataset = [];

	for (var i=0; i <= 10; ++i) {
		var datum = {};
		// Gets the year
		datum.year = initYear + i;
		// Gets the nationality opinions
		datum.opinions = [];
		for (var j=0; j < 3; ++j) {
			var opinions = [];
			opinions[0] = 10 * Math.random();
			opinions[1] = 20 * Math.random();
			opinions[2] = 30 * Math.random();
			opinions[3] = 30 * Math.random();
			opinions[4] = 100 - opinions[0] - opinions[1] - opinions[2] - opinions[3];
			datum.opinions.push(opinions);
		}

		dataset.push(datum)
	}

	return dataset;
}

// Structure example don't use.
/*var dataset = [{
	year: 2013,
	opinions: [
		[3.0, 10.7, 14.5, 42.1, 29.8], 	// 0: Jews opinions
		[5.6, 0.0, 21.1, 28.9, 44.4],	// 1: Arabs opinions	
		[2.6, 9.9, 15.5, 40.1, 32.0]	// 2: General population opinions
	]
}];*/