var apiKey = require('./../.env').apiKey;

export class DoctorSearch {

issuePromise(issue) {

let issuePromise = new Promise(function(resolve, reject) {
  let request = new XMLHttpRequest();

  let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=47.608013,-122.335167,50&limit=15&user_key=${apiKey}`
  request.onload = function() {
    if (this.status === 200) {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
};
  request.open("GET", url, true);
  request.send();
});

issuePromise.then(function(response) {
  let body = JSON.parse(response);
  console.log(body);

  if(body.data.length == 0){
      return $("#doclist").text("Sorry No Doctor Found");
    } else{
  body.data.forEach(function(item) {
      $('#doclist').append(`Doctor's Name - ${item.practices[0].name}`
      + "<br>" + `Address - ${item.practices[0].visit_address.city}, ${item.practices[0].visit_address.state}, ${item.practices[0].visit_address.street}, ${item.practices[0].visit_address.zip}`+ "<br>" + `Phone Number - ${item.practices[0].phones[0].number}` + "<br>" + `Website - ${item.practices[0].website}` + "<br>" + `Accepts New Patients - ${item.practices[0].accepts_new_patients}`+ "<br>" + "<hr>");
  });
  };

}, function(error) {
  $('.showErrors').text(`There was an error processing your request: ${error.message}`);
});
}

docnamePromise(name) {

let docnamePromise = new Promise(function(resolve, reject) {
  let request = new XMLHttpRequest();

  let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${name}&location=47.608013,-122.335167,50&limit=15&user_key=${apiKey}`
  request.onload = function() {
    if (this.status === 200) {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
};
  request.open("GET", url, true);
  request.send();
});

docnamePromise.then(function(response) {
    let body = JSON.parse(response);
    let found = false;
    body.data.forEach(function(item) {
        if(item.profile.first_name === name || item.profile.last_name === name ) {
            found = true;
            $('#docname').append(`Doctor's Name - ${item.profile.first_name} ${item.profile.last_name}`
            + "<br>" + `Address - ${item.practices[0].visit_address.city}, ${item.practices[0].visit_address.state}, ${item.practices[0].visit_address.street}, ${item.practices[0].visit_address.zip}`+ "<br>" + `Phone Number - ${item.practices[0].phones[0].number}` + "<br>" + `Website - ${item.practices[0].website}` + "<br>" + `Accepts New Patients - ${item.practices[0].accepts_new_patients}`+ "<br>" + "<hr>");
        }
    });

    if(!found){
        $("#docname").text("Sorry No Doctor Found for this Name");
    }

}, function(error) {
  $('.showErrors').text(`There was an error processing your request: ${error.message}`);
});
}
}
