var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var closePinApprovalStatus = "";
var dropdownDisable = false;

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "DH" || userRole === "PM" || userRole === "Finance") {
		$("#closePinBtnId").show();
	} else {
		$("#closePinBtnId").hide();
	}
	setClosePinDataTable();
});

function setClosePinDataTable() {
	window.scrollTo(0, 0);
	$("#closePinListDiv").show();
	$("#selectPinDivId").hide();
	$("#closePinDivId").hide();
	$('#pinListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');	
	fetchAllClosePinList();
	document.addEventListener('click', printMousePos, true);
}

function backToClosePinList() {
	setClosePinDataTable();
}

/**
 * Function call on Close Pin button click
 * @returns
 */
$(document).ready(function(){
	$('#closePinBtnId').click(function(){  		
  		$("#closePinListDiv").hide();
  		$("#closePinDivId").hide();
  		$("#reasonDivId").hide();
  		$("#selectPinDivId").show();
  		fetchAllPinNoList();
  		$("#closePinFormId")[0].reset();
  		dropdownDisable = false;
	});
});

/**
 * Fetch All Pin data
 * @returns
 */
function fetchAllClosePinList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/closePIN/getAllClosePINList",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"createdRoleId": $("#sessionUserRoleId").val(),
				"createdBy": $("#sessionUsername").val()
			}),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$('#pinListSearchTable').show();
				drawTablePinList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#pinListSearchTable').show();
			}
		});
}

/**
 * Display the Pin data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTablePinList(dataArray){
	var pageLengthVal = showEntriesPageLength("pinListSearchTable");
	$('#pinListSearchTable').html("");
	var resourceSearchTable = $('#pinListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allPinCloseDetails.length; i++) {
		var pinCloserDetailsId = dataArray.allPinCloseDetails[i].pinCloserDetailsId;
		var pinNo = dataArray.allPinCloseDetails[i].pinNo;
		var projectName = dataArray.allPinCloseDetails[i].projectName;
		var projectSponsorName = dataArray.allPinCloseDetails[i].projectSponsorName;
		var projectManagerName = dataArray.allPinCloseDetails[i].projectManagerName;
		var pinStartDate = dataArray.allPinCloseDetails[i].startDate;
		var pinEndDate = dataArray.allPinCloseDetails[i].endDate;
		var statusDetail = dataArray.allPinCloseDetails[i].crStatusDetail;
		var status = dataArray.allPinCloseDetails[i].status;
		//var revisedEndDate = typeof dataArray.allPinCloseDetails[i].revisedEndDate === 'undefined' ? pinEndDate : dataArray.allPinCloseDetails[i].revisedEndDate;
		var pdfExist = dataArray.allPinCloseDetails[i].pdfExist;
		userRole = $("#sessionUserRole").val();
		
		var fn = "fetchClosePinData('"+pinCloserDetailsId+"')";
		var downloadPdf = "fetchPdf('"+pinNo+"', '"+pinCloserDetailsId+"', 'CLOSE', '', 'Y')";
		//var fnClosePin = "closePin('"+pinNo+"')";
		var editImg = '';
		
		//editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';
		
		if(status === 'C' && pdfExist === 'Y') {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>'+
			'&nbsp;&nbsp;&nbsp;'+
			'<a title="Download Pdf" onclick="'+downloadPdf+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-download" style="font-size: 22px;color:DodgerBlue;margin-top: 2px;"></i></a>';
		} else {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';
		}		
		resourceSearchTable.row.add([pinNo, projectName, projectSponsorName, projectManagerName , pinStartDate, pinEndDate, statusDetail, editImg]);		
	}
	resourceSearchTable.draw();
}

function fetchClosePinData(pinCloserDetailsId) {
	$.ajax({
		url: apiContxtPin+ "/resource/closePIN/getClosePINDetails",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"pinCloserDetailsId": pinCloserDetailsId
			}),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$("#closePinListDiv").hide();
				$("#selectPinDivId").hide();
				$("#closePinDivId").show();
				setupAccordion();
				setAriaExpanded("buttonOne");
			    populateClosePinDetails(data, "EDIT");
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#pinListSearchTable').show();
			}
		});
}

function fetchAllPinNoList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/common/getPinNoList",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"createdRoleId": $("#sessionUserRoleId").val(),
				"createdBy": $("#sessionUsername").val()
			}),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {			
				$('#selectPinId').empty();
				$('#selectPinId').append('<option value="">Select</option>');										
				$.each(data.allPinNoDetails, function (index, value) {
                    $('#selectPinId').append('<option id="'+value.pinHeaderId+'" value="' + value.pinNo + '">' + value.pinNo +'-'+value.projectName+'</option>');
                });				
			},			
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}


$("#selectPinId").change(function() {
	var pinNo =  $("#selectPinId option:selected").val();
	var pinHeaderId = $("#selectPinId option:selected").attr("id");
	fetchPinData(pinHeaderId, pinNo);
});

function fetchPinData(pinHeaderId, pinNo) {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/pinMaster/getPinDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinHeaderId": pinHeaderId,
			"pinNo": pinNo,
			"headerIdOrPinNo": "N" 
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			$("#closePinDivId").show();
			setupAccordion();
			setAriaExpanded("buttonOne");
		    populateClosePinDetails(data, "ADD");
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});		
}




function populateClosePinDetails(dataArray, param) {	
	$("#pinHeaderId").val(dataArray.pinHeaderId);
	$("#pinCloserDetailsId").val(dataArray.pinCloserDetailsId);
	
	$("#projectNameId").val(dataArray.projectName);
	fetchResourceList("Manager", "managerId", dataArray.projectManagerId);
	$("#pinNoId").val(dataArray.pinNo);
	$("#pinStartDateId").val(dataArray.pinStartDate);
	$("#pinEndDateId").val(dataArray.pinEndDate);
	$("#revisedEndDateId").val(dataArray.revisedEndDate);	
	$("#createClosePinBtnId").show();
	
	
	if(param === "EDIT") {
		$("#pinCloseDateId").val(dataArray.pinCloseDate);
		$("#projectRepositoryId").val(dataArray.projectRepository);
		//$("#coeClassificationId").val(dataArray.coeClassification);
		
		$("#coeSubClassificationId").val(dataArray.coeSubClassification);
		$("#businessId").val(dataArray.business);
		$("#solutionId").val(dataArray.solution);
		$("#skillRequiredId").val(dataArray.skillRequired);
		populateCoeClassification("EDIT", dataArray.coeClassification)
		populateNatureOfProject("EDIT", dataArray.natureOfProject);
		
		$("#technicalLearningId").val(dataArray.technical);
		$("#peopleLearningId").val(dataArray.people);
		$("#processLearningId").val(dataArray.process);
		$("#effortTimelineId").val(dataArray.effortTimeline);
		$("#projectObjPlannedId").val(dataArray.projectObjectivePlaned);
		$("#projectObjAchievedId").val(dataArray.projectObjectiveAchived);
		$("#milestonesPlannedId").val(dataArray.milestonePlanned);
		$("#milestonesAchievedId").val(dataArray.milestoneAchived);
		$("#plannedAllocationId").val(dataArray.plannedAllocation);
		$("#actualAllocationId").val(dataArray.actualAallocation);
		$("#issuesIdentifiedId").val(dataArray.issuesIdentified);
		$("#issuesFixedId").val(dataArray.issuesFixed);
		$("#issuesRepeatedId").val(dataArray.issuesRepeated);
		$("#riskIdentifiedMitigatedId").val(dataArray.riskMitigation);
		$("#humanResourceReleaseId").val(dataArray.humanResourceRelease);
		$("#physicalResourceReleaseId").val(dataArray.releasedPhysicalResource);
		$("input[name=revokeAllDataAccess][value="+dataArray.revokeAllDataAccess+"]").prop('checked', true); 
		if(dataArray.revokeAllDataAccess === "NO") {
			$("#reasonDivId").show();
			$("#revokeAccessReasonId").val(dataArray.revokeAccessReason);
		} else {
			$("#reasonDivId").hide();
		}
		/*Populate Comment Table*/
		$("#pinCommentsId").val("");
		var commentLength = dataArray.pinCommentsDetails.length;
		if(commentLength > 0){
			$("#commentTable").show();
		} else {
			$("#commentTable").hide();
		}
		$("#commentTable tbody").empty();
		var commentTableStr = "";
		for (var i = 0; i < commentLength; i++) {
			let srandomid = Math.random().toString(36).substring(7);
			commentTableStr = "<tr id="+srandomid+">" +
		 		"<td>" + dataArray.pinCommentsDetails[i].pinCmments+ "</td>" +
		 		"<td>" + dataArray.pinCommentsDetails[i].roleName + "</td>" +
		 		"<td>" + dataArray.pinCommentsDetails[i].pinCommentsDate + "</td>" +
		 		"<td style='display:none;'>" + dataArray.pinCommentsDetails[i].pinCommentsId + "</td>" +
		 		"<td style='display:none;'>" + dataArray.pinCommentsDetails[i].pinHeaderId + "</td>" +
		 		"<td style='display:none;'>" + dataArray.pinCommentsDetails[i].roleId + "</td>" +
		 		"<td style='display:none;'>" + dataArray.pinCommentsDetails[i].isActive + "</td>" +
	 		"</tr>";
			 $("#commentTable tbody").append(commentTableStr);
	    }
	} else {
		$("input[name=revokeAllDataAccess][value='YES']").prop('checked', true);
		populateCoeClassification("ADD", "")
		populateNatureOfProject("ADD", "");
		$("#pinCommentsId").val("");
	}
	
    if(param === "ADD") {		
		makeAllFieldEditable("ADD");
	} else {
		populateFormByRoleAndStatus($("#sessionUserRole").val(), dataArray.status);
	}
}

function populateNatureOfProject(param, responseData) {
	$('#natureOfProjectId').multiselect({
	    columns: 1,
	    placeholder: 'Nature Of Project',
	    search: true,
	    selectAll: true
	});
	if((param == "EDIT") && (responseData != "" && typeof responseData != "undefined")) {
		var array = responseData.split(",");	
		$.each(array,function(i){
			$("#natureOfProjectId").find("option[value='"+array[i].trim()+"']").prop("selected", "selected");  
		}); 
	 }
	$('#natureOfProjectId').multiselect('reload');
	if(dropdownDisable == true) {
		$(".ms-opt-sel-item").prop("disabled", true);
	}
}

function populateCoeClassification(param, responseData) {
	$('#coeClassificationId').multiselect({
	    columns: 1,
	    placeholder: 'Coe Classification',
	    search: true,
	    selectAll: true
	});
	if((param == "EDIT") && (responseData != "" && typeof responseData != "undefined")) {
		var array = responseData.split(",");	
		$.each(array,function(i){
			$("#coeClassificationId").find("option[value='"+array[i].trim()+"']").prop("selected", "selected");  
		}); 
	 }
	$('#coeClassificationId').multiselect('reload');
	if(dropdownDisable == true) {
		$(".ms-opt-sel-item").prop("disabled", true);
	}
}

function createClosePIN() {
	if(validateClosePinDetails()) {
		var todaysDate = (new Date()).toISOString().split('T')[0];
		var json = {
		      pinHeaderId : $("#pinHeaderId").val(),
			  pinNo : $("#pinNoId").val(),
			  startDate : $("#pinStartDateId").val(),
			  endDate : $("#pinEndDateId").val(),
			  pinCloseDate : $("#pinCloseDateId").val(),
			  projectRepository : $("#projectRepositoryId").val(),
			  coeClassification : $("#coeClassificationId").val().join(', '),
			  coeSubClassification : $("#coeSubClassificationId").val(),
			  business : $("#businessId").val(),
			  solution : $("#solutionId").val(),
			  natureOfProject : $("#natureOfProjectId").val().join(', '),
			  skillRequired : $("#skillRequiredId").val(),
			  technical : $("#technicalLearningId").val(),
			  people : $("#peopleLearningId").val(),
			  process : $("#processLearningId").val(),
			  effortTimeline : $("#effortTimelineId").val(),
			  projectObjectivePlaned : $("#projectObjPlannedId").val(),
			  projectObjectiveAchived : $("#projectObjAchievedId").val(),
			  milestonePlanned : $("#milestonesPlannedId").val(),
			  milestoneAchived : $("#milestonesAchievedId").val(),
			  plannedAllocation : $("#plannedAllocationId").val(),
			  actualAallocation : $("#actualAllocationId").val(),
			  issuesIdentified : $("#issuesIdentifiedId").val(),
			  issuesFixed : $("#issuesFixedId").val(),
			  issuesRepeated : $("#issuesRepeatedId").val(),
			  riskMitigation : $("#riskIdentifiedMitigatedId").val(),
			  humanResourceRelease : $("#humanResourceReleaseId").val(),
			  releasedPhysicalResource : $("#physicalResourceReleaseId").val(),
			  revokeAllDataAccess: $("input[name='revokeAllDataAccess']:checked").val(),
			  revokeAccessReason : $("#revokeAccessReasonId").val(),
			  status: "1",		      
		      createdRoleId : $("#sessionUserRoleId").val(),
		      createdBy : $("#sessionUsername").val(),
		      pinCommentsDetails: [
		    	  {	   
					pinHeaderId : $("#pinHeaderId").val(),   
		            roleId : $("#sessionUserRoleId").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ]
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/closePIN/createClosePIN",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify(json),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$("#loader").hide();
				if(data.message) {
					successMsg = data.message;
					if(data.emailSuccess){
						backToClosePinList();
						alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+`And Email Sent Successfully`+"!</p>");
					}else{
						backToClosePinList();
						alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+FAILURE_MSG+"!</p>");
					}
					/*successMsg = data.message;*/
					/*alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");*/
				} else if (data.error) {
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
}

function approveClosePIN() {
	closePinApprovalStatus = "Approve";
	callUpdateClosePIN();
}

function rejectClosePIN() {
	closePinApprovalStatus = "Reject";
	callUpdateClosePIN();
}
function updateClosePIN() {
	closePinApprovalStatus = "";
	callUpdateClosePIN();
}


function callUpdateClosePIN() {
	if(validateClosePinDetails()) {
		var todaysDate = (new Date()).toISOString().split('T')[0];
		var json = {
			  pinCloserDetailsId : $("#pinCloserDetailsId").val(),
		      pinHeaderId : $("#pinHeaderId").val(),
			  pinNo : $("#pinNoId").val(),
			  startDate : $("#pinStartDateId").val(),
			  endDate : $("#pinEndDateId").val(),
			  pinCloseDate : $("#pinCloseDateId").val(),
			  projectRepository : $("#projectRepositoryId").val(),
			  coeClassification : $("#coeClassificationId").val().join(', '),
			  coeSubClassification : $("#coeSubClassificationId").val(),
			  business : $("#businessId").val(),
			  solution : $("#solutionId").val(),
			  natureOfProject : $("#natureOfProjectId").val().join(', '),
			  skillRequired : $("#skillRequiredId").val(),
			  technical : $("#technicalLearningId").val(),
			  people : $("#peopleLearningId").val(),
			  process : $("#processLearningId").val(),
			  effortTimeline : $("#effortTimelineId").val(),
			  projectObjectivePlaned : $("#projectObjPlannedId").val(),
			  projectObjectiveAchived : $("#projectObjAchievedId").val(),
			  milestonePlanned : $("#milestonesPlannedId").val(),
			  milestoneAchived : $("#milestonesAchievedId").val(),
			  plannedAllocation : $("#plannedAllocationId").val(),
			  actualAallocation : $("#actualAllocationId").val(),
			  issuesIdentified : $("#issuesIdentifiedId").val(),
			  issuesFixed : $("#issuesFixedId").val(),
			  issuesRepeated : $("#issuesRepeatedId").val(),
			  riskMitigation : $("#riskIdentifiedMitigatedId").val(),
			  humanResourceRelease : $("#humanResourceReleaseId").val(),
			  releasedPhysicalResource : $("#physicalResourceReleaseId").val(),
			  revokeAllDataAccess: $("input[name='revokeAllDataAccess']:checked").val(),
			  revokeAccessReason : $("#revokeAccessReasonId").val(),
			  status: "1",		      
		      createdRoleId : $("#sessionUserRoleId").val(),
		      modifiedBy : $("#sessionUsername").val(),
		      approvalStatus : closePinApprovalStatus,
		      pinCommentsDetails: [
		    	  {	     
					pinHeaderId : $("#pinHeaderId").val(), 
		            roleId : $("#sessionUserRoleId").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ]
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/closePIN/updateClosePIN",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify(json),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$("#loader").hide();
				if(data.message) {
					successMsg = data.message;
					if(data.emailSuccess){
						backToClosePinList();
						alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+`And Email Sent Successfully`+"!</p>");
					}else{
						backToClosePinList();
						alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+FAILURE_MSG+"!</p>");
					}
					/*successMsg = data.message;*/
					/*alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");*/
				} else if (data.error) {
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
}

function validateClosePinDetails() {
	var pinCloseDate = $("#pinCloseDateId").val();
	var pinComments = $("#pinCommentsId").val();
	var projectRepository = $("#projectRepositoryId").val();
	var coeClassification = $("#coeClassificationId").val();
	var business = $("#businessId").val();
	var solution = $("#solutionId").val();
	var natureOfProject = $("#natureOfProjectId").val();
	var skillRequired = $("#skillRequiredId").val();
	var projectObjPlanned = $("#projectObjPlannedId").val();
	var projectObjAchieved = $("#projectObjAchievedId").val();
	var physicalResourceRelease = $("#physicalResourceReleaseId").val();
	var revokeAccessReason = $("#revokeAccessReasonId").val();
	
	
	
	var technical=$("#technicalLearningId").val();
	var people=$("#peopleLearningId").val();
	var process=$("#processLearningId").val();
	var effortTimeline=$("#effortTimelineId").val();
	
	
	var errorDiv = $("#closePinErrorDiv");
	
	if (pinCloseDate  === "") {     
		errorDiv.empty().append("Please enter valid PIN Close Date");
		setAriaExpanded("buttonOne");
	    return false;
	} else if ($("#pinCloseDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid PIN Close Date");
    	setAriaExpanded("buttonOne");
    	return false;
    } else if (projectRepository  === "") {     
		errorDiv.empty().append("Please enter Project Repository");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (coeClassification  === "") {     
		errorDiv.empty().append("Please select Coe Classification");
		setAriaExpanded("buttonTwo");
	    return false;
	} else if (business  === "") {     
		errorDiv.empty().append("Please enter Business");
		setAriaExpanded("buttonTwo");
	    return false;
	} else if (solution  === "") {     
		errorDiv.empty().append("Please enter Solution");
		setAriaExpanded("buttonTwo");
	    return false;
	} else if (natureOfProject.length  === 0) {     
		errorDiv.empty().append("Please select Nature Of Project");
		setAriaExpanded("buttonTwo");
	    return false;
	} else if (skillRequired  === "") {     
		errorDiv.empty().append("Please enter Skill");
		setAriaExpanded("buttonTwo");
	    return false;
	} else if (projectObjPlanned  === "") {     
		errorDiv.empty().append("Please enter Project Objectives Planned");
		setAriaExpanded("buttonFour");
	    return false;
	} else if (projectObjAchieved  === "") {     
		errorDiv.empty().append("Please enter Project Objectives Achieved");
		setAriaExpanded("buttonFour");
	    return false;
	} else if (physicalResourceRelease  === "") {     
		errorDiv.empty().append("Please enter Hardware & Software Resources To Be Released");
		setAriaExpanded("buttonFour");
	    return false;
	} else if ($("input[name='revokeAllDataAccess']:checked").val() === "NO" && revokeAccessReason  === "") {     
		errorDiv.empty().append("Please enter Reason");
		setAriaExpanded("buttonFour");
	    return false;
	} else if (pinComments  === "") {     
		errorDiv.empty().append("Please enter Comments");
		setAriaExpanded("buttonFive");
	    return false;
	} 
	/*else if(containsSpecialCharacters(technical) 
	           || containsSpecialCharacters(people)
	           || containsSpecialCharacters(process) 
	           || containsSpecialCharacters(effortTimeline)
	         ){
		errorDiv.empty().append("Please remove the special characters from learning");
        setAriaExpanded("buttonFour");
        return false;
	}*/
	
	else if(containsSpecialCharacters(technical)){
		displayErrorMessage("Tecnical learning");
		return false;
	}else if(containsSpecialCharacters(people)){
		displayErrorMessage("People learning");
		return false;
	}else if(containsSpecialCharacters(process)){
		displayErrorMessage("Process learning");
		return false;
	}else if(containsSpecialCharacters(effortTimeline)){
		displayErrorMessage("Effort Timeline");
		return false;
	}
	return true;
}

function displayErrorMessage(field){
	var errorDiv=$("#closePinErrorDiv");
	errorDiv.empty().append("Please remove the special characters from "+field);
	setAriaExpanded("buttonFour");
}

function containsSpecialCharacters(inputString){
	var regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
	return regex.test(inputString);
}

function makeAllFieldEditable(param) {
	$("#closePinFormId :input").attr("disabled", false);
	if(param == "ADD") {
		$("#approveRejectButtonDiv").hide();	
		$("#updateClosePinBtnId").hide();	
		$("#submitButtonDiv").show();
		$("#createClosePinBtnId").show();
	} else {
		$("#submitButtonDiv").show();
		$("#approveRejectButtonDiv").hide();
		$("#createClosePinBtnId").hide();
		$("#updateClosePinBtnId").show();
	}	
	dropdownDisable = false;	
	$(".ms-opt-sel-item").prop("disabled", false);
	//$("#selectedItem").prop("disabled", false);	
	disableFieldForClosePin();
}


function disableFieldForClosePin() {
	$("#projectNameId").attr("disabled", true);
	$("#managerId").attr("disabled", true);
	$("#pinNoId").attr("disabled", true);
	$("#pinStartDateId").attr("disabled", true);
	$("#pinEndDateId").attr("disabled", true);
	$("#revisedEndDateId").attr("disabled", true);
}

function populateFormByRoleAndStatus(role, status) {
	if (role === "DH" || role === "PMO" || role === "PM"){
		if(status === "A" || status === "C") {
			makeAllFieldDisabled();
		} else if(role === "PM") {
			if(status === "D") {			
				makeAllFieldEditable("EDIT");
			}	
		} else if(role === "DH") {
			if(status === "D") {
				approveOrRejectClosePin();
			} else if(status === "I") {
				makeAllFieldEditable("EDIT");
			} else if(status === "A" || status === "C" ) {
				makeAllFieldDisabled();
			}
		} else if(role === "PMO") {
			if(status === "I" ) {
				approveOrRejectClosePin();
			}
		} else {
			makeAllFieldDisabled();
		}
	} else {
		makeAllFieldDisabled();
	}
}

function makeAllFieldDisabled() {
	$("#closePinFormId :input").attr("disabled", true);
	enableClosePinAccordian();
	$("#submitButtonDiv").show();
	$("#approveRejectButtonDiv").hide();
	$("#createClosePinBtnId").hide();
	$("#updateClosePinBtnId").hide();
	dropdownDisable = true;
	//$("#selectedItem").prop("disabled", true);	
}

function enableClosePinAccordian() {
	$("#buttonOne").attr("disabled", false);
	$("#buttonTwo").attr("disabled", false);
	$("#buttonThree").attr("disabled", false);
	$("#buttonFour").attr("disabled", false);
	$("#buttonFive").attr("disabled", false);
}

function approveOrRejectClosePin() {
	$("#closePinFormId :input").attr("disabled", true);
	enableClosePinAccordian();
	$("#pinCommentsId").attr("disabled", false);
	$("#submitButtonDiv").hide();
	$("#approveRejectButtonDiv").show();
	dropdownDisable = true;
	//$("#selectedItem").prop("disabled", true);	
	disableFieldForClosePin();
}

function enableRasonDiv(selection) {
	if (selection === "NO") {
		$("#reasonDivId").show();
	} else {
		$("#reasonDivId").hide();
	}
}

function createPdfForClosePin(pinNo, changeRequestNo, type, crHeaderId) {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/closePIN/createClosePinPdf",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinNo": pinNo,
			"pinCloserDetailsId": changeRequestNo
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.status === "success") {
				fetchPdf(pinNo, changeRequestNo, type, crHeaderId, "N");
			}
		},
		error: function () {
			$("#loader").hide();
		}
	});	
}