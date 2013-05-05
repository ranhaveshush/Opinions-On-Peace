function randomDataset() {
	var initYear = 2004;
	var dataset = {};
	dataset.name = 0;
	dataset.children = [];

	for (var i=0; i<10; ++i) {
		for (var j=0; j<12; ++j) {
			var datum = {};
			// Adds the date year and month data
			datum.year = initYear + i;
			datum.month = j;
			// Adds the nationalities data
			datum.children = [];
			for (var k=0; k<3; ++k) {
				datum.children[k] = {};
				// Adds the nationality name index
				datum.children[k].nameIndex = k;
				// Gets the nationality opinionIndexs data
				datum.children[k].children = [];

				datum.children[k].children[0] = {};
				datum.children[k].children[0].opinionIndex = 0;
				datum.children[k].children[0].opinion = 10 * Math.random();

				datum.children[k].children[1] = {};
				datum.children[k].children[1].opinionIndex = 1;
				datum.children[k].children[1].opinion = 20 * Math.random();

				datum.children[k].children[2] = {};
				datum.children[k].children[2].opinionIndex = 2;
				datum.children[k].children[2].opinion = 30 * Math.random();

				datum.children[k].children[3] = {};
				datum.children[k].children[3].opinionIndex = 3;
				datum.children[k].children[3].opinion = 30 * Math.random();

				datum.children[k].children[4] = {};
				datum.children[k].children[4].opinionIndex = 4;
				datum.children[k].children[4].opinion = 100
					- datum.children[k].children[0].opinionIndex
					- datum.children[k].children[1].opinionIndex
					- datum.children[k].children[2].opinionIndex
					- datum.children[k].children[3].opinionIndex;
			}
			dataset.children.push(datum);
		}
	}
	return dataset;
}
