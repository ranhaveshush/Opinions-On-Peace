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
