// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:datePar?", function(req, res) {
  const dataParametre = req.params.datePar;
  let date = new Date();
  let unix, utc;
  if (!isNaN(Date.parse(dataParametre)) && dataParametre != null) {
    unix = Date.parse(dataParametre);
    utc = new Date(dataParametre).toUTCString();
  }else if(!isNaN(Number(dataParametre)) && Number(dataParametre) > 0)
  {
    unix = Number(dataParametre);
    utc = new Date(Number(dataParametre)).toUTCString();
  }
  else if (dataParametre == null){
      res.json({ unix: Date.parse(new Date()) , utc:new Date().toUTCString()});
      return;
    }
  else{
    res.json({ error : "Invalid Date" });
    return;
  }
  res.json({ unix: unix ,  utc: utc });
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
