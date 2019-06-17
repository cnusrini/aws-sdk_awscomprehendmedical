//import ComprehendMedical from 'aws-sdk/clients/comprehendmedical';
var AWS = require('aws-sdk');
const config = require('./config');
//import ComprehendMedical from 'aws-sdk/clients/comprehendmedical
var awscm = require('aws-sdk/clients/ComprehendMedical')

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
console.log('uiinput',uiinput);
var params = {Text: uiinput };
comprehendmedical.detectEntities(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log('comprehendMedical: ' + JSON.stringify(data));           // successful response
});

}
