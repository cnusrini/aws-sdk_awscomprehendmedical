var express = require('express')
var app = express();

app.use(express.static('public'));
//app.use('/static', express.static(__dirname))

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      textinput:req.query.textinput
   };
   console.log(response);
   res.send(response);
})

app.get('/',function(req,res){
res.send('hello worldldldl')

})

var server = app.listen(8081, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('listening at 8081', host, port);
})
