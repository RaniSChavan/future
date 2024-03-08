var apiContxtPin = "/pin-webservice";

var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var FAILURE_STRUCTURE = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>";


var refrName = "";
var monthSelected = "";
var roleSelected= "";

$(document).ready(function () {
	//fetchResourceList();
});




function populateResourceListReport() {
if(validateSearchCriteria()) {
	$("#reportErrorDiv").empty();
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/common/getResourceListForHR",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"resourseType": $("#resourceTypeId").val(),
			"activeInactivestatus": $("#statusId").val()
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {	
			if (data.message) {
				$("#loader").hide();
				alertify.alert(data.message)
			} else {
				$("#loader").hide();
				drawResourceListReportTable(data);				
			}								
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});	
	}
}


function drawResourceListReportTable(dataArray) {
	//if(validateSearchCriteria()) {
		$("#reportErrorDiv").empty();
		$('#allocationReportDiv').show();
		var resourceReportTable = $('#allocationReportSearchTable').DataTable({
			destroy: true,	
			responsive: true,
			pageLength : 10,
			"columnDefs": [{
				"className": 'hover',
				"defaultContent": "NA",
				"targets": "_all"
			}],	
			dom: 'Bfrtip',
			buttons: [
	           {
	                extend: 'excel',
	     			title: 'Resource List Report',
				    autoFilter: true,
					sheetName: "ResourceListReport"
					/*"exportOptions": {
				        "format": {
				          "header": function(content, index) {
				            // Here 2 is the index of the column whose header name we want to change(0 based)
				            return index === 2 ? "Gender" : content;
				          }
				        }
				      }*/
	                //messageTop: 'Pending Account Information Report'
	                //messageBottom: 'Total Amount:     ' + total_amount 
	            }
	          ]		
		}).clear();
		
		if(!dataArray.error) {
			for (var i = 0; i < dataArray.allResourceDetails.length; i++) {
				var resourseName = dataArray.allResourceDetails[i].resourseName;
				var resourseEmail = dataArray.allResourceDetails[i].resourseEmail;
				var resourseSourseCompName = dataArray.allResourceDetails[i].resourseSourseCompName;
				var resourseDesignationName = dataArray.allResourceDetails[i].resourseDesignationName;
				var resourseGradeName = dataArray.allResourceDetails[i].resourseGradeName;
				var resourseJoiningDate = dataArray.allResourceDetails[i].resourseJoiningDate;
				var resourseSparationDate = dataArray.allResourceDetails[i].resourseSparationDate;
				var resourseManagerName = dataArray.allResourceDetails[i].resourseManagerName;
				var resourseEmpID = dataArray.allResourceDetails[i].resourseEmpID;
				var resourseType = dataArray.allResourceDetails[i].resourseType;
				var subcontractor = dataArray.allResourceDetails[i].Subcontractor;
				//var isActive = dataArray.allResourceDetails[i].isActive == "1" ? "Active" : "Inactive";
				resourceReportTable.row.add([resourseName, resourseEmail, resourseSourseCompName, resourseDesignationName, resourseGradeName, 
										resourseJoiningDate, resourseSparationDate, resourseManagerName, resourseEmpID, resourseType, subcontractor]);		
			}
		}
		resourceReportTable.draw();
	//}
}


function validateSearchCriteria() {
	var resourceType = $("#resourceTypeId").val();
	var status = $("#statusId").val();
	var errorDiv = $("#reportErrorDiv");
	
	if (resourceType  === "") {     
		errorDiv.empty().append("Please select Resource Type");
	    return false;
	} else if (status  === "") {     
		errorDiv.empty().append("Please select Status");
	    return false;
	}
	return true;
}