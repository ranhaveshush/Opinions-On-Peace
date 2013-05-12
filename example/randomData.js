function randomDataset() {
	var initYear = 2004;
	var dataset = [];

	for (var i=0; i<10; ++i) {
		for (var j=0; j<12; ++j) {
			var datum = {};
			// Adds the date year and month data
			datum.year = initYear + i;
			datum.month = j;
			// Adds the nationalities data
			datum.nationalities = [];
			for (var k=0; k<3; ++k) {
				datum.nationalities[k] = {};
				// Adds the nationality name index
				datum.nationalities[k].nationalityIndex = k;
				// Gets the nationality opinionIndexs data
				datum.nationalities[k].opinions = [];

				datum.nationalities[k].opinions[0] = {};
				datum.nationalities[k].opinions[0].opinionIndex = 0;
				datum.nationalities[k].opinions[0].opinionValue = 10 * Math.random();

				datum.nationalities[k].opinions[1] = {};
				datum.nationalities[k].opinions[1].opinionIndex = 1;
				datum.nationalities[k].opinions[1].opinionValue = 20 * Math.random();

				datum.nationalities[k].opinions[2] = {};
				datum.nationalities[k].opinions[2].opinionIndex = 2;
				datum.nationalities[k].opinions[2].opinionValue = 30 * Math.random();

				datum.nationalities[k].opinions[3] = {};
				datum.nationalities[k].opinions[3].opinionIndex = 3;
				datum.nationalities[k].opinions[3].opinionValue = 30 * Math.random();

				datum.nationalities[k].opinions[4] = {};
				datum.nationalities[k].opinions[4].opinionIndex = 4;
				datum.nationalities[k].opinions[4].opinionValue = 100
					- datum.nationalities[k].opinions[0].opinionIndex
					- datum.nationalities[k].opinions[1].opinionIndex
					- datum.nationalities[k].opinions[2].opinionIndex
					- datum.nationalities[k].opinions[3].opinionIndex;
			}
			dataset.push(datum);
		}
	}
	return dataset;
}
