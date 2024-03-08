var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var activeStatusVal = '';
var userRole = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "admin" || userRole === "HR" || userRole === "DH") {
		$("#addVendorBtnId").show();
	} else {
		$("#addVendorBtnId").hide();
	}
	window.scrollTo(0, 0);
	$('#vendorListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');
	fetchAllVendorList();
	document.addEventListener('click', printMousePos, true);
});

/**
 * Fetch All VendorList data
 * @returns
 */
function fetchAllVendorList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/vendorMaster/getAllVendorList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#vendorListSearchTable').show();
				drawTableVendorList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#vendorListSearchTable').show();
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
 * Display the VendorList data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableVendorList(dataArray){
	var pageLengthVal = showEntriesPageLength("vendorListSearchTable");
	$('#vendorListSearchTable').html("");
	var resourceSearchTable = $('#vendorListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allVendorDetails.length; i++) {
		var vendorId = dataArray.allVendorDetails[i].vendorId;
		var vendorName = dataArray.allVendorDetails[i].vendorName;
		var vendorCode = dataArray.allVendorDetails[i].vendorCode;
		var vendorContactPersonName = dataArray.allVendorDetails[i].vendorContactPersonName;
		var vendorContactPersonPhoneNo = dataArray.allVendorDetails[i].vendorContactPersonPhoneNo;
		var vendorContactPersonEmail = dataArray.allVendorDetails[i].vendorContactPersonEmail;
		var vendorStatus = dataArray.allVendorDetails[i].isActive == "1" ? "Active" : "Inactive";
		
		var fn = "fetchVendorData('"+vendorId+"')";
		var editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';	
		resourceSearchTable.row.add([vendorName, vendorCode, vendorContactPersonName, vendorContactPersonPhoneNo, vendorContactPersonEmail , vendorStatus, editImg]);		
	}
	resourceSearchTable.draw();
}

/**
 * Function call on Add Service button click
 * Open the Add Service modal
 * @returns
 */
$(document).ready(function(){
	$('#addVendorBtnId').click(function(){
  		$('#addVendorModal').modal({
    		backdrop: 'static',
    		keyboard: false
		});
  		$("#modelTitleVendor").text('Add Vendor');
  		$("#addVendorFormId")[0].reset();
  		$("#activeStatusIdDiv").hide();
  		
  		$("#updateVendorBtnDiv").hide();
  		$("#addVendorBtnDiv").show();
  		$("#addVendorErrorDiv").empty();

	});
});

function fetchVendorData(vendorId) {
	$.ajax({
		url: apiContxtPin+ "/resource/vendorMaster/getVendorDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"vendorId": vendorId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			drawFetchVendorData(data)
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});
}


function drawFetchVendorData(data) {
	$('#addVendorModal').modal({
		backdrop: 'static',
		keyboard: false
	});
	$("#modelTitleVendor").text('Edit Vendor');
	if(userRole === "admin" || userRole === "HR" || userRole === "DH") {
		$("#addVendorBtnDiv").hide();
		$("#updateVendorBtnDiv").show(); 
	} else {
		makeAllFieldDisabled();
	} 		
	$("#addVendorErrorDiv").empty();
	$("#activeStatusIdDiv").show();
	
	$("#vendorMasterId").val(data.vendorId);
	$("#vendorNameId").val(data.vendorName);
	$("#vendorCodeId").val(data.vendorCode);
	$("#contactPersonNameId").val(data.vendorContactPersonName);
	$("#contactPersonPhoneNoId").val(data.vendorContactPersonPhoneNo);
	$("#contactPersonEmailId").val(data.vendorContactPersonEmail);	
	
	activeStatusVal = data.isActive;
	if(data.isActive === "1") {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', true);
	} else {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', false);
	}
}

function makeAllFieldDisabled() {
	$("#addVendorFormId :input").attr("disabled", true);
	$("#addVendorBtnDiv").hide();
	$("#updateVendorBtnDiv").hide();
}

function validateVendorData() {
	
	var vendorName = $.trim($("#vendorNameId").val());
	var vendorCode = $.trim($("#vendorCodeId").val());
	var contactPersonName = $.trim($("#contactPersonNameId").val());
	var contactPersonPhoneNo = $("#contactPersonPhoneNoId").val();
	var contactPersonEmail = $("#contactPersonEmailId").val();

	var errorDiv = $("#addVendorErrorDiv");
	
	if (vendorName  === "") {     
		errorDiv.empty().append("Please enter Vendor Name");     
        return false;
    } else if (onlyAlphabetWithSpace(vendorName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Vendor Name");     
        return false;
    } else if (vendorCode  != "" && onlyAlphabetWithSpace(vendorCode) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Vendor Code");     
        return false;
    } else if (contactPersonName  != "" && onlyAlphabetWithSpace(contactPersonName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Contact Person Name");     
        return false;
    } else if (contactPersonPhoneNo != "" && phoneNumberValidation(contactPersonPhoneNo) == false) {
		errorDiv.empty().append("Please enter valid Contact Person Phone No");     
	    return false;		
	} else if (contactPersonEmail  != "" && validateEmail(contactPersonEmail) == false) {
		errorDiv.empty().append("Please enter valid Contact Person Email Id");     
        return false;
	}
    return true;
}

/**
 * Function call while saving new Vendor data
 */
function addNewVendor() {
	if(validateVendorData()) {
	    callAddNewVendor();
	}
}

function callAddNewVendor() {
	$("#loader").show();
	var json = {
			vendorName: $("#vendorNameId").val(),
			vendorCode: $("#vendorCodeId").val(),
			vendorContactPersonName: $("#contactPersonNameId").val(),
			vendorContactPersonPhoneNo: $("#contactPersonPhoneNoId").val(),
			vendorContactPersonEmail: $("#contactPersonEmailId").val(),
			isActive: "1",
			createdBy : $("#sessionUsername").val()
	};
	  
	$.ajax({
		url: apiContxtPin+"/resource/vendorMaster/createVendor",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addVendorModal').modal('hide');
				fetchAllVendorList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addVendorErrorDiv").empty();
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
 * Function call while saving new Vendor data
 */
function updateVendor() {
	if(validateVendorData()) {
	    callUpdateVendor();
	}
}

function callUpdateVendor() {
	$("#loader").show();
	var activeStatus = "1";
	if ($("input[type='checkbox'][name='activeStatus']:checked").length == 0) {
		activeStatus = "0";
	}
	var json = {
			vendorId: $("#vendorMasterId").val(),
			vendorName: $("#vendorNameId").val(),
			vendorCode: $("#vendorCodeId").val(),
			vendorContactPersonName: $("#contactPersonNameId").val(),
			vendorContactPersonPhoneNo: $("#contactPersonPhoneNoId").val(),
			vendorContactPersonEmail: $("#contactPersonEmailId").val(),
			isActive: activeStatus,
			modifiedBy : $("#sessionUsername").val()
	};
	  
	$.ajax({
		url: apiContxtPin+"/resource/vendorMaster/updateVendor",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addVendorModal').modal('hide');
				fetchAllVendorList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addVendorErrorDiv").empty();
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