
import {DoctorSearch} from './../js/better-doctor.js';


$( document ).ready(function() {
    let doctorSearch = new DoctorSearch();

  $('#doctorlist').click(function(e) {
      e.preventDefault();
      let issue = $('#issue').val();
      $('#issue').val("");

      doctorSearch.issuePromise(issue);

    //   $('#doclist').show();

  });

  $('#doctorname').click(function(e) {
      e.preventDefault();
      let name = $('#name').val();
      $('#name').val("");

      doctorSearch.docnamePromise(name);

      $('#docname').show();

  });

  });
