function setupAccordion() {
	   // Add minus icon for collapse element which is open by default
 $(".collapse.show").each(function(){
 	$(this).prev(".card-header").find(".fa").addClass("fa-minus-circle").removeClass("fa-plus-circle");
 });
 
 // Toggle plus minus icon on show hide of collapse element
 $(".collapse").on('show.bs.collapse', function(){
 	$(this).prev(".card-header").find(".fa").removeClass("fa-plus-circle").addClass("fa-minus-circle");
 }).on('hide.bs.collapse', function(){
 	$(this).prev(".card-header").find(".fa").removeClass("fa-minus-circle").addClass("fa-plus-circle");
 });
}

function setAriaExpanded(id) {
	  var x = document.getElementById(id).getAttribute("aria-expanded"); 	 
	  if (x != "true") {
		  $("#"+id).trigger("click");
	  }
}


function fetchCustomerLocationList(value){	
	$.ajax({
		url: apiContxtPin+ "/resource/common/getCustomerLocationList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#customerId').empty();
				$('#customerId').append('<option value="">Select</option>');										
				$.each(data.allCustomerLocation, function (index, value) {
                    $('#customerId').append('<option id="'+value.customerLocationID+'" value="' + value.customerLocationCode + '">' + value.customerLocationCodeName + '</option>');
                });
				if(value != "") {
					$("#customerId").val(value);
				}
			},			
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}


function fetchResourceList(resourseType, id, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getResourceList",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"resourseType": resourseType
			}),
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#'+id).empty();
				$('#'+id).append('<option value="">Select</option>');										
				$.each(data.allResourceDetails, function (index, value) {
                    $('#'+id).append('<option value="' + value.resourseId + '" title="'+value.resourseEmpID+'" source="'+value.sourceName+'">' + value.resourseName + '</option>');
                });
				if(value != "") {
					$("#"+id).val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}


function fetchResourceListForCR(resourseType, id, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getResourceListActiveInactive",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"resourseType": resourseType
			}),
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#'+id).empty();
				$('#'+id).append('<option value="">Select</option>');										
				$.each(data.allResourceDetails, function (index, value) {
                    $('#'+id).append('<option value="' + value.resourseId + '" title="'+value.resourseEmpID+'" source="'+value.sourceName+'">' + value.resourseName + '</option>');
                });
				if(value != "") {
					$("#"+id).val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchRoleList(id, value){	
	$.ajax({
		url: apiContxtPin+ "/resource/common/getRoleList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#'+id).empty();
				$('#'+id).append('<option value="">Select</option>');										
				$.each(data.allRoleDetails, function (index, value) {
                    $('#'+id).append('<option value="' + value.roleId + '">' + value.roleName + '</option>');
                });
				if(value != "") {
					$("#"+id).val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function validateAllocation(e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       //display error message
       // $("#errmsg").html("Digits Only").show().fadeOut("slow");
       return false;
	} 
    return true;
}


function dateRangeCheck(fromDate, toDate, checkDate) {
    var fDate,lDate,cDate;
    fDate = Date.parse(fromDate);
    lDate = Date.parse(toDate);
    cDate = Date.parse(checkDate);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

function validateHumanResource(resourceId, roleId, allocation, startDate, endDate, param) {
	var pinStartDate = $("#pinStartDateId").val();
	var pinEndDate = $("#pinEndDateId").val();	
	var pinCRType;
	if(param === "CR") {
		pinCRType = "Change Request";
	} else {
		pinCRType = "Pin";
	}
	$("#addPinErrorDiv").empty();
	$("#addCRErrorDiv").empty();
	$("#physicalResourceErrorDiv").empty();
	
	var errorDiv = $("#humanResourceErrorDiv");
	if(pinStartDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" Start Date first in order to add resource");     
        return false;
	} else if(pinEndDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" End Date first in order to add resource");     
        return false;
	} 
	else if(resourceId === "") {
		errorDiv.empty().append("Please select Resource Name");     
        return false;
	} else if(roleId === "") {
		errorDiv.empty().append("Please select Role");     
        return false;
	} else if(allocation === "") {
		errorDiv.empty().append("Please enter Allocation");     
        return false;
	} else if (onlyNumber(allocation) == false) {
    	errorDiv.empty().append("Please enter valid Allocation");     
        return false;
	} else if (allocation < 1 || allocation > 100) {
    	errorDiv.empty().append("Allocation should be between 1 to 100");     
        return false;
	} else if(startDate === "") {
		errorDiv.empty().append("Please enter Start Date");     
        return false;
	} else if(endDate === "") {
		errorDiv.empty().append("Please enter End Date");     
        return false;
	} else if ((Date.parse(endDate) < Date.parse(startDate))) {
    	errorDiv.empty().append("End date should be greater than or equal to Start date");
        $("#endDateId").val("");
        return false;
    } 
	
	/*else if(!dateRangeCheck(pinStartDate, pinEndDate, startDate)) {
    	errorDiv.empty().append("Resource Start date should be between "+pinCRType+" Start date and "+pinCRType+" End Date");     
        return false;
    } else if(!dateRangeCheck(pinStartDate, pinEndDate, endDate)) {
    	errorDiv.empty().append("Resource End date should be between "+pinCRType+" Start date and "+pinCRType+" End Date");     
        return false;
    }*/
	return true;
}

function validatePhysicalResource(description, allocation, startDate, endDate, param) {
	var pinStartDate = $("#pinStartDateId").val();
	var pinEndDate = $("#pinEndDateId").val();	
	var pinCRType;
	if(param === "CR") {
		pinCRType = "Change Request";
	} else {
		pinCRType = "Pin";
	}
	$("#addPinErrorDiv").empty();
	$("#addCRErrorDiv").empty();
	$("#humanResourceErrorDiv").empty();
	
	var errorDiv = $("#physicalResourceErrorDiv");
	if(pinStartDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" Start Date first in order to add resource");     
        return false;
	} else if(pinEndDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" End Date first in order to add resource");     
        return false;
	} 
	else if(description === "") {
		errorDiv.empty().append("Please enter Description");     
        return false;
	} else if(allocation === "") {
		errorDiv.empty().append("Please enter Allocation");     
        return false;
	} else if (onlyNumber(allocation) == false) {
    	errorDiv.empty().append("Please enter valid Allocation");     
        return false;
	} else if (allocation < 1 || allocation > 100) {
    	errorDiv.empty().append("Allocation should be between 1 to 100");     
        return false;
	} else if(startDate === "") {
		errorDiv.empty().append("Please enter Start Date");     
        return false;
	}  else if(endDate === "") {
		errorDiv.empty().append("Please enter End Date");     
        return false;
	} else if ((Date.parse(endDate) < Date.parse(startDate))) {
    	errorDiv.empty().append("End date should be greater than or equal to Start date");
        $("#endDateId").val("");
        return false;
    } 
	/*else if(!dateRangeCheck(pinStartDate, pinEndDate, startDate)) {
    	errorDiv.empty().append("Resource Start date should be between Pin Start date and Pin End Date");     
        return false;
    } else if(!dateRangeCheck(pinStartDate, pinEndDate, endDate)) {
    	errorDiv.empty().append("Resource End date should be between Pin Start date and Pin End Date");     
        return false;
    }*/
	return true;
}


function checkPinCrStartEndDate(errorDivId, param) {
	var pinStartDate = $("#pinStartDateId").val();
	var pinEndDate = $("#pinEndDateId").val();	
	
	var pinCRType;
	if(param === "CR") {
		pinCRType = "Change Request";
	} else {
		pinCRType = "Pin";
	}
	var errorDiv = $("#"+errorDivId);
	
	if(pinStartDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" Start Date first in order to add resource");     
        return false;
	} else if(pinEndDate === "") {
		errorDiv.empty().append("Please enter "+pinCRType+" End Date first in order to add resource");     
        return false;
	} 
	return true;
}

function populateDeliveryOrg(obj) {
	$("#deliveryOrgId").val(obj.options[obj.selectedIndex].getAttribute("source"));
}

function populateEmployeeId(obj, randomEmpId) {
	var empId = obj.options[obj.selectedIndex].getAttribute("title") == "undefined" || null ? "" : obj.options[obj.selectedIndex].getAttribute("title");
	$("#"+randomEmpId).text(empId);
}

function fetchPdf(pinNo, changeRequestNo, type, crHeaderId, callBack) {
	var data = {pinNo: pinNo, changeRequestNo: changeRequestNo, type:type};
	var url = apiContxtPin+"/resource/common/getPdfContent";
	ajaxPostJSONData(url, JSON.stringify(data) ,
			errorCallbackForPdf,
			function (data) {
				if(!data.error){
					// Insert a link that allows the user to download the PDF file
					var pdfName = '';
					if(type === 'CR') {
						pdfName = changeRequestNo;
					} else if(type === 'PIN') {
						pdfName = "Pin-"+pinNo;
					} else {
						pdfName = "PinClosure-"+pinNo;
					}
					var link=document.createElement('a');
					link.download = pdfName+'.pdf';
    				link.href = 'data:application/octet-stream;base64,' + data.responseText;
    				link.click();									
				} else {
					if(callBack === 'Y') {
						if(type === 'CR') {
							createPdfForLastCR(pinNo, changeRequestNo, type, crHeaderId);
						} else if(type === 'PIN') {
							createPdfForPin(pinNo, changeRequestNo, type, crHeaderId);
						} /*else {
							createPdfForClosePin(pinNo, changeRequestNo, type, crHeaderId);
						}*/
					}									
				}					
			}, null);
	
}

const errorCallbackForPdf = function (data){
	console.log(data);
}