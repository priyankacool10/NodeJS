/**********PROGRAM TO CREATE API ENDPOINTS****************/
/**
 * Author: Priyanka Kapoor
 * Date: 29-January-2020
 *********************************************************/

const https = require('https'); 
const http=require('http');
const url=require('url');
const jsonUrl='https://raw.githubusercontent.com/priyankacool10/NodeJS/master/JSON/JsonHolidays.js';
var gitResponse;
// Create a server object 
http.createServer(function (request, response) { 
      
    const requestPath = url.parse(request.url).pathname; 
    const queryData = url.parse(request.url, true).query;
    var monthName=queryData.month;
    response.writeHead(200, {'Content-Type': 'application/json'});  
    var body = '';
   
    switch(requestPath){
        case "/":
            response.write("Welcome To Home Page!");
            break;
        case "/public":
            
        response.write(`Public holidays of month ${queryData.month}: \n`); 
        
        https.get(jsonUrl,(res)=>{
            

            res.on('data', function(chunk){
                body += chunk;
                gitResponse = JSON.parse(body).publicHolidays[monthName];
                console.log("Got a response: ", gitResponse);
                if(gitResponse === undefined){
                    response.write('Holiday not Found');
                    console.log('Holiday not Found');
                }
                else{
                    for (let i=0;i<gitResponse.length; i++){
                        response.write('\n Title :'+JSON.stringify(gitResponse[i].title));
                        response.write('\n Date :'+JSON.stringify(gitResponse[i].date));
                    }   
                }         
            });
        
            res.on('end', function()
            {
                response.end();
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
          }); 
                break;
        case "/flexible":
            response.write(`Flexible holidays of month ${queryData.month}: \n`); 
        
        https.get(jsonUrl,(res)=>{
            

            res.on('data', function(chunk){
                body += chunk;
                gitResponse = JSON.parse(body).flexibleHolidays[monthName];
                console.log("Got a response: ", gitResponse);
                if(gitResponse === undefined){
                    response.write('Holiday not Found');
                    console.log('Holiday not Found');
                }
                else{
                    for (let i=0;i<gitResponse.length; i++){
                        response.write('\n Title :'+JSON.stringify(gitResponse[i].title));
                        response.write('\n Date :'+JSON.stringify(gitResponse[i].date));
                    }                                 
                }
               
            });
        
            res.on('end', function()
            {
                response.end();
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
          }); 
                break;
        
        default:
            response.write('Holiday not found');  
            response.end();      
            break;

    }
}).listen(3001,()=>{

    console.log("server start at port 3001"); 

});

      
   
 