/*****************REFERENCES*******************************
https://www.geeksforgeeks.org/node-js-yargs-module/
https://github.com/octipus/Current-Weather-Application/blob/master/weather.json
Weather Info as JSON obj.
To run : node app.js --city=location
https://www.tutorialspoint.com/node-js-chalk-module
// https://stackoverflow.com/questions/70309135/chalk-error-err-require-esm-require-of-es-module
***********************************************************/

//module for building command line apps
const yargs = require('yargs/yargs');
// used for safely extracting the command line arguments
const { hideBin } = require('yargs/helpers');

const chalk = require('chalk');


// Dummy hard-coded weather information for displaying in the console.
let weather_info =
{
	"weather": [
		{
			"cityId": 1,
			"cityName": "London",
			"currentConditions": "Cloud",
			"temperature": 25,
			"windSpeed": 27,
			"windDirection": "Easterly",
			"windChillFactor": 11
		},

		{
			"cityId": 2,
			"cityName": "Newcastle",
			"currentConditions": "Sun",
			"temperature": 9,
			"windSpeed": 17,
			"windDirection": "South easterly",
			"windChillFactor": 7
		},

		{
			"cityId": 3,
			"cityName": "Edinburgh",
			"currentConditions": "Heavy Cloud",
			"temperature":13,
			"windSpeed": 19,
			"windDirection": "South westerly",
			"windChillFactor": 14

		},

		{
			"cityId": 4,
			"cityName": "Manchester",
			"currentConditions": "Cloud",
			"temperature": 18,
			"windSpeed": 9,
			"windDirection": "Westerly",
			"windChillFactor": 23
		},

		{
			"cityId": 5,
			"cityName": "Glasgow",
			"currentConditions": "Rain",
			"temperature": 14,
			"windSpeed": 12,
			"windDirection": "North westerly",
			"windChillFactor": 9
		},

		{
			"cityId": 6,
			"cityName": "Bristol",
			"currentConditions": "Sun",
			"temperature": 12,
			"windSpeed": 8,
			"windDirection": "Easterly",
			"windChillFactor": 11
		},

		{
			"cityId": 7,
			"cityName": "Liverpool",
			"currentConditions": "Cloud",
			"temperature": 19,
			"windSpeed": 13,
			"windDirection": "Southerly",
			"windChillFactor": 16
		},

		{
			"cityId": 8,
			"cityName": "Sheffield",
			"currentConditions": "Sun and Clouds",
			"temperature": 14,
			"windSpeed": 12,
			"windDirection": "Westerly",
			"windChillFactor": 15
		}

	]
}

// Checks if the city user input is available in the weather_info object.
// If yes, then returns the corresponding city weather info. Else, returns City info unavailable.
function fetchWeatherDetails(city)
{
	
    let all_weather = weather_info.weather;
    
    for (each_city of all_weather)
        {
            if(each_city['cityName'].toLowerCase() == city){
               // return `Current Weather Info:\n--------------------\ncityName: ${each_city['cityName']}\ncurrentConditions: ${each_city['currentConditions']}\ntemperature:  ${each_city['temperature']}\nwindSpeed:  ${each_city['windSpeed']}\nwindDirection:  ${each_city['windDirection']}\nwindChillFactor: ${each_city['windChillFactor']}`;
			   return each_city;
            }
            
            
        }
        return 'City Info unavailable!';
       
}

// With the parameter cityInfo, this function prints the city weather in color code using the chalk module.
function printWeather(cityInfo)
{
	console.log(chalk.green(("Weather Condition")));
	console.log('-'.repeat(20));
	for ( key in cityInfo)
		{
			console.log(`${chalk.redBright(key)}: ${chalk.yellow(cityInfo[key])}`);
		}
}
/* Runs the command WeatherInfo city to fetch and display the weather information of the particular city.
yargs(hideBin(process.argv))
                .command('WeatherInfo [city]', 'Show weather info',() => {},(argv)=>{
                console.log(fetchWeatherDetails(`${argv.city}`));   
                }).argv;

//console.log(argv['_'][0]);

*/
// Uses yargs to give user input as CLI option like --city=cityname
const argv = yargs(hideBin(process.argv))
.option('city',{type:'string',demandOption:true}).argv;

let result = fetchWeatherDetails(argv.city);

printWeather(result);


/*A short written response commented within the code, addressing:
○ The purpose of package.json in managing dependencies.
	The package.json file acts as the central place where developers can place the external or internal package
	dependencies to successfully run the project. This helps in collaboration when multiple developers work in project 
	development and managing package dependencies will be hard if we do not maintain a single file to track.

○ Why node_modules should not be included in version control.
	https://www.quora.com/Should-node_modules-be-gitignored
	The node_modules folder is relatively large folder with all the needed dependency packages, it becomes tedious if we are
	to commit this folder to version control.Different operating systems will have different dependencies so it may create problem when 
	different developers are working on the same project.


○ How npm install reinstalls dependencies and its importance in
collaborative projects.
	Even if we delete the node_modules folder that contains all the installed packages, as we run the application, 
	node looks for the package.json first and then re-installs all the needed packages before proceeding run the program source code.
	This helps collaboration easier as its not necessary to package the dependencies along with the application source code.

*/



