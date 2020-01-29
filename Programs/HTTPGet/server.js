const https = require('https'); 
const http=require('http');
const url=require('url');
const jsonUrl='https://raw.githubusercontent.com/priyankacool10/NodeJS/master/JSON/JsonHolidays.js';
var gitResponse;
// Create a server object 
http.createServer(function (request, response) { 
      var dataR;
    // http responseheader 
    response.writeHead(200);//, {'Content-Type': 'application/json'});  
      
    var requestPath = url.parse(request.url).pathname; 
    var queryData = url.parse(request.url, true).query;
    console.log("Query String: "+ queryData.month);
    response.write("Query String: "+ queryData.month);
    response.write("URL Path Name: "+ requestPath);
    var body = '';
   
    switch(requestPath){
        case "/":
            response.write("Welcome To Home Page!");
            break;
        case "/public":
            
        //response.write(`Public holidays of month ${queryData.month}`); 
        
        https.get(jsonUrl,(res)=>{
            

            res.on('data', function(chunk){
                body += chunk;
                gitResponse = JSON.parse(body).publicHolidays;
                response.write('JSON Data'+JSON.stringify(gitResponse));
                console.log("Got a response: ", gitResponse);
            });
        
            res.on('end', function()
            {
               // res.json(body);
                response.end();
               // res.pipe(response);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
          }); 
                break;
        case "/flexible":
            response.write(`Public holidays of month ${queryData.month}`); 
            break;
        default:
            response.write('Holiday not found');  
            response.end();      
            break;

    }
}).listen(3001,()=>{
 // The server object listens on port 3001
    console.log("server start at port 3001"); 

});

      
   
 