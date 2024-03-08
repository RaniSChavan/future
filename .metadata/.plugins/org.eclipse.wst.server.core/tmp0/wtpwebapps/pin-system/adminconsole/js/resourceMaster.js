var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var selectedServiceDisable = [];
var contractServiceDtlJson = [];
var activeStatusVal = '';
var userRole = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "HR") {
		$("#addResourceBtnId").show();
	} else {
		$("#addResourceBtnId").hide();
	}
	window.scrollTo(0, 0);
	$('#resourceListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');
	fetchAllResourceList();
	document.addEventListener('click', printMousePos, true);
});


/**
 * Function call on Add Service button click
 * Open the Add Service modal
 * @returns
 */
$(document).ready(function(){
	$('#addResourceBtnId').click(function(){
  		$('#addResourceModal').modal({
    		backdrop: 'static',
    		keyboard: false
		});
  		$("#modelTitleResource").text('Add Resource');
  		$("#addResourceFormId")[0].reset();
  		$("#activeStatusIdDiv").hide();
  		
  		$("#resourceEmpIdDiv").hide();
  		$("#separationDateDiv").hide();
  		$("#updateResourceBtnDiv").hide();
  		$("#activeResourceBtnDiv").hide();		
  		$("#subcontractorOrgDiv").hide();
  		$("#addResourceBtnDiv").show();
  		$("#addResourceErrorDiv").empty();

  		//enableContractField();
  		fetchAllSourceCodeList("ADD", "");
  		fetchAllDesignationList("ADD", "");
  		fetchAllGradeList("ADD", "");
  		fetchAllManagerList("Manager", "managerNameId", "ADD", "");
  		fetchAllManagerList("Mentor", "mentorNameId", "ADD", "");
  		fetchAllSkillDtlList("ADD", "");
  		fetchAllVendorList("ADD", "");
	});
});

/**
 * Fetch All Service data
 * @returns
 */
function fetchAllResourceList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/resourceMaster/getAllResourceList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#contractListSearchTable').show();
				drawTableResourceList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#contractListSearchTable').show();
			}
		});
}

function fetchAllResourceList1(){	
	drawTableResourceList(allResourceDetails);
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
function drawTableResourceList(dataArray){
	var pageLengthVal = showEntriesPageLength("resourceListSearchTable");
	$('#resourceListSearchTable').html("");
	var resourceSearchTable = $('#resourceListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allResourceDetails.length; i++) {
		var resourseId = dataArray.allResourceDetails[i].resourseId;
		var resourseName = dataArray.allResourceDetails[i].resourseName;
		var resourseEmpId = dataArray.allResourceDetails[i].resourseEmpID;
		var resourseHourlyRate = dataArray.allResourceDetails[i].resourseHourlyRate;
		var resourseJoiningDate = dataArray.allResourceDetails[i].resourseJoiningDate;
		var resourseSparationDate = dataArray.allResourceDetails[i].resourseSparationDate;
		var resourseType = dataArray.allResourceDetails[i].resourseType;
		var resourseManagerMentorType = dataArray.allResourceDetails[i].resourseManagerMentorType;
		var resourseStatus = dataArray.allResourceDetails[i].isActive == "1" ? "Active" : "Inactive";


		//var contractPeriodUnit = dataArray.allContractMasterDetails[i].contractPeriodUnit === "M" ? "Monthly" : "Fortnight";
		
		var fn = "fetchResourceData('"+resourseId+"')";
		var editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';	
		resourceSearchTable.row.add([resourseName, resourseEmpId, resourseJoiningDate, resourseSparationDate, resourseType , resourseStatus, editImg]);		
	}
	resourceSearchTable.draw();
}

/**
 * Fetch All Source Code data
 * @returns
 */
function fetchAllSourceCodeList(param, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getSourceList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#resourceSourseCodeId').empty();
				$('#resourceSourseCodeId').append('<option value="">Select</option>');
				$.each(data.allSourceDetails, function (index, value) {
                    $('#resourceSourseCodeId').append('<option value="' + value.sourceId + '">' + value.sourceName + '</option>');
                });
				if(param == "EDIT") {
					$("#resourceSourseCodeId").val(value).attr("disabled", true);
				} else {
					$("#resourceSourseCodeId").attr("disabled", false);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchAllDesignationList(param, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getDesignationList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#designationNameId').empty();
				$('#designationNameId').append('<option value="">Select</option>');
				$.each(data.allDesignationDetails, function (index, value) {
                    $('#designationNameId').append('<option value="' + value.designationId + '">' + value.designationName + '</option>');
                });
				if(param == "EDIT") {
					$("#designationNameId").val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchAllGradeList(param, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getGradeList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#resourceGradeId').empty();
				$('#resourceGradeId').append('<option value="">Select</option>');
				$.each(data.allGradeDetails, function (index, value) {
                    $('#resourceGradeId').append('<option value="' + value.gradeId + '">' + value.gradeName + '</option>');
                });
				if(param == "EDIT") {
					$("#resourceGradeId").val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchAllManagerList(resourceType, fieldId, param, value){	
	$.ajax({
			url: apiContxtPin+ "/resource/common/getResourceList",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"resourseType": resourceType
			}),
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {				
				$('#'+fieldId).empty();
				$('#'+fieldId).append('<option value="">Select</option>');
				$.each(data.allResourceDetails, function (index, value) {
                    $('#'+fieldId).append('<option value="' + value.resourseId + '">' + value.resourseName + '</option>');
                });
				if(param == "EDIT") {
					$("#"+fieldId).val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchAllSkillDtlList(param, responseData) {
	$('#skillDetailsSelect').find('option').remove();
		$.ajax({
			url: apiContxtPin+ "/resource/common/getSkillList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				console.log(data);
				if (jQuery.isEmptyObject(data)) {
					alertify.alert("No Data Found!");							
				} else {
					$.each(data.allSkillDetails, function (i, option) {								
						  var $option = $("<option>", {
		                        text: option.skillName,
		                        value: option.skillId
		                    })
			                $option.appendTo('#skillDetailsSelect');
					});
					$('#skillDetailsSelect').multiselect({
			  		    columns: 1,
			  		    placeholder: 'Select Skill Details',
			  		    search: true,
			  		    selectAll: true
			  		});
					 $('#skillDetailsSelect').multiselect('reload');
					 if(param == "EDIT") {
						 drawFetchResourceData(responseData); 
					 }
				}
				if(userRole != "HR") {	
					$("#selectedItem").prop("disabled", true);
				} else {
					if(param == "EDIT") {
						if(responseData.isActive === 1) {
							$("#selectedItem").prop("disabled", false);
						} else {
							$("#selectedItem").prop("disabled", true);
						}
					}
					
				}
				$("#loader").hide();
			},
			error: function () {
				alertify.alert("An error has occurred!!!");
			}
		});						
}


/**
 * Fetch All Vendor data
 * @returns
 */
function fetchAllVendorList(param, value){
	$.ajax({
			url: apiContxtPin+ "/resource/common/getVendorList",
			type: "GET",
			headers: { "APIKey": $("#apiKeySession").val() },
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#resourceVendorId').empty();
				$('#resourceVendorId').append('<option value="">Select</option>');
				$.each(data.allVendorDetails, function (index, value) {
                    $('#resourceVendorId').append('<option value="' + value.vendorId + '">' + value.vendorName + '</option>');
                });
				if(param == "EDIT") {
					$("#resourceVendorId").val(value);
				}
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function fetchResourceData(resourceId) {
	$.ajax({
		url: apiContxtPin+ "/resource/resourceMaster/getResourceDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"resourseId": resourceId
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			fetchAllSkillDtlList("EDIT", data);
			//drawFetchResourceData(data)
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});
}

function drawFetchResourceData(data) {
	$('#addResourceModal').modal({
		backdrop: 'static',
		keyboard: false
	});
	$("#modelTitleResource").text('Edit Resource');
	if(userRole === "HR") {
		if(data.isActive === 1) {
			$("#addResourceFormId :input").attr("disabled", false);
			$("#addResourceBtnDiv").hide();
			$("#activeResourceBtnDiv").hide();
			$("#updateResourceBtnDiv").show();
		} else {
			makeAllFieldDisabled();
			$('#activeStatusId').prop('disabled', false);
			$("#activeResourceBtnDiv").show();
		}
	} else {
		makeAllFieldDisabled();
	}	
	$("#addResourceErrorDiv").empty();
	$("#activeStatusIdDiv").show();
	
	$("#resourceMasterId").val(data.resourseId);
	$("#resourceNameId").val(data.resourseName);
	$("#resourcePhoneNoId").val(data.resoursePhoneNo);
	$("#resourceEmpIdDiv").show();
	$("#separationDateDiv").show();
	$("#resourceEmpId").val(data.resourseEmpID).attr("disabled", true);
	$("#resourceEmailId").val(data.resourseEmail);
	//$("#resourceHourlyRateId").val(data.resourseHourlyRate);
	$("#joiningDateId").val(data.resourseJoiningDate);
	$("#separationDateId").val(data.resourseSparationDate);	
	
	fetchAllSourceCodeList("EDIT", data.resourseSourseId);
	fetchAllDesignationList("EDIT", data.resourseDesignationId);
	fetchAllGradeList("EDIT", data.resourseGradeId);
	fetchAllManagerList("Manager", "managerNameId", "EDIT", data.resourseManagerId);
	fetchAllManagerList("Mentor", "mentorNameId", "EDIT", data.resourseMentorId);
	$("#resourceTypeId").val(data.resourseType);
	if( data.resourseType === "Subcontractor") {
		$("#subcontractorOrgDiv").show();
		//$("#subcontractorOrgId").val(data.subcontractorName);
		fetchAllVendorList("EDIT", data.resourseVendorId);	
	} else {
		fetchAllVendorList("ADD", "");
		$("#subcontractorOrgDiv").hide();
	}
	$("#resourceCatagoryId").val(data.resourseManagerMentorType);
	
	activeStatusVal = data.isActive;
	if(data.isActive === 1) {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', true);
	} else {
		$("input[type='checkbox'][name='activeStatus']").prop('checked', false);
	}
	
	var objLength = data.resourseSkillDetails.length;
    for (var i = 0; i < objLength; i++) {
    	 $("#skillDetailsSelect").find("option[value="+data.resourseSkillDetails[i].resourseSkillId+"]").prop("selected", "selected").prop("readonly", true);    	
    }
    $('#skillDetailsSelect').multiselect('reload');
   
}


function disabledSelectedService() {
	if(selectedServiceDisable.length > 0) {
		$.each(selectedServiceDisable,function(i){
			var serviceId = selectedServiceDisable[i];
			$('input:checkbox[value="'+serviceId+'"]').prop('checked', true);
			$('input:checkbox[value="'+serviceId+'"]').prop("disabled", true);
			//$('input:checkbox[title="'+locationName+'"]').prop("selected", "selected");
		});
	}	
}

/**
 * Function call while saving new Contract data
 * @returns
 */
function addNewResource() {
	if(validateResouce()) {
	    callAddNewResource();
	}
}

function updateResource() {
	if(validateResouce()) {
		if($("input[type='checkbox'][name='activeStatus']:checked").length == 0 && activeStatusVal === 1) {
	    	$("#addResourceErrorDiv").empty();
			alertify.set({ buttonReverse: true });
			alertify.confirm("Making status Inactive will set Separation date to today's date. Are you sure you want to proceed ?", function (e) {
				if (e) {
					callUpdateResource();
				} 
			});
	    } else {
	    	callUpdateResource();
	    }
	}
	//callUpdateResource();
}


function updateResourceToActive() {	
	if($("input[type='checkbox'][name='activeStatus']:checked").length == 1) {
    	$("#addResourceErrorDiv").empty();
		alertify.set({ buttonReverse: true });
		alertify.confirm("Making status active will make the resource active. Are you sure you want to proceed ?", function (e) {
			if (e) {
				callUpdateResourceToActive();
			} 
		});	   
	} else {
		$("#addResourceErrorDiv").append("Please enter Resource Active to update");
		 return false;
	}
}

function validateResouce() {
	
	var resourceName = $.trim($("#resourceNameId").val());
	var resourceEmail = $.trim($("#resourceEmailId").val());
	var resourcePhoneNo = $.trim($("#resourcePhoneNoId").val());
	var resourceSourseCode = $("#resourceSourseCodeId").val();
	//var resourceHourlyRate = $("#resourceHourlyRateId").val();
	var designationName = $("#designationNameId").val();
	var resourceGrade = $("#resourceGradeId").val();
	var joiningDate = $("#joiningDateId").val();
	var separationDate = $("#separationDateId").val();
	var managerName = $("#managerNameId").val();
	var mentorName = $("#mentorNameId").val();
	var skillDetails = $("#skillDetailsSelect").val();
	var resourceType = $("#resourceTypeId").val();
	var resourceCatagory =  $("#resourceCatagoryId").val();

	var errorDiv = $("#addResourceErrorDiv");
	
	if (resourceName  === "") {     
		errorDiv.empty().append("Please enter Resource Name");     
        return false;
    } else if (onlyAlphabetWithSpace(resourceName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Resource Name");     
        return false;
    } else if (resourceEmail  === "") {       
        errorDiv.empty().append("Please enter Resource Email Id");     
        return false;
	} else if (validateEmail(resourceEmail) == false) {
		errorDiv.empty().append("Please enter valid Resource Email Id");     
        return false;
	} else if (resourcePhoneNo != "" && phoneNumberValidation(resourcePhoneNo) == false) {
		errorDiv.empty().append("Please enter valid Phone No");     
	    return false;		
	} else if (resourceSourseCode  === "") {     
		errorDiv.empty().append("Please select Source Code");     
        return false;
    } 
	/*else 
		if (resourceHourlyRate  === "") {       
	        errorDiv.empty().append("Please enter Hourly Rate");     
	        return false;
	} else if (onlyNumber(resourceHourlyRate) == false) {
	    	errorDiv.empty().append("Please enter valid Hourly Rate");     
	        return false;
	}*/ 
    else if (designationName  === "") {     
		errorDiv.empty().append("Please select Designation Name");     
        return false;
    } else if (resourceGrade  === "") {     
		errorDiv.empty().append("Please select Grade Name");     
        return false;
    } else if(joiningDate === ""){
    	errorDiv.empty().append("Please enter valid Joining Date");
        return false;
    } else if ($("#joiningDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid Joining Date");
    	return false;
    } else if ($("#separationDateId")[0].validationMessage != "") {     
    	errorDiv.empty().append("Please enter valid Separation Date");     
        return false;
    } else if (separationDate != "" && (Date.parse(separationDate) < Date.parse(joiningDate))) {
    	errorDiv.empty().append("Separation date should be greater than or equal to joiningDate date");
        $("#separationDateId").val("");
        return false;
    } else if (managerName  === "") {     
		errorDiv.empty().append("Please select Manager Name");     
        return false;
    } else if (mentorName  === "") {     
		errorDiv.empty().append("Please select Mentor Name");     
        return false;
    } else if (skillDetails.length  === 0) {
		errorDiv.empty().append("Please select Skill Details");     
        return false;
    } else if (resourceType  === "") {     
		errorDiv.empty().append("Please select Resource Type");     
        return false;
    } /*else if (resourceCatagory  === "") {     
		errorDiv.empty().append("Please select Resource Catagory");     
        return false;
    }*/
    return true;
}


function callAddNewResource() {
	$("#loader").show();
	jsonObj = [];
	var array = $('#skillDetailsSelect').val();
	
	$.each(array,function(i){
		item = {};
		item ["resourseSkillId"] = array[i];
		jsonObj.push(item);		
	});
	
	var json = {
			resourseName: $("#resourceNameId").val(),
			resourseEmail: $("#resourceEmailId").val(),
			resoursePhoneNo: $("#resourcePhoneNoId").val(),
			resourseSourseId: $("#resourceSourseCodeId option:selected").val(),
			resourseSourseCode: $("#resourceSourseCodeId option:selected").text(),			
			//resourseHourlyRate: $("#resourceHourlyRateId").val(),
			resourseHourlyRate: "0",
			resourseDesignationId: $("#designationNameId option:selected").val(),
			resourseDesignationName: $("#designationNameId option:selected").text(),			
			resourseGradeId: $("#resourceGradeId option:selected").val(),
			resourseGradeName: $("#resourceGradeId option:selected").text(),					
			resourseJoiningDate: $("#joiningDateId").val(),
			resourseSparationDate: $("#separationDateId").val(),
			resourseManagerId: $("#managerNameId option:selected").val(),
			resourseManagerName: $("#managerNameId option:selected").text(),
			resourseMentorId: $("#mentorNameId option:selected").val(),
			resourseMentorName: $("#mentorNameId option:selected").text(),
			resourseSkillDetails: jsonObj,
			resourseType: $("#resourceTypeId option:selected").val(),
			resourseVendorId: $("#resourceVendorId option:selected").val(),
			resourseManagerMentorType : $("#resourceCatagoryId option:selected").val(),
			isActive: "1",
			createdBy : $("#sessionUsername").val()
	};
	
	for(key in json){
		  if(isEmpty(json[key])) 
		     delete json[key]; 
	}
	  
	$.ajax({
		url: apiContxtPin+"/resource/resourceMaster/createResource",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addResourceModal').modal('hide');
				fetchAllResourceList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addResourceErrorDiv").empty();
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

function isEmpty(value) {
	return value == null || value == "";
}

function callUpdateResource() {
	$("#loader").show();
	var activeStatus = "1";
	if ($("input[type='checkbox'][name='activeStatus']:checked").length == 0) {
		activeStatus = "0";
	}
	
	jsonObj = [];
	var array = $('#skillDetailsSelect').val();
	
	$.each(array,function(i){
		item = {};
		item ["resourseSkillId"] = array[i];
		jsonObj.push(item);		
	});
	
	var json = {
			resourseId: $("#resourceMasterId").val(),
			resourseName: $("#resourceNameId").val(),
			resourseEmail: $("#resourceEmailId").val(),
			resoursePhoneNo: $("#resourcePhoneNoId").val(),
			resourseSourseId: $("#resourceSourseCodeId option:selected").val(),
			resourseSourseCode: $("#resourceSourseCodeId option:selected").text(),
			//resourseHourlyRate: $("#resourceHourlyRateId").val(),
			resourseHourlyRate: "0",
			resourseDesignationId: $("#designationNameId option:selected").val(),
			resourseDesignationName: $("#designationNameId option:selected").text(),
			resourseGradeId: $("#resourceGradeId option:selected").val(),
			resourseGradeName: $("#resourceGradeId option:selected").text(),
			resourseJoiningDate: $("#joiningDateId").val(),
			resourseSparationDate: $("#separationDateId").val(),
			resourseManagerId: $("#managerNameId option:selected").val(),
			resourseManagerName: $("#managerNameId option:selected").text(),
			resourseMentorId: $("#mentorNameId option:selected").val(),
			resourseMentorName: $("#mentorNameId option:selected").text(),
			resourseSkillDetails: jsonObj,
			resourseType: $("#resourceTypeId option:selected").val(),
			resourseVendorId: $("#resourceVendorId option:selected").val(),
			resourseManagerMentorType : $("#resourceCatagoryId option:selected").val(),
			isActive: activeStatus,
			modifiedBy : $("#sessionUsername").val()
	};

	for(key in json){
		  if(isEmpty(json[key])) 
		     delete json[key]; 
	}
	
	$.ajax({
		url: apiContxtPin+"/resource/resourceMaster/updateResource",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addResourceModal').modal('hide');
				fetchAllResourceList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addResourceErrorDiv").empty();
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



function callUpdateResourceToActive() {
	$("#loader").show();
	var activeStatus = "1";
	if ($("input[type='checkbox'][name='activeStatus']:checked").length == 0) {
		activeStatus = "0";
	}	
	
	var json = {
			resourseId: $("#resourceMasterId").val(),			
			isActive: activeStatus,
			modifiedBy : $("#sessionUsername").val()
	};

	$.ajax({
		url: apiContxtPin+"/resource/resourceMaster/updateResourceToActive",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				$('#addResourceModal').modal('hide');
				fetchAllResourceList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
				$("#addResourceErrorDiv").empty();
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

function isEmpty(value){
	  return value == null || value == "";
}

function makeAllFieldDisabled() {
	$("#addResourceFormId :input").attr("disabled", true);
	$("#addResourceBtnDiv").hide();
	$("#updateResourceBtnDiv").hide();
	$("#activeResourceBtnDiv").hide();	
	$("#selectedItem").prop("disabled", true);	
}

function populateSubcontractorDiv(obj) {
	if(obj.value === "Subcontractor") {
		$("#subcontractorOrgDiv").show();
	} else {
		$("#subcontractorOrgDiv").hide();
	}
}