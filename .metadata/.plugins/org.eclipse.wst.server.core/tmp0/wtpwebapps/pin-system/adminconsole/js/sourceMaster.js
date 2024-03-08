var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var activeStatusVal = '';
var userRole = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "admin" || userRole === "DH" || userRole === "HR") {
		$("#addSourceBtnId").show();
	} else {
		$("#addSourceBtnId").hide();
	}
	window.scrollTo(0, 0);
	$('#sourceListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');
	fetchAllSourceList();
	document.addEventListener('click', printMousePos, true);
});


/**
 * Function call on Add Service button click
 * Open the Add Service modal
 * @returns
 */
$(document).ready(function(){
	$('#addSourceBtnId').click(function(){
  		$('#addSourceModal').modal({
    		backdrop: 'static',
    		keyboard: false
		});
  		$("#modelTitleSource").text('Add Source');
  		$("#addSourceFormId")[0].reset();
  		$("#activeStatusIdDiv").hide();  		
  		$("#updateSourceBtnDiv").hide();
  		$("#addSourceBtnDiv").show();
  		$("#addSourceErrorDiv").empty();
  		$("#sourceCodeId").attr("disabled", false);
	});
});

/**
 * Fetch All Service data
 * @returns
 */
function fetchAllSourceList(){
	$.ajax({
		url: apiContxtPin+ "/resource/sourceMaster/getAllSourceList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#sourceListSearchTable').show();
				drawTableSourceList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#sourceListSearchTable').show();
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
 * Display the Service data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableSourceList(dataArray){
	var pageLengthVal = showEntriesPageLength("sourceListSearchTable");
	$('#sourceListSearchTable').html("");
	var sourceSearchTable = $('#sourceListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allSourceDetails.length; i++) {
		var sourceId = dataArray.allSourceDetails[i].sourceId;
		var sourceName = dataArray.allSourceDetails[i].sourceName;
		var sourceCode = dataArray.allSourceDetails[i].sourceCode;
		var sourseStatus = dataArray.allSourceDetails[i].isActive == "1" ? "Active" : "Inactive";
		
		var fn = "fetchSourceData('"+sourceId+"')";
		var editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';	
		sourceSearchTable.row.add([sourceName, sourceCode, sourseStatus, editImg]);		
	}
	sourceSearchTable.draw();
}

function fetchSourceData(sourceId) {
	$.ajax({
		url: apiContxtPin+ "/resource/sourceMaster/getSourceDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"sourceId": sourceId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {		
			drawFetchSourceData(data)
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});
}

function drawFetchSourceData(data) {
	$('#addSourceModal').modal({
		backdrop: 'static',
		keyboard: false
	});
	$("#modelTitleSource").text('Edit Source');
	$("#addSourceErrorDiv").empty();
	$("#activeStatusIdDiv").hide();
	if(userRole === "admin" || userRole === "DH" || userRole === "HR") {
		$("#addSourceBtnDiv").hide();
		$("#updateSourceBtnDiv").show();
	} else {
		makeAllFieldDisabled();
	}
	
	$("#sourceMasterId").val(data.sourceId);
	$("#sourceNameId").val(data.sourceName);
	$("#sourceCodeId").val(data.sourceCode).attr("disabled", true);
	activeStatusVal = data.isActive;
	if(data.isActive === "1") {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', true);
	} else {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', false);
	}
}


/**
 * Function call while saving new Contract data
 * @returns
 */
function addNewSource() {
	if(validateSouceData()) {
	    callAddNewSource();
	}
}

function updateSource() {
	if(validateSouceData()) {
		/*if($("input[type='checkbox'][name='activeStatus']:checked").length == 0 && activeStatusVal == "Y") {
	    	$("#addResourceErrorDiv").empty();
			alertify.set({ buttonReverse: true });
			alertify.confirm("Are you sure you want to proceed ?", function (e) {
				if (e) {
					callUpdateSource();
				} 
			});
	    } else {
	    	callUpdateSource();
	    }*/
		callUpdateSource();
	}
}

function validateSouceData() {
	var sourceName = $.trim($("#sourceNameId").val());
	var sourceCode = $.trim($("#sourceCodeId").val());
	var errorDiv = $("#addSourceErrorDiv");
	if (sourceName  === "") {     
		errorDiv.empty().append("Please enter Source Name");     
        return false;
    } else if (onlyAlphabetWithSpace(sourceName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Source Name");     
        return false;
    } else if (sourceCode  === "") {     
		errorDiv.empty().append("Please enter Source Code");     
        return false;
    } else if (onlyAlphabetWithSpace(sourceCode) == false) {
        errorDiv.empty().append("Please remove special characters and numbers from Source Code");     
        return false;
    } else if (sourceCode.length != 3) {
		errorDiv.empty().append("Please provide valid Source Code");     
		return false;
	} 
    return true;
}


function callAddNewSource() {
	$("#loader").show();
	
	var json = {
			sourceName: $("#sourceNameId").val(),
			sourceCode: $("#sourceCodeId").val(),
			isActive: "1",
			createdBy :$("#sessionUsername").val()
	};
	  
	$.ajax({
		url: apiContxtPin+"/resource/sourceMaster/createSource",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addSourceModal').modal('hide');
				fetchAllSourceList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addSourceErrorDiv").empty();
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

function callUpdateSource() {
	$("#loader").show();
	var activeStatus = "1";
	if ($("input[type='checkbox'][name='activeStatus']:checked").length == 0) {
		activeStatus = "0";
	}
	
	var json = {
			sourceId: $("#sourceMasterId").val(),
			sourceName: $("#sourceNameId").val(),
			sourceCode: $("#sourceCodeId").val(),
			isActive: "1",
			modifiedBy : $("#sessionUsername").val()
	};
	
	$.ajax({
		url: apiContxtPin+"/resource/sourceMaster/updateSource",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addSourceModal').modal('hide');
				fetchAllSourceList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addSourceErrorDiv").empty();
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

function makeAllFieldDisabled() {
	$("#addSourceFormId :input").attr("disabled", true);
	$("#addSourceBtnDiv").hide();
	$("#updateSourceBtnDiv").hide();
}