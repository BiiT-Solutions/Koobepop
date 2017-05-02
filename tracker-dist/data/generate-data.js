if (process.argv.length < 4) {
    console.log('Usage: node generate-data.js <year> <weeknumber>');
    process.exit(1);
}

var moment = require('../../bower_components/moment/moment.js');
// Configure Moment.js to start the week on Monday.
moment.locale('en', {
     week: {
         dow: 1
     }
});

var assessments = [
    {
        name: 'body health',
	health: {
	    min: 8,
	    max: 10
	},
	sleep: {
	    min: 3,
	    max: 10
	}
    }, {
        name: 'mental health',
	memory: {
	     min: 7,
             max: 10
	},
	happiness: {
	     min: 3,
             max: 9	
	} 
    }, {
        name: 'food style',
	fruit: {
	    min: 1,
            max: 3
	},
	vegetables: {
	    min: 1,
            max: 3
	},
	water: {
	    min: 1,
            max: 4
	}
    }
];


function randomItem(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
}

function random(itemWithMinMax) {
    var result = Math.round(itemWithMinMax.max * Math.random());
    result = Math.max(itemWithMinMax.min, result);
    return result;
}

function randomMoment(monday) {
    return monday
        .clone()
        .add(Math.round(Math.random() * 7 * 24 * 60 * 60 * 1000), 'milliseconds');
}

function createWorkout(assessment, monday) {
    var result = {
        date: randomMoment(monday),
        assessment: assessment.name,
    };
    if(assessment.name == 'body health'){
	result.health = random(assessment.health);
	result.sleep = random(assessment.sleep);
	result.score = (result.health + result.sleep) / 2;
    }else if(assessment.name == 'mental health'){
	result.memory = random(assessment.memory);
	result.happiness = random(assessment.happiness);
	result.score = (result.memory + result.happiness) / 2;
    } else  if(assessment.name == 'food style'){
	result.fruit = random(assessment.fruit);
	result.vegetables = random(assessment.vegetables);
	result.water = random(assessment.water);
	result.score = (result.fruit + result.vegetables + result.water);
    }
    return result;
}

var pad = "00"

var result = {
    year: process.argv[2],
    weekNumber: pad.substring(process.argv[3].length) + process.argv[3],
    workouts: []
};

//Obtains the Monday of a week. Week is at Sundays, we add one day to get Monday.
var monday = moment(result.year + '-W' + result.weekNumber).add(1, 'days');;

// Add random workouts.
for(var a=0; a<assessments.length; a++){
	var numberOfWorkouts = Math.round(Math.random() * 3 + 5);
	for (var i = 0; i < numberOfWorkouts; i++) {
	    result.workouts.push(createWorkout(assessments[a], monday));
	}
}


console.log(JSON.stringify(result));
