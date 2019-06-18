const config = require('./config');

function putResource(){
console.log('putResource');

let comprehendmedical = new AWS.ComprehendMedical({
  region: config.REGION,
  apiVersions: config.APIVERSION,
  credentials: {
    accessKeyId: config.ACCESSKEYID,
    secretAccessKey: config.SECRETACCESSKEY
  }
});

//console.log('comprehendmedical',comprehendmedical);
var uiinput = document.getElementById('inputtext').value
var params = {Text: uiinput };
comprehendmedical.detectEntities(params, function (failure,sucess) {
  if (failure){
    console.log('failure', failure);
  } // an error occurred
  else{
    console.log('comprehendMedical: ' + JSON.stringify(sucess));
    document.getElementById('readvalue').value = sucess;
  }           // successful response
});


}
