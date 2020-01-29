/**********PROGRAM TO GET WEATHER FROM WEATHER API****************/
/**
 * Author: Priyanka Kapoor
 * Date: 29-January-2020
 ****************************************************************/


//Importing http module to make Get HTTP request to Weather API
const http = require('http');

//Getting City name from commandline argument. Default is set to Delhi.
let city= process.argv[2] ||"Delhi";

const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2b421cd305b88e39d4182ac89b85e186`;

/**Tweeked given URL to include query string parameter units=metric for Temperature in Celsius.
** Also made city as variable in URL **/
http.get(url, (response) => {
let data = '';

  // Appending parts of data received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // On getting whole response, printing the temperature of given City on Console.
  response.on('end', () => {
    let weather = JSON.parse(data);
    console.log(`It's ${weather.main.temp} degree in ${city} `);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});