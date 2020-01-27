const https = require('https'); 
const http=require('http');
const url=require('url');
const jsonUrl='https://raw.githubusercontent.com/priyankacool10/NodeJS/master/JSON/JsonHolidays.js';
var gitResponse;
// Create a server object 
http.createServer(function (request, response) { 
      
    // http responseheader 
    response.writeHead(200, {'Content-Type': 'application/json'});  
      
    var requestPath = request.url; 
    var queryData = url.parse(request.url, true).query;
    console.log("Query String: "+ queryData.month);
    response.write("Query String: "+ queryData.month);
        if(requestPath =='/public') { 
        response.write(`Public holidays of month ${queryData.month}`); 
        
        https.get(jsonUrl,(res)=>{
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
        
            res.on('end', function(){
                gitResponse = JSON.parse(body).publicHolidays;
                console.log("Got a response: ", gitResponse);
                gitResponse= JSON.stringify(body).publicHolidays;
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
          }); 
        response.write("List of all Public Holidays:" + gitResponse);
       // response.JSON(gitResponse);
        response.end();  
    } 
    else if(requestPath ==='/flexible/month') { 
        response.write('Flexible Holidays');  
        response.end();  
    } 
    else { 
        response.write('Holiday not found');  
        response.end();  
    } 
}).listen(3001,()=>{
 // The server object listens on port 3001
    console.log("server start at port 3001"); 

});
      
   
 