const config = require('./config');

function putResource(){

var apiVersion = {apiVersion: '2018-10-30'}
var comprehendmedical = new AWS.ComprehendMedical({
  region: config.REGION,
  apiVersions: config.APIVERSION,
  credentials: {
    accessKeyId: config.ACCESSKEYID,
    secretAccessKey: config.SECRETACCESSKEY
  }
});
var uiinput = document.getElementById('inputtext').value
var params = {
  Text: uiinput
};
comprehendmedical.detectEntities(params, function (failure,sucess) {
  if (failure){
    console.log('failure', failure.stack);
  }
  else{
     console.log('sucess',JSON.stringify(sucess));
   }

});
return false;

}
