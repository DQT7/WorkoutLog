$(function(){

  var WorkoutLog = (function($, undefined) {
    var API_BASE =  "http://localhost:3000/api/";
    var userDefinitions = [];

    var setAuthHeader = function(sessionToken) {
      window.localStorage.setItem("sessionToken", sessionToken);
      // Set the authorization header
      // This can be done on individual calls
      // here we showcase ajaxSetup as a global tool
      $.ajaxSetup({
        // contentType: 'application/x-www-form-urlencoded',
        headers: {
          "Authorization": sessionToken,
          Accept: 'application/json'
        }
      });
    };

    // public
    return {
      API_BASE: API_BASE,
      setAuthHeader: setAuthHeader
    };
  })(jQuery);

  // Ensure .disabled aren't clickable
  $(".nav-tabs a[data-toggle=tab]").on("click", function(evt) {
    var token = window.localStorage.getItem("sessionToken");
    if ($(this).hasClass("disabled") && !token) {
      evt.preventDefault();
      return false;
    }
  });

  // bind tab change events
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (evt) {
    var target = $(evt.target).attr("href"); // activated tab
    if (target === "#log") {
      WorkoutLog.log.setDefinitions();
    }

    if (target === "#history") {
      WorkoutLog.log.setHistory();
    }
  });

  // bind enter key
  $(document).on("keypress", function(evt) {
    if (evt.which === 13) { // enter key
      if ($("#signup-modal").is(":visible")) {
        $("#signup").trigger("click");
      }
      if ($("#login-modal").is(":visible")) {
        $("#login").trigger("click");
      }
    }
  });

  // click button to close modal
  $('#login').on("click", function(evt) {
    if ($("#signup-modal").is(":visible")) {
      $("#signup").trigger("click");
    }
    if ($("#login-modal").is(":visible")) {
      $("#login").trigger("click");
    }
  });

  // setHeader if we
  var token = window.localStorage.getItem("sessionToken");
  if (token) {
    WorkoutLog.setAuthHeader(token);
  }

  // expose this to the other workoutlog modules
  window.WorkoutLog = WorkoutLog;
  console.log('setting window object: %o', window.WorkoutLog);
});
