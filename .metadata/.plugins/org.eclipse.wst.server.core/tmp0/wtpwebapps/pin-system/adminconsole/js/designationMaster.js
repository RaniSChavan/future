var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var activeStatusVal = '';
var userRole = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "admin" || userRole === "HR" || userRole === "DH") {
		$("#addDesignationBtnId").show();
	} else {
		$("#addDesignationBtnId").hide();
	}
	window.scrollTo(0, 0);
	$('#designationListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');
	fetchAllDesignationList();
	document.addEventListener('click', printMousePos, true);
});

/**
 * Fetch All Designation data
 * @returns
 */
function fetchAllDesignationList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/designationMaster/getAllDesignationList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#designationListSearchTable').show();
				drawTableDesignationList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#designationListSearchTable').show();
			}
		});
}

var cursorX = "";
var cursorY = "";
function printMousePos(e){
      cursorX = e.pageX;
      cursorY= e.pageY;
}

/**
 * Display the Designation data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableDesignationList(dataArray){
	var pageLengthVal = showEntriesPageLength("designationListSearchTable");
	$('#designationListSearchTable').html("");
	var resourceSearchTable = $('#designationListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allDesignationDetails.length; i++) {
		var designationId = dataArray.allDesignationDetails[i].designationId;
		var designationName = dataArray.allDesignationDetails[i].designationName;
		var designationCode = dataArray.allDesignationDetails[i].designationCode;
		var designationStatus = dataArray.allDesignationDetails[i].isActive == "1" ? "Active" : "Inactive";
		
		var fn = "fetchDesignationData('"+designationId+"')";
		var editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';	
		resourceSearchTable.row.add([designationName, designationCode, designationStatus, editImg]);		
	}
	resourceSearchTable.draw();
}

/**
 * Function call on Add Designation button click
 * Open the Add Service modal
 * @returns
 */
$(document).ready(function(){
	$('#addDesignationBtnId').click(function(){
  		$('#addDesignationModal').modal({
    		backdrop: 'static',
    		keyboard: false
		});
  		$("#modelTitleDesignation").text('Add Designation');
  		$("#addDesignationFormId")[0].reset();
  		$("#activeStatusIdDiv").hide();
  		
  		$("#updateDesignationBtnDiv").hide();
  		$("#addDesignationBtnDiv").show();
  		$("#addDesignationErrorDiv").empty();

	});
});

function fetchDesignationData(designationId) {
	$.ajax({
		url: apiContxtPin+ "/resource/designationMaster/getDesignationDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"designationId": designationId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			drawFetchDesignationData(data)
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});
}


function drawFetchDesignationData(data) {
	$('#addDesignationModal').modal({
		backdrop: 'static',
		keyboard: false
	});
	$("#modelTitleDesignation").text('Edit Designation');
	if(userRole === "admin" || userRole === "HR" || userRole === "DH") {
		$("#addDesignationBtnDiv").hide();
		$("#updateDesignationBtnDiv").show(); 	
	} else {
		makeAllFieldDisabled();
	}	 		
	$("#addDesignationErrorDiv").empty();
	$("#activeStatusIdDiv").show();
	
	$("#designationMasterId").val(data.designationId);
	$("#designationNameId").val(data.designationName);
	$("#designationCodeId").val(data.designationCode);
	
	activeStatusVal = data.isActive;
	if(data.isActive === "1") {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', true);
	} else {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', false);
	}
}

function makeAllFieldDisabled() {
	$("#addDesignationFormId :input").attr("disabled", true);
	$("#addDesignationBtnDiv").hide();
	$("#updateDesignationBtnDiv").hide();
}

function validateDesignationData() {
	
	var designationName = $.trim($("#designationNameId").val());
	var designationCode = $.trim($("#designationCodeId").val());

	var errorDiv = $("#addDesignationErrorDiv");
	
	if (designationName  === "") {     
		errorDiv.empty().append("Please enter Designation Name");     
        return false;
    } /*else if (onlyAlphabetWithSpace(designationName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Designation Name");     
        return false;
    } else if (designationCode  === "") {     
		errorDiv.empty().append("Please enter Designation Code");     
        return false;
    } else if (onlyAlphabetWithSpace(designationCode) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Designation Code");     
        return false;
    } */
    return true;
}

/**
 * Function call while saving new Designation data
 */
function addNewDesignation() {
	if(validateDesignationData()) {
	    callAddNewDesignation();
	}
}

function callAddNewDesignation() {
	$("#loader").show();
	var json = {
			designationName: $("#designationNameId").val(),
			designationCode: $("#designationCodeId").val(),
			isActive: "1",
			createdBy : $("#sessionUsername").val()
	};
	  
	$.ajax({
		url: apiContxtPin+"/resource/designationMaster/createDesignation",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addDesignationModal').modal('hide');
				fetchAllDesignationList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addDesignationErrorDiv").empty();
				successMsg = data.error[0].errorMessages[0].errorMsg;
				if(successMsg != undefined) {
					alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");	
				} else {
					alertify.alert(FAILURE_MSG);
				}
			}		
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});
}


/**
 * Function call while saving new Designation data
 */
function updateDesignation() {
	if(validateDesignationData()) {
	    callUpdateDesignation();
	}
}

function callUpdateDesignation() {
	$("#loader").show();
	var activeStatus = "1";
	if ($("input[type='checkbox'][name='activeStatus']:checked").length == 0) {
		activeStatus = "0";
	}
	var json = {
			designationId: $("#designationMasterId").val(),
			designationName: $("#designationNameId").val(),
			designationCode: $("#designationCodeId").val(),
			isActive: activeStatus,
			modifiedBy : $("#sessionUsername").val()
	};
	  
	$.ajax({
		url: apiContxtPin+"/resource/designationMaster/updateDesignation",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addDesignationModal').modal('hide');
				fetchAllDesignationList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addDesignationErrorDiv").empty();
				successMsg = data.error[0].errorMessages[0].errorMsg;
				if(successMsg != undefined) {
					alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");	
				} else {
					alertify.alert(FAILURE_MSG);
				}
			}	
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});
}