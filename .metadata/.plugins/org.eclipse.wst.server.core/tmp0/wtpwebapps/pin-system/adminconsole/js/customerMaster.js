var apiContxtPin = "/pin-webservice";

var selectedRow = "";
var primaryLoginExist = false;
var activeStatusVal = '';
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var userRole = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "admin" || userRole === "DH" || userRole === "HR") {
		$("#addCustomerBtnId").show();
		$("#addLocationBtnId").show();
	} else {
		$("#addCustomerBtnId").hide();
		$("#addLocationBtnId").hide();
	}
	window.scrollTo(0, 0);
	$('#customerListSearchTable').DataTable();
	$('#locationListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');
	fetchAllCustomerList();
	document.addEventListener('click', printMousePos, true);
});

/**
 * Function call on Add Customer button click
 * Open the Add Customer modal
 * @returns
 */
$(document).ready(function(){
	$('#addCustomerBtnId').click(function(){
  		$('#addCustomerModal').modal({
    		backdrop: 'static',
    		keyboard: false
		});
  		$("#modelTitleCustomer").text('Add Customer');
  		$("#onlyCustomerdetailDiv").show();		 		
  		$("#addLocationBtnDiv").hide();
  		$("#updateLocationBtnDiv").hide();
  		$("#addCustomerBtnDiv").show();  		
  		resetAddCustomerModal();
	});
	
	$('#addLocationBtnId').click(function(){
		if(selectedRow === "") {
			var addContactMsg = "Please add Customer first to add Customer Location.";
			alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+addContactMsg+"!</p>");		
		} else {
			$('#addCustomerModal').modal({
	    		backdrop: 'static',
	    		keyboard: false
			});  		
	  		$("#modelTitleCustomer").text('Add Customer Location');
	  		$("#onlyCustomerdetailDiv").hide();
	  		$("#addCustomerBtnDiv").hide();
	  		$("#updateLocationBtnDiv").hide();
	  		$("#addLocationBtnDiv").show();
	  		resetAddCustomerModal();
		}
	});	
});


function resetAddCustomerModal() {
	$("#addCustomerFormId")[0].reset();
	$("#locationCodeId").attr("disabled", false);
	$("#updateLocationBtnDiv").hide();
	$("#addCustomerErrorDiv").empty();
}

/**
 * Fetch All Customer data
 * @returns
 */
function fetchAllCustomerList(){	
	$.ajax({
			url: apiContxtPin+ "/resource/customerMaster/getAllCustomerList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#customerListSearchTableDiv').show();
				drawTableCustomer(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#customerListSearchTableDiv').show();
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
 * Display the Customer data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableCustomer(dataArray){
	var pageLengthVal = showEntriesPageLength("customerListSearchTable");
	$('#customerListSearchTable').html("");
	var customerSearchTable = $('#customerListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allCustomerDetails.length; i++) {
		var customerId = dataArray.allCustomerDetails[i].customerId;
		var customerName = dataArray.allCustomerDetails[i].customerName;
		var customerDescription = dataArray.allCustomerDetails[i].customerDescription;
		var isActive = dataArray.allCustomerDetails[i].isActive === 1 ? "Active" : "Inactive";	
		
		var checkCustomer = '<input type="radio" class="customerRadio" value="'+customerId+'" name="CustomerRadio"/>';		
		var fn = "fetchCustomerData('"+customerId+"')";
		var editImg='<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item org-edit-img" onclick="'+fn+'"/>';
		customerSearchTable.row.add([checkCustomer, customerName, customerDescription, isActive, editImg]);
	}
	customerSearchTable.draw();
	if( dataArray.allCustomerDetails.length > 0 ) {
		var selectedCustomerId = dataArray.allCustomerDetails[0].customerId;
		$("input[name=CustomerRadio][value=" + selectedCustomerId + "]").attr('checked', 'checked');
		fetchAllLocationList(selectedCustomerId);
	}
}

/**
 * Function call clicking on radio button 
 * Display the Contact data based on the row selected for Customer
 * @returns
 */
$(document).on('click','.customerRadio',function () {
    if ($(this).is(':checked')) {      
        var customerId = $(this).val();
        fetchAllLocationList(customerId);
    }
});

function isEmpty(value){
	  return value == null || value == "";
	}

/**
 * Fetch the Contact data based on the row selected for Customer
 * @param customerId
 * @returns
 */

function fetchAllLocationList(customerId) {	
	$.ajax({
			url: apiContxtPin+ "/resource/customerMaster/getCustomerDetails",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"customerId": customerId
			}),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				selectedRow = data;
				$('#locationListSearchTableDiv').show();
				drawTableLocationList(data);	
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#locationListSearchTableDiv').show();
			}
		});
}

/**
 * Display the Contact data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableLocationList(dataArray){
	var pageLengthValLoc = showEntriesPageLength("locationListSearchTable");
	$('#locationListSearchTable').html("");
	var locationSearchTable = $('#locationListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthValLoc,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.customerLocationDetails.length; i++) {
		var customerId = dataArray.customerLocationDetails[i].customerId;
		var customerLocationID = dataArray.customerLocationDetails[i].customerLocationID;
		var customerLocation = dataArray.customerLocationDetails[i].customerLocation;
		var customerLocationCode = dataArray.customerLocationDetails[i].customerLocationCode;
		var contactPersonName = dataArray.customerLocationDetails[i].customerLocationContPersionName;
		var contactPersonPhoneNo = dataArray.customerLocationDetails[i].customerContactPersonPhoneNo;
		var contactPersonEmailId = dataArray.customerLocationDetails[i].customerContactPersonEmailId;
		var isActive = dataArray.customerLocationDetails[i].isActive === 1 ? "Active" : "Inactive";
		
		var fn = "fetchLocationData('"+customerLocationID+"')";
		var editImg='<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item org-edit-img" onclick="'+fn+'"/>';
		locationSearchTable.row.add([customerLocation, customerLocationCode, contactPersonName, contactPersonPhoneNo, contactPersonEmailId, isActive, editImg]);
	}
	locationSearchTable.draw();
}


function fetchLocationData(locationId) {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/customerMaster/getLocationDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"customerLocationID": locationId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			populateCustomerLocation(data);	
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});
}

function populateCustomerLocation(dataArray) {
	$('#addCustomerModal').modal({
		backdrop: 'static',
		keyboard: false
	});  		
	$("#modelTitleCustomer").text('Edit Customer Location');
	$("#onlyCustomerdetailDiv").hide();
	if(userRole === "admin" || userRole === "DH" || userRole === "HR") {
		$("#addCustomerBtnDiv").hide();
		$("#addLocationBtnDiv").hide();
		$("#updateLocationBtnDiv").show();
		
	} else {
		makeAllFieldDisabled();
	}		
	$("#customerId").val(dataArray.customerId)
	$("#customerNameId").val(dataArray.customerName)
	$("#customerDescId").val(dataArray.customerDescription)
	for (var i = 0; i < dataArray.customerLocationDetails.length; i++) {
		$("#customerLocationId").val(dataArray.customerLocationDetails[i].customerLocationID);
		$("#locationNameId").val(dataArray.customerLocationDetails[i].customerLocation);
		$("#locationCodeId").val(dataArray.customerLocationDetails[i].customerLocationCode).attr("disabled", true);
		$("#contactPersonNameId").val(dataArray.customerLocationDetails[i].customerLocationContPersionName);
		$("#contactPersonPhoneNoId").val(dataArray.customerLocationDetails[i].customerContactPersonPhoneNo);
		$("#contactPersonEmailId").val(dataArray.customerLocationDetails[i].customerContactPersonEmailId);
	}
}

/**
 * Function call while saving new Customer data
 * @returns
 */
function addNewCustomer () {	
	if(validateCustomerMaster("Customer", "Add")) {
	    callAddNewCustomer();
	 }
}

/**
 * Function call while saving new Contact Person
 * @returns
 */
function addNewCustomerLocation () {
	if(validateCustomerMaster("Location", "Add")) {
		callAddNewLocation();	  
	 }
}

/**
 * Function call to validate Customer data while adding a new Customer
 * @returns
 */
function validateCustomerMaster(param, action) {	
	var customerName = $.trim($('#customerNameId').val());
	var customerDesc = $.trim($('#customerDescId').val());
	var locationName = $.trim($('#locationNameId').val());
	var locationCode = $.trim($('#locationCodeId').val());
	var contactPersonName = $.trim($('#contactPersonNameId').val());
	var contactPersonPhoneNo = $.trim($('#contactPersonPhoneNoId').val());	
	var contactPersonEmailId = $.trim($('#contactPersonEmailId').val());
	
	var errorDiv = $("#addCustomerErrorDiv");

	if (param === "Customer" && customerName  === "" && action != "Update") {     
		errorDiv.empty().append("Please enter Customer Name");     
        return false;
    } else if (param === "Customer" && (onlyAlphabetWithSpace(customerName) == false) && action != "Update") {
    	errorDiv.empty().append("Please remove special characters and numbers from Customer Name");     
        return false;
    }  else if (param === "Customer" && customerDesc  === "" && action != "Update") {     
		errorDiv.empty().append("Please enter Customer Description");     
        return false;
    } else if (locationName  === "") {     
		errorDiv.empty().append("Please enter Location Name");     
		return false;
	} else if (onlyAlphabetWithSpace(locationName) == false) {
		errorDiv.empty().append("Please remove special characters and numbers from Location Name");     
		return false;
	} else if (locationCode  === "") {     
		errorDiv.empty().append("Please enter Location Code");     
		return false;
	} else if (onlyAlphabetWithSpace(locationCode) == false) {
		errorDiv.empty().append("Please remove special characters and numbers from Location Code");     
		return false;
	} else if (locationCode.length != 3) {
		errorDiv.empty().append("Please provide valid Location Code");     
		return false;
	} else if (contactPersonName  === "") {     
		errorDiv.empty().append("Please enter Contact Person Name");     
		return false;
	} else if (onlyAlphabetWithSpace(contactPersonName) == false) {
		errorDiv.empty().append("Please remove special characters and numbers from Contact Person Name");     
		return false;
	}
	else if (contactPersonPhoneNo  === "") {       
	    errorDiv.empty().append("Please enter Contact Person Phone No.");     
	    return false;
	} else if (phoneNumberValidation(contactPersonPhoneNo) == false) {
		errorDiv.empty().append("Please enter valid Contact Person Phone No.");     
        return false;
	} else if (contactPersonEmailId  === "") {       
        errorDiv.empty().append("Please enter Contact Person Email Id");     
        return false;
	} else if (validateEmail(contactPersonEmailId) == false) {
		errorDiv.empty().append("Please enter valid Contact Person Email Id");     
        return false;
	}
	return true;
 }


function fetchCustomerData(customerId) {
	$.ajax({
		url: apiContxtPin+ "/resource/customerMaster/getCustomerDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"customerId": customerId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$('#updateCustomerModal').modal({
				backdrop: 'static',
				keyboard: false
			});	
			$("#updateCustomerErrorDiv").empty();
			if(userRole === "admin" || userRole === "DH" || userRole === "HR") {
				$("#updateCustomerBtn").show();
			} else {
				makeEditCustomerDisabled();
			}				
			$("#updateCustomerId").val(data.customerId);
			$("#editCustomerNameId").val(data.customerName);
			$("#editCustomerDescId").val(data.customerDescription);
			if(data.isActive === 1) {
				$("input[type='checkbox'][id='ediContractAcceptanceId']").prop('checked', true);
			} else {
				$("input[type='checkbox'][id='ediContractAcceptanceId']").prop('checked', false);
			}
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});
}


function callAddNewCustomer() {
	$("#loader").show();
	var json = {
			customerName: $('#customerNameId').val(),
		    customerDescription: $('#customerDescId').val(),
		    isActive: "1",
		    createdBy: $("#sessionUsername").val(),
		    customerLocationDetails: [
		        {
		            customerLocation: $('#locationNameId').val(),
		            customerLocationCode: $('#locationCodeId').val(),
		            customerLocationContPersionName: $('#contactPersonNameId').val(),
		            customerContactPersonPhoneNo: $('#contactPersonPhoneNoId').val(),
		            customerContactPersonEmailId: $('#contactPersonEmailId').val(),
		            isActive: "1"
		        }
		    ],
		    userType: "customer"
		};
	
	saveCreateCustomerLocation(json);
}

function callAddNewLocation() {
	$("#loader").show();
	var json = {
			customerId : selectedRow.customerId,
			customerName: selectedRow.customerName,
		    customerDescription: selectedRow.customerDescription,
		    isActive: selectedRow.isActive,
		    createdBy: $("#sessionUsername").val(),
		    customerLocationDetails: [
		        {
		            customerLocation: $('#locationNameId').val(),
		            customerLocationCode: $('#locationCodeId').val(),
		            customerLocationContPersionName: $('#contactPersonNameId').val(),
		            customerContactPersonPhoneNo: $('#contactPersonPhoneNoId').val(),
		            customerContactPersonEmailId: $('#contactPersonEmailId').val(),
		            isActive: "1"
		        }
		    ],
		    userType: "customerLocation"
		};
	
	saveCreateCustomerLocation(json);
}


function saveCreateCustomerLocation(json) {
	$.ajax({
		url: apiContxtPin+"/resource/customerMaster/createCustomer",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addCustomerModal').modal('hide');
				fetchAllCustomerList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addCustomerErrorDiv").empty();
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

function updateCustomerData() {
	var customerName = $.trim($('#editCustomerNameId').val());
	if ( customerName  === "") {     
		$("#updateCustomerErrorDiv").empty().append("Please enter Customer Name");     
        return false;
    } else if ((onlyAlphabetWithSpace(customerName) == false)) {
    	$("#updateCustomerErrorDiv").empty().append("Please remove special characters and numbers from Customer Name");     
        return false;
    } else {
    	$("#updateCustomerErrorDiv").empty();
    	var contractAcceptanceVal = "";
    	if ($("input[type='checkbox'][id='ediContractAcceptanceId']:checked").length == 0) {
    		contractAcceptanceVal = "N";
    	} else {
    		contractAcceptanceVal = "Y";
    	}
    	var json = {
    			  customerId: $("#updateCustomerId").val(),
    			  customerName: $("#editCustomerNameId").val(),
    			  customerDescription: $("#editCustomerDescId").val(),
    			  modifiedBy: $("#sessionUsername").val(),
    			  isActive: 1,
    			  userType: "customer"
    	};
    }
	callupdateCustomer(json, "customer");
}

function updateCustomerLocation() {
	if(validateCustomerMaster("Customer", "Update")) {
		$("#loader").show();
		var json = {
				customerId : $('#customerId').val(),
				customerName: $('#customerNameId').val(),
			    customerDescription: $('#customerDescId').val(),
			    isActive: "1",
			    modifiedBy: $("#sessionUsername").val(),
			    customerLocationDetails: [
			        {
			        	customerId : $('#customerId').val(),
			        	customerLocationID : $('#customerLocationId').val(),
			            customerLocation: $('#locationNameId').val(),
			            customerLocationCode: $('#locationCodeId').val(),
			            customerLocationContPersionName: $('#contactPersonNameId').val(),
			            customerContactPersonPhoneNo: $('#contactPersonPhoneNoId').val(),
			            customerContactPersonEmailId: $('#contactPersonEmailId').val(),
			            isActive: "1"
			        }
			    ],
			    userType: "customerLocation"
			};
	 }
	callupdateCustomer(json, "customerLocation");
	
}


function callupdateCustomer(json, param) {
	$.ajax({
		url: apiContxtPin+"/resource/customerMaster/updateCustomer",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addCustomerModal').modal('hide');
				$('#updateCustomerModal').modal('hide');
				fetchAllCustomerList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addCustomerErrorDiv").empty();
				$("#updateCustomerErrorDiv").empty();
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
	$("#addCustomerFormId :input").attr("disabled", true);	
	$("#addCustomerBtnDiv").hide();
	$("#addLocationBtnDiv").hide();
	$("#updateLocationBtnDiv").hide();
}

function makeEditCustomerDisabled() {
	$("#updateCustomerFormId :input").attr("disabled", true);
	$("#updateCustomerBtn").hide();
}