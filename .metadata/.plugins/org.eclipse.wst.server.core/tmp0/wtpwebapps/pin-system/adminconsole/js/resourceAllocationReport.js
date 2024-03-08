var apiContxtPin = "/pin-webservice";

var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var FAILURE_STRUCTURE = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>";


var refrName = "";
var monthSelected = "";
var roleSelected= "";

$(document).ready(function () {
	fetchResourceList();
});

function fetchResourceList() {	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getActiveInactiveResourceList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#resourceId').empty();
				$('#resourceId').append('<option value="">Select</option>');
				$('#resourceId').append('<option value="ALL">ALL</option>');										
				$.each(data.allResourceDetails, function (index, value) {
					var empId = value.resourseEmpID == undefined ? "NA" : value.resourseEmpID;
                    $('#resourceId').append('<option value="' + value.resourseId + '">' + value.resourseName +' ('+empId+')</option>');
                });
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}


function populateAllocationReport() {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/common/getResourceAllocationList",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"resourseId": $("#resourceId").val(),
			"isActive": $("#statusId").val()
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
				drawAllocationReportTable(data);				
			}								
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});	
}


function drawAllocationReportTable(dataArray) {
	if(validateSearchCriteria()) {
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
	     			title: 'Resource Allocation Report',
				    autoFilter: true,
					sheetName: "ResourceAllocationReport",
	                //messageTop: 'Pending Account Information Report'
	                //messageBottom: 'Total Amount:     ' + total_amount 
	            }
	          ]		
		}).clear();
		
		if(!dataArray.error) {
			for (var i = 0; i < dataArray.allPinNoDetails.length; i++) {
				var resourseName = dataArray.allPinNoDetails[i].resourseName;
				var resourseEmpId = dataArray.allPinNoDetails[i].resourseEmpID;
				var pinNo = dataArray.allPinNoDetails[i].pinNo;
				var crNo = dataArray.allPinNoDetails[i].changeRequestNo;
				var projectName = dataArray.allPinNoDetails[i].projectName;
				var projectSponsorName = dataArray.allPinNoDetails[i].projectSponsorName;
				var allocationStartDate = dataArray.allPinNoDetails[i].allocationStartDate;
				var allocationEndDate = dataArray.allPinNoDetails[i].allocationEndDate;
				var allocation = dataArray.allPinNoDetails[i].allocation;
				var isActive = dataArray.allPinNoDetails[i].isActive == "1" ? "Active" : "Inactive";
				var pinHoldStatus = dataArray.allPinNoDetails[i].pinHoldStatus;
				if(pinHoldStatus === "Y") {
					isActive = "Active (Halted)";
				}
				resourceReportTable.row.add([resourseName, resourseEmpId, pinNo, crNo, projectName, projectSponsorName, allocationStartDate, allocationEndDate, allocation, isActive]);		
			}
		}
		resourceReportTable.draw();
	}
}


function validateSearchCriteria() {
	var resource = $("#resourceId").val();
	var status = $("#statusId").val();
	var errorDiv = $("#reportErrorDiv");
	
	if (resource  === "") {     
		errorDiv.empty().append("Please select Resource");
	    return false;
	} else if (status  === "") {     
		errorDiv.empty().append("Please select Status");
	    return false;
	}
	return true;
}