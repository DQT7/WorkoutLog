$(function() {
	$.extend(WorkoutLog, {
		log: {
			workouts: [],

			setdefinition: function() {
				var defs = WorkoutLog.definition.userDefinitions;
				var len = defs.length;
				var opts;
				for (var i = 0; i < len; i++) {
					opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
				}
				$("#log-definition").children().remove();
				$("#log-definition").append(opts);
			},

			setHistory: function() {
				var history = WorkoutLog.log.workouts;
				var len = history.length;
				var lis = "";
				for (var i = 0; i < len; i++) {
					lis += "<li class='list-group-item'>" + history[i].def + " - " + history[i].result + "</li>";
				}
				$("#history-list").children().remove();
				$("#history-list").append(lis);
			},
			create: function() {
				var log = { 
		        	desc: $("#log-description").val(),
		         	result: $("#log-result").val(),
		         	def: $("#log-definition option:selected").text()
		      	};
		      	var postData = { log: log };
		      	var logger = $.ajax({
		         	type: "POST",
		         	url: WorkoutLog.API_BASE + "log",
		         	data: JSON.stringify(postData),
		         	contentType: "application/json"
		      	});

		      	logger.done(function(data) {
                      WorkoutLog.log.workouts.push(data);
                      $("#log-description").val("");			
                      $("#log-result").val("");
                      $('a[href="#history"]').tab("show");
		      	});
			},
			// history
			fetchAll: function() {
				var fetchDefs = $.ajax({
			         type: "GET",
			         url: WorkoutLog.API_BASE + "log",
			         headers: {
			         	"authorization": window.localStorage.getItem("sessionToken")
			         }
			      })
			      .done(function(data) {
			         WorkoutLog.log.workouts = data;
			      })
			      .fail(function(err) {
			         console.log(err);
			      });
			}
		}
	});

	$("#log-save").on("click", WorkoutLog.log.create);

	   // fetch history if we already are authenticated and refreshed
   if (window.localStorage.getItem("sessionToken")) {
      WorkoutLog.log.fetchAll();
   }
});