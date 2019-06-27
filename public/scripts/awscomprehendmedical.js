function fetchFrmComprehend(){

var apiVersion = {apiVersion: '2018-10-30'}
var comprehendmedical = new AWS.ComprehendMedical({
  region: 'us-east-1',
  apiVersions: apiVersion,
  credentials: {
    accessKeyId: '',
    secretAccessKey: ''
  }
});
var uiinput = document.getElementById('inputtext').value
var params = {
  Text: uiinput
};
console.log('uiinput',uiinput);
comprehendmedical.detectEntities(params, function (failure,sucess) {
  if (failure){
    console.log('failure', failure.stack);
  }
  else{
    var entities = JSON.stringify(sucess);
    console.log('entities',entities);
    loadTable(entities, sucess);

   }

});
return false;

}

function loadTable(entities,sucess){
  console.log('in myfunction today');
  var texttofetch;

  var sucobj = sucess.Entities;
  var table = document.querySelector('#icdtable');
  var tbody = document.createElement('tbody');
  table.appendChild(tbody);

  sucobj.forEach((entity) => {
    console.log('in foreach entities',entities);
    if(entity.Category == "MEDICAL_CONDITION"){
       var tr = tbody.insertRow()
       var category = tr.insertCell();
       var text = tr.insertCell();
       var score = tr.insertCell();
       var code = tr.insertCell();


       var ecat = document.createTextNode(entity.Category);
       category.appendChild(ecat);
        var escore = document.createTextNode(entity.Score);
        score.appendChild(escore);
        var etext = document.createTextNode(entity.Text);
        text.appendChild(etext);
        console.log('etext', etext);
        //let ecode = function(){fetchICD(etext)};
        let ecode = () => { return new Promise(function(resolve, reject) {
        var clinicalAPI = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms="
        var clinicalURL = clinicalAPI + etext.textContent
        console.log('clinicalURL aftrer',clinicalURL);
        const Http = new XMLHttpRequest();
        Http.open("GET", clinicalURL, true);
        //Http.send();
        console.log(Http.responseText)
        Http.onreadystatechange = (e) => {
          var jres = JSON.stringify(Http.responseText)
          console.log(jres);
          var abc = {"result":jres}
          console.log(abc);
          setTimeout(() => resolve(jres), 300);

        }
        Http.send();
        //return false;

      })};
        ecode().then(function(result) {

          console.log('promise returned: ' + result);
          code.appendChild(document.createTextNode(result))
        });
        //code.appendChild(ecode);
}
});
}

function fetchICD(etext){

  console.log('textContent',etext.textContent);
  return new Promise(function(resolve, reject) {
  var clinicalAPI = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms="
  var clinicalURL = clinicalAPI + etext.textContent
  console.log('clinicalURL aftrer',clinicalURL);
  const Http = new XMLHttpRequest();
  Http.open("GET", clinicalURL, true);
  //Http.send();
  console.log(Http.responseText)
  Http.onreadystatechange = (e) => {
    var jres = JSON.stringify(Http.responseText)
    console.log(jres);
    var abc = {"result":jres}
    console.log(abc);
    setTimeout(() => resolve(jres), 300);

  }
  Http.send();
  //return false;
  });

}
