const https = require('https'); 
const http=require('http');
const url=require('url');
const jsonUrl='https://raw.githubusercontent.com/priyankacool10/NodeJS/master/JSON/JsonHolidays.js';
var gitResponse;
// Create a server object 
http.createServer(function (request, response) { 
      
    const requestPath = url.parse(request.url).pathname; 
    const queryData = url.parse(request.url, true).query;
    
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
                gitResponse = JSON.parse(body).public;
                response.write('JSON Data'+JSON.stringify(gitResponse));
                console.log("Got a response: ", gitResponse);
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
                gitResponse = JSON.parse(body).flexible;
                response.write('JSON Data'+JSON.stringify(gitResponse));
                console.log("Got a response: ", gitResponse);
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

      
   
 