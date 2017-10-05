	
var tableify = require("tableify");
var restify = require('restify');
var builder = require('botbuilder');
var stringify = require('node-stringify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
     appId: 'YourAppId', appPassword: 'YourAppPassword'
     //appId: process.env.MICROSOFT_APP_ID,
     //appPassword: process.env.MICROSOFT_APP_PASSWORD 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {

// ServiceNow wrapper begins

var http = require("https");
var text = 'tickets_assigned_to_me';
 
//var url = "/api/now/table/incident";
 
var options = {
    host: "dev36598.service-now.com",
    port: 443,
    path : '/api/10133/chat_wrapper/'+text,
    method : 'GET',
    auth: 'admin:admin'
};
 
//var args = {short_description: "hello" };
 
invokeAPI (options)
 
function invokeAPI (options) {
   
    var req = http.get(options, function(res) {
    var result = "";
   
    res.on('data', function(data) {
     //  console.log('data..'+data);
        result += data;
    });
   
    //start
    res.on('end', function() {
        var responseObject = JSON.parse(result);
        var jsArray = [];
        var str = responseObject.result;
        var indices = [];
        for(var i=0; i<str.length;i++) {
            if (str[i] === "|")
                 indices.push(i);
        }
        for (var i = 0; i < indices.length; i++) {
               if (i+1 < indices.length)
               {   
                jsArray.push(str.substring(indices[i]+1,indices[i+1]-1));
                
            }
            else
                {
                jsArray.push(str.substr(indices[i]+1));
                }
            
       
            }
            var tableHtml = tableify(jsArray);   
            //down is the code to display table in the message   
           var htmlString = stringify(tableHtml) ;
         //  s = new HTMLString.String(tableHtml);
      //   var htmlString = stringify ('<html>' + tableHtml + '</html>');
      //   var tableH = '<table style="padding:10px;border:1px solid black;"><tr style="background-color:#c6c6c6"><th>Countries</th><th>Capitals</th><th>Population</th><th>Language</th></tr><tr><td>USA</td><td>Washington D.C.</td><td>309 million</td><td>English</td></tr><tr><td>Sweden</td><td>Stockholm</td><td>9 million</td><td>Swedish</td></tr></table>';
     //  console.log(tableHtml);
     //  console.log(htmlString);
      // var tableHTML = '<table style="padding:10px;border:1px solid black;"><tr style="background-color:#c6c6c6"><th>Countries</th><th>Capitals</th><th>Population</th><th>Language</th></tr><tr><td>USA</td><td>Washington D.C.</td><td>309 million</td><td>English</td></tr><tr><td>Sweden</td><td>Stockholm</td><td>9 million</td><td>Swedish</td></tr></table>';
       var message = {
       type: 'message',
       textFormat: 'xml',
       text: htmlstring

    // text:'<table><tbody><tr><td class="string"> INC0020002-Performance problems with </td></tr><tr><td class="string"> INC0020001-test</td></tr><tr><td class="string"> INC0020003-Performance problems with </td></tr><tr><td class="string"> INC0010001-Test</td></tr></tbody></table>'
//text: tableH 
};
   console.log(message);
   session.send(htmlString);
  // session.send(htmlString);
   session.send(message);
    });   
   // end      
});
}
});
   
                   
           
 

