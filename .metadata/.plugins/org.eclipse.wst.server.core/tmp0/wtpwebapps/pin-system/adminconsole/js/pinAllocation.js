var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var userName = "";
var userRole = "";
var approvalStatus = "";
var humanResourceError = false;
var physicalResourceError = false;

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "DH" || userRole === "PM" || userRole === "Finance") {
		$("#addPineBtnId").show();
	} else {
		$("#addPineBtnId").hide();
	}
	setPinDataTable();
});

function setPinDataTable() {
	window.scrollTo(0, 0);
	$("#pinListDiv").show();
	$("#createNewPinDivId").hide();
	$('#pinListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');	
	fetchAllPinList();
	document.addEventListener('click', printMousePos, true);
}

function backToPinList() {
	setPinDataTable();
}

/**
 * Fetch All Pin data
 * @returns
 */
function fetchAllPinList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/pinMaster/getAllPinList",
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

	for (var i = 0; i < dataArray.allPinHeaderDetails.length; i++) {
		var pinHeaderId = dataArray.allPinHeaderDetails[i].pinHeaderId;
		var pinNo = dataArray.allPinHeaderDetails[i].pinNo;
		var projectName = dataArray.allPinHeaderDetails[i].projectName;
		var projectSponsorName = dataArray.allPinHeaderDetails[i].projectSponsorName;
		var projectManagerName = dataArray.allPinHeaderDetails[i].projectManagerName;
		var contractValue = dataArray.allPinHeaderDetails[i].contractValue;
		var pinStartDate = dataArray.allPinHeaderDetails[i].pinStartDate;
		var pinEndDate = dataArray.allPinHeaderDetails[i].pinEndDate;
		var pinStatusDetail = dataArray.allPinHeaderDetails[i].pinStatusDetail;
		var pinStatus = dataArray.allPinHeaderDetails[i].pinStatus;
		var revisedEndDate = typeof dataArray.allPinHeaderDetails[i].revisedEndDate === 'undefined' ? pinEndDate : dataArray.allPinHeaderDetails[i].revisedEndDate;
		var projectHoldDate = typeof dataArray.allPinHeaderDetails[i].pinProjectHoldDate === 'undefined' ? 'N/A' : dataArray.allPinHeaderDetails[i].pinProjectHoldDate;
		var pdfExist = dataArray.allPinHeaderDetails[i].pdfExist;
		userRole = $("#sessionUserRole").val();
		
		var fn = "fetchPinData('"+pinHeaderId+"', '"+pinNo+"')";
		var downloadPdf = "fetchPdf('"+pinNo+"', '', 'PIN', '', 'Y')";
		var fnClosePin = "closePin('"+pinNo+"')";
		var editImg = '';
		/*if(pinStatus === "Release" && (userRole == "PM" || userRole == "DH")) {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>&nbsp;&nbsp;&nbsp;<a class="delete close-pin" title="Close Pin" onclick="'+fnClosePin+'"><i class="fa fa-times-circle" style="font-size: 22px;color:red;margin-top: 2px;"></i></a>';
		} else {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';			
		}*/
		if(pinStatus === 'R' && pdfExist === 'Y') {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>'+
			'&nbsp;&nbsp;&nbsp;'+
			'<a title="Download Pdf" onclick="'+downloadPdf+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-download" style="font-size: 22px;color:DodgerBlue;margin-top: 2px;"></i></a>';
		} else {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';
		}				
		resourceSearchTable.row.add([pinNo, projectName, projectSponsorName, projectManagerName, contractValue , pinStartDate, pinEndDate, revisedEndDate, projectHoldDate, pinStatusDetail, editImg]);		
	}
	resourceSearchTable.draw();
}

/**
 * Function call on Add Pin button click
 * @returns
 */
$(document).ready(function(){
	$('#addPineBtnId').click(function(){  		
  		$("#pinListDiv").hide();
  		$("#createNewPinDivId").show();
  		$("#createPinFormId")[0].reset();
  		
  		makeAllFieldEditable();
  		$("#savePinBtnId").show();
  		$("#updatePinBtnId").hide();
  		$("#addPinErrorDiv").empty();
  		$("#humanResourceErrorDiv").empty();
  		$("#physicalResourceErrorDiv").empty();
  		$("#commentTable tbody").empty();
  		$("#commentTable").hide();
  		$("#revisedEndDateDiv").hide();
  		$("#humanResourceTable tbody").empty();
  		$("#physicalResourceTable tbody").empty();
  		setupAccordion();
  		setAriaExpanded("buttonOne");
  		fetchCustomerLocationList("");
  		fetchResourceList("Manager", "managerId", "");
  		humanResourceError = false;
  		physicalResourceError = false;
	});
});

$(document).ready(function(){
	//$('[data-toggle="tooltip"]').tooltip();
	var actionsHR = "<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
                    "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
                    "<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>" ;
	//var actionsHR = $("#humanResourceTable td:last-child").html();
	// Append table with add row form on add new button click
    $("#addHumanResourceBtn").click(function(){
		let randomEmpId = Math.random().toString(36).substring(8);
    	humanResourceError = true;
    	if(checkPinCrStartEndDate("humanResourceErrorDiv", "Pin")) {
    		fetchResourceList("AllResource", "resourceId" , "");
        	fetchRoleList("roleId", "");
    		$(this).attr("disabled", "disabled");
    		var startDateValidation = $("#pinStartDateId").val();
    		var endDateValidation = $("#pinEndDateId").val();	
    		var index = $("#humanResourceTable tbody tr:last-child").index();
            var row = '<tr>' +
                '<td>'+
            		'<select class="form-control" name="resource" id="resourceId" onchange="populateEmployeeId(this, \''+randomEmpId+'\')"></select>' +
      			'</td>' +
      			'<td><p id="'+randomEmpId+'" name="employeeId"></p></td>' +
                '<td>' +
                	'<select class="form-control" name="role" id="roleId"></select>' +
                '</td>' +
                '<td><input type="text" class="form-control pinAllocation" name="allocation" id="allocationId" maxlength="3"></td>' +
                '<td id="'+startDateValidation+'"><input type="date" class="form-control" name="startDate" id="startDateId" min="'+startDateValidation+'" max="'+endDateValidation+'"></td>' +
                '<td id="'+endDateValidation+'"><input type="date" class="form-control" name="endDate" id="endDateId" min="'+startDateValidation+'" max="'+endDateValidation+'"></td>' +
    			'<td>' + actionsHR + '</td>' +
            '</tr>';
        	$("#humanResourceTable").append(row);
        	$(".pinAllocation").keypress(function (e) {
        		if(!validateAllocation(e)) {
        			return false;
        		}
        	});
    		$("#humanResourceTable tbody tr").eq(index + 1).find(".add, .edit").toggle();
           // $('[data-toggle="tooltip"]').tooltip();
    	}
    
    });
    
	var actionsPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
    				"<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
    				"<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>" ;
    //var actionsPR = $("#physicalResourceTable td:last-child").html();
    $("#addPhysicalResourceBtn").click(function(){
    	physicalResourceError = true;
    	if(checkPinCrStartEndDate("physicalResourceErrorDiv", "Pin")) {
    		$(this).attr("disabled", "disabled");
    		var startDateValidation = $("#pinStartDateId").val();
    		var endDateValidation = $("#pinEndDateId").val();
    		var index = $("#physicalResourceTable tbody tr:last-child").index();
            var row = '<tr>' +
                '<td><input type="text" class="form-control" name="description" id="descriptionPRId" maxlength="45"></td>' +
                '<td><input type="text" class="form-control pinAllocation" name="allocationPR" id="allocationPRId" maxlength="3"></td>' +
                '<td id="'+startDateValidation+'"><input type="date" class="form-control" name="startDatePR" id="startDatePRId" min="'+startDateValidation+'" max="'+endDateValidation+'"></td>' +
                '<td id="'+endDateValidation+'"><input type="date" class="form-control" name="endDatePR" id="endDatePRId" min="'+startDateValidation+'" max="'+endDateValidation+'"></td>' +
    			'<td>' + actionsPR + '</td>' +
            '</tr>';
        	$("#physicalResourceTable").append(row);
        	$(".pinAllocation").keypress(function (e) {
        		if(!validateAllocation(e)) {
        			return false;
        		}
        	});
    		$("#physicalResourceTable tbody tr").eq(index + 1).find(".add, .edit").toggle();
            //$('[data-toggle="tooltip"]').tooltip();
    	}
    });
		
	// Add row on add button click
	$(document).on("click", ".addHumanResource", function(){
		var empty = false;
		var resourceId = $("#resourceId option:selected").val();
		var employeeId = $("p[name=employeeId]").html();
		var resourceName = $("#resourceId option:selected").text();
		var roleId = $("#roleId option:selected").val();
		var roleIdText = $("#roleId option:selected").text();
		var allocation = $("#allocationId").val();
		var allocationId = $("#allocationId").parent().attr("id");
		var startDate = $("#startDateId").val();
		var endDate = $("#endDateId").val();
		var startDateValidation = $("#startDateId").parent().attr("id");		
		var endDateValidation = $("#endDateId").parent().attr("id");
		if(validateHumanResource(resourceId, roleId, allocation, startDate, endDate, "Pin")) {
			$("#humanResourceErrorDiv").empty();
			let srandomid = Math.random().toString(36).substring(7);
			var markup = "<td>" + resourceName + "</td>" +
						"<td style='display:none;'>"+resourceId+"</td>" +
						"<td>" + employeeId + "</td>" +
						"<td>" + roleIdText + "</td>" +
						"<td style='display:none;'>"+roleId+"</td>" +
						"<td id="+allocationId+">" + allocation + "</td>" +
						"<td id="+startDateValidation+">" + startDate + "</td>" +
						"<td id="+endDateValidation+">" + endDate + "</td>" +
						"<td>" +
						"<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
				        "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
						"<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>" +
						"</td>" +
						"</tr>";
			 $(this).parents("tr").prop('id', srandomid);
			 $(this).parents("tr").html(markup);
			 humanResourceError = false;
			 $(".add-new-HR").removeAttr("disabled");
		}
    });
	

	// Add row on add button click
	$(document).on("click", ".addPhysicalResource", function(){
		var empty = false;	
		var description = $("#descriptionPRId").val();
		var allocation = $("#allocationPRId").val();
		var allocationId = $("#allocationPRId").parent().attr("id");
		var startDate = $("#startDatePRId").val();
		var endDate = $("#endDatePRId").val();
		var startDateValidation = $("#startDatePRId").parent().attr("id");		
		var endDateValidation = $("#endDatePRId").parent().attr("id");
		
		if(validatePhysicalResource(description, allocation, startDate, endDate, "Pin")) {
			$("#physicalResourceErrorDiv").empty();
			let srandomid = Math.random().toString(36).substring(7);
			var markup = "<td>" + description + "</td>" +									
						"<td  id="+allocationId+">" + allocation + "</td>" +
						"<td id="+startDateValidation+">" + startDate + "</td>" +
						"<td id="+endDateValidation+">" + endDate + "</td>" +
						"<td>" +
						"<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
				        "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
						"<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>" +
						"</td>";
			 $(this).parents("tr").prop('id', srandomid);
			 $(this).parents("tr").html(markup);
			 physicalResourceError = false;
			 $(".add-new-PR").removeAttr("disabled");
		}
    });
	
	// Edit row on edit button click
	$(document).on("click", ".editHumanResource", function(){
		var trId = $(this).parents("tr").attr('id');
		var trVal = $("#"+trId)[0];
		var cells = trVal.getElementsByTagName("td");
		var resourceName = cells[0].innerText;
		var resourceId = cells[1].innerText;
		var employeeId = cells[2].innerText;
		var role = cells[4].innerText;
		var allocation = cells[5].innerText;
		var startDate = cells[6].innerText;
		var endDate = cells[7].innerText;
		var startDateValidation = cells[6].id;
		var endDateValidation = cells[7].id;
		
		$(this).parents("tr").find("td:eq(0)").html('<select class="form-control" name="resource" id="resourceId" onchange="populateEmployeeId(this,\'empIdEdit\')"></select>');
		$("#resourceId").val(resourceId);
		$(this).parents("tr").find("td:eq(2)").html('<p id="empIdEdit" name="employeeId">'+employeeId+'</p>');		
		$(this).parents("tr").find("td:eq(3)").html('<select class="form-control" name="role" id="roleId"></select>');
		$("#roleId").val(role);
		$(this).parents("tr").find("td:eq(5)").html('<input type="text" class="form-control pinAllocation" name="allocation" id="allocationId" maxlength="3" value="'+allocation+'">');
		if(startDateValidation != undefined && endDateValidation != undefined ) {
			$(this).parents("tr").find("td:eq(6)").html('<input type="date" class="form-control" name="startDate" id="startDateId" value="'+startDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
			$(this).parents("tr").find("td:eq(7)").html('<input type="date" class="form-control" name="endDate" id="endDateId" value="'+endDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
		} else {
			$(this).parents("tr").find("td:eq(6)").html('<input type="date" class="form-control" name="startDate" id="startDateId" value="'+startDate+'">');
			$(this).parents("tr").find("td:eq(7)").html('<input type="date" class="form-control" name="endDate" id="endDateId" value="'+endDate+'">');
		}	
        $(this).parents("tr").find(".edit, .add").toggle();
		$(this).hide();	

		fetchResourceList("AllResource", "resourceId", resourceId);
    	fetchRoleList("roleId", role);
    	$(".pinAllocation").keypress(function (e) {
    		if(!validateAllocation(e)) {
    			return false;
    		}
    	});   	
		$(".add-new-HR").attr("disabled", "disabled");		
    });
	
	$(document).on("click", ".editPhysicalResource", function(){
		var trId = $(this).parents("tr").attr('id');
		var trVal = $("#"+trId)[0];
		var cells = trVal.getElementsByTagName("td");
		var description = cells[0].innerText;
		var allocation = cells[1].innerText;
		var startDate = cells[2].innerText;
		var endDate = cells[3].innerText;
		var startDateValidation = cells[2].id;
		var endDateValidation = cells[3].id;
		
		$(this).parents("tr").find("td:eq(0)").html('<input type="text" class="form-control" name="description" id="descriptionPRId" maxlength="45" value="'+description+'">');
		$(this).parents("tr").find("td:eq(1)").html('<input type="text" class="form-control pinAllocation" name="allocationPR" id="allocationPRId" maxlength="3" value="'+allocation+'">');
		if(startDateValidation != undefined && endDateValidation != undefined ) {
			$(this).parents("tr").find("td:eq(2)").html('<input type="date" class="form-control" name="startDatePR" id="startDatePRId" value="'+startDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
			$(this).parents("tr").find("td:eq(3)").html('<input type="date" class="form-control" name="endDatePR" id="endDatePRId" value="'+endDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
		} else {
			$(this).parents("tr").find("td:eq(2)").html('<input type="date" class="form-control" name="startDatePR" id="startDatePRId" value="'+startDate+'">');
			$(this).parents("tr").find("td:eq(3)").html('<input type="date" class="form-control" name="endDatePR" id="endDatePRId" value="'+endDate+'">');
		}	
        $(this).parents("tr").find(".edit, .add").toggle();
		$(this).hide();
		$(".pinAllocation").keypress(function (e) {
    		if(!validateAllocation(e)) {
    			return false;
    		}
    	});
		$(".add-new-PR").attr("disabled", "disabled");		
    });
	
	// Delete row on delete button click
	$(document).on("click", ".deleteHumanResource", function(){
        $(this).parents("tr").remove();
		$(".add-new-HR").removeAttr("disabled");
		humanResourceError = false;
    });
	
	$(document).on("click", ".deletePhysicalResource", function(){
        $(this).parents("tr").remove();
		$(".add-new-PR").removeAttr("disabled");
		physicalResourceError = false;
    });
});



function savePinAllocation() {
	if(validatePinDetails()) {
		var resourceJson = prepareResourceJson();
		var todaysDate = (new Date()).toISOString().split('T')[0];	
		var json = {
		      projectType : $("#projectTypeId option:selected").text(),
		      projectTypeCode : $("#projectTypeId option:selected").val(),
		      projectCaragory : $("#projectCategoryId option:selected").text(),
		      projectCaragoryCode : $("#projectCategoryId option:selected").val(),
		      customerId : $("#customerId option:selected").attr("id"),
		      customerCode : $("#customerId option:selected").val(),
		      projectName : $("#projectNameId").val(),
		      projectSponsorName : $("#sponsorNameId").val(),
		      projectManagerId : $("#managerId option:selected").val(),
		      projectManagerName : $("#managerId option:selected").text(),
			  contractValue : $("#contractValueId").val(),
			  createdRoleId : $("#sessionUserRoleId").val(),
		      pinStartDate : $("#pinStartDateId").val(),
		      pinEndDate : $("#pinEndDateId").val(),
		      isActive : "1",
		      projectObjectives : $("#projectObjectivesId").val(),
		      projectDeliverables : $("#projectDeliverablesId").val(),
		      projectInScope : $("#projectInScopeId").val(),
		      projectOutScope : $("#projectOutScopeId").val(),
		      projectAssumptions : $("#projectAssumptionsId").val(),
		      projectConstraints : $("#projectConstraintsId").val(),
		      projectInitialRisksMitigation : $("#projectInitialRisksId").val(),
		      projectKeyMilestones : $("#projectKeyMilestonesId").val(),
		      createdBy : $("#sessionUsername").val(),
		      pinCommentsDetails: [
		    	  {	      
		            roleId : $("#sessionUserRoleId").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ],
		     pinDetails: resourceJson
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/pinMaster/createPin",
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
					if(data.status != 'failure') {
						if(data.emailSuccess){
							backToPinList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg + `And Email Sent Successfully`+!"</p>");
						}else{
							backToPinList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg + FAILURE_MSG +!"</p>");
						}
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
			},
		});
	}
}

function validatePinDetails() {
	var projectType = $("#projectTypeId").val();
	var projectCategory = $("#projectCategoryId").val();
	var customer = $("#customerId").val();
	var manager = $("#managerId").val();
	var projectName = $("#projectNameId").val();
	var sponsorName = $("#sponsorNameId").val();
	var pinStartDate = $("#pinStartDateId").val();
	var pinEndDate = $("#pinEndDateId").val();	
	var contractValue = $("#contractValueId").val();
	var pinComments = $("#pinCommentsId").val();
	var humanResourceTbody = $("#humanResourceTable tbody");
	var physicalResourceTbody = $("#physicalResourceTable tbody");
	
	var errorDiv = $("#addPinErrorDiv");
	
	if (projectType  === "") {     
		errorDiv.empty().append("Please select Project Type");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (projectCategory  === "") {     
		errorDiv.empty().append("Please select Project Category");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (customer  === "") {     
		errorDiv.empty().append("Please select Customer");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (projectName  === "") {     
		errorDiv.empty().append("Please enter Project Name");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (onlyAlphabetWithSpace(projectName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Project Name");
    	setAriaExpanded("buttonOne");
        return false;
    } else if (sponsorName  === "") {     
		errorDiv.empty().append("Please enter Sponsor Name");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (onlyAlphabetWithSpace(sponsorName) == false) {
    	errorDiv.empty().append("Please remove special characters and numbers from Sponsor Name");
    	setAriaExpanded("buttonOne");
        return false;
    } else if (manager  === "") {     
		errorDiv.empty().append("Please select Project Manager Name");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (pinStartDate  === "") {     
		errorDiv.empty().append("Please enter valid Pin Start Date");
		setAriaExpanded("buttonOne");
	    return false;
	} else if ($("#pinStartDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid Pin Start Date");
    	setAriaExpanded("buttonOne");
    	return false;
    } else if (pinEndDate  === "") {     
		errorDiv.empty().append("Please enter valid Pin End Date");
		setAriaExpanded("buttonOne");
	    return false;
	} else if ($("#pinEndDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid Pin End Date");
    	setAriaExpanded("buttonOne");
    	return false;
    } else if ((Date.parse(pinEndDate) < Date.parse(pinStartDate))) {
    	errorDiv.empty().append("Pin End Date should be greater than or equal to Pin Start Date");   	
        $("#pinEndDateId").val("");
        setAriaExpanded("buttonOne");
        return false;
    } else if (contractValue  === "") {     
		errorDiv.empty().append("Please enter valid Contract Value");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (pinComments  === "") {     
		errorDiv.empty().append("Please enter Comments");
		setAriaExpanded("buttonThree");
	    return false;
	} else if (humanResourceError == true) {
		errorDiv.empty();
		$("#humanResourceErrorDiv").empty().append("Please Add Human Resource");
		setAriaExpanded("buttonFour");
	    return false;
	} else if (physicalResourceError == true) {
		errorDiv.empty();
		$("#physicalResourceErrorDiv").empty().append("Please Add Physical Resource");
		setAriaExpanded("buttonFour");
	    return false;
	} /*else if (humanResourceTbody.children().length === 0 && physicalResourceTbody.children().length === 0) {
		errorDiv.empty().append("Please Add atleast one Human Resource or Physical Resource");
		setAriaExpanded("buttonFour");
	    return false;
	}*/
	return true;
}

function prepareResourceJson() {
	var humanResourceObj = [];
	$("#humanResourceTable tr").each(function (index) {
		var item = {};
		if(index > 0) {
			var allocationChg = false;
	        var self = $(this);
	        if(self.attr("title") != undefined) {
	        	item ["pinDetailsId"] = self.attr("title");
	        }
	        if(self.attr("isActive") != undefined) {
	        	item ["isActive"] = self.attr("isActive");
	        } else {
				item ["isActive"] = "1";
			}
	        var previousAllocation = self.find("td:eq(5)").attr("id");
	        if(previousAllocation != "undefined") {
	        	if(previousAllocation === self.find("td:eq(5)").text()) {
	        		allocationChg = false;
	        	} else {
	        		allocationChg = true;
	        	}
	        } else {
	        	allocationChg = true;
	        }
			item ["pinResourceType"] = "HR";
			item ["resourseId"] = self.find("td:eq(1)").text();
			item ["resourseName"] = self.find("td:eq(0)").text();
			item ["roleId"] = self.find("td:eq(4)").text();
			item ["allocation"] = self.find("td:eq(5)").text();
			item ["allocationStartDate"] = self.find("td:eq(6)").text();
			item ["allocationEndDate"] = self.find("td:eq(7)").text();
			item ["allocationChange"] = allocationChg;
			//item ["isActive"] = "1";
			humanResourceObj.push(item);
		}
    });	
	
	$("#physicalResourceTable tr").each(function (index) {
		var item = {};
		if(index > 0) {
			var allocationChg = false;
	        var self = $(this);
	        if(self.attr("title") != undefined) {
	        	item ["pinDetailsId"] = self.attr("title");
	        }
	        if(self.attr("isActive") != undefined) {
	        	item ["isActive"] = self.attr("isActive");
	        } else {
				item ["isActive"] = "1";
			}
	        var previousAllocation = self.find("td:eq(1)").attr("id");
	        if(previousAllocation != "undefined") {
	        	if(previousAllocation === self.find("td:eq(1)").text()) {
	        		allocationChg = false;
	        	} else {
	        		allocationChg = true;
	        	}
	        } else {
	        	allocationChg = true;
	        }
			item ["pinResourceType"] = "PR";
			item ["descroption"] = self.find("td:eq(0)").text();
			item ["allocation"] = self.find("td:eq(1)").text();
			item ["allocationStartDate"] = self.find("td:eq(2)").text();
			item ["allocationEndDate"] = self.find("td:eq(3)").text();
			item ["allocationChange"] = allocationChg;
			//item ["isActive"] = "1";
			humanResourceObj.push(item);
		}
    });	

	return humanResourceObj;
}

function approvePin() {
	approvalStatus = "Approve";
	callUpdatePinAllocation();
}

function rejectPin() {
	approvalStatus = "Reject";
	callUpdatePinAllocation();
}
function updatePinAllocation() {
	approvalStatus = "";
	callUpdatePinAllocation();
}

function callUpdatePinAllocation() {
	if(validatePinDetails()) {
		var resourceJson = prepareResourceJson();
		var todaysDate = (new Date()).toISOString().split('T')[0];	
		var json = {
			  pinHeaderId : $("#pinHeaderId").val(),
		      projectType : $("#projectTypeId option:selected").text(),
		      projectTypeCode : $("#projectTypeId option:selected").val(),
		      projectCaragory : $("#projectCategoryId option:selected").text(),
		      projectCaragoryCode : $("#projectCategoryId option:selected").val(),
		      customerId : $("#customerId option:selected").attr("id"),
		      customerCode : $("#customerId option:selected").val(),
		      projectName : $("#projectNameId").val(),
		      projectSponsorName : $("#sponsorNameId").val(),
		      projectManagerId : $("#managerId option:selected").val(),
		      projectManagerName : $("#managerId option:selected").text(),
			  contractValue : $("#contractValueId").val(),
			  /*createdRoleId : $("#sessionUserRoleId").val(),*/
		      pinStartDate : $("#pinStartDateId").val(),
		      pinEndDate : $("#pinEndDateId").val(),
		      isActive : "1",
		      projectObjectives : $("#projectObjectivesId").val(),
		      projectDeliverables : $("#projectDeliverablesId").val(),
		      projectInScope : $("#projectInScopeId").val(),
		      projectOutScope : $("#projectOutScopeId").val(),
		      projectAssumptions : $("#projectAssumptionsId").val(),
		      projectConstraints : $("#projectConstraintsId").val(),
		      projectInitialRisksMitigation : $("#projectInitialRisksId").val(),
		      projectKeyMilestones : $("#projectKeyMilestonesId").val(),
		      modifiedBy : $("#sessionUsername").val(),
		      approvalStatus : approvalStatus,
		      pinCommentsDetails: [
		    	  {
					      
		            roleId : $("#sessionUserRoleId").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ],
		     pinDetails: resourceJson
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/pinMaster/updatePin",
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
					if(data.status != 'failure') {
						if(data.emailSuccess){
							backToPinList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+`And Email Sent Successfully`+"!</p>");
						}else{
							backToPinList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+FAILURE_MSG+"!</p>");
						}
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


function fetchPinData(pinHeaderId, pinNo) {
	$.ajax({
		url: apiContxtPin+ "/resource/pinMaster/getPinDetails",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinHeaderId": pinHeaderId,
			"pinNo": pinNo,
			"headerIdOrPinNo": "Y" 
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#addPinErrorDiv").empty();
	  		$("#humanResourceErrorDiv").empty();
	  		$("#physicalResourceErrorDiv").empty();
			$("#pinListDiv").hide();
			$("#createNewPinDivId").show();
			$("#savePinBtnId").hide();
	  		$("#updatePinBtnId").show();
			setupAccordion();
			setAriaExpanded("buttonOne");
		    populatePinDetails(data);
		},
		error: function () {
			alertify.alert(FAILURE_MSG);
		}
	});		
}


function populatePinDetails(dataArray) {
	$("#pinHeaderId").val(dataArray.pinHeaderId);
	$("#projectTypeId").val(dataArray.projectTypeCode);
	$("#projectCategoryId").val(dataArray.projectCaragoryCode);
	fetchCustomerLocationList(dataArray.customerCode);
	//$("#customerId").val(dataArray.customerCode);
	$("#projectNameId").val(dataArray.projectName);
	$("#sponsorNameId").val(dataArray.projectSponsorName);
	fetchResourceList("Manager", "managerId", dataArray.projectManagerId);
	$("#deliveryOrgId").val(dataArray.sourceName);
	$("#pinStartDateId").val(dataArray.pinStartDate);
	$("#pinEndDateId").val(dataArray.pinEndDate);
	$("#contractValueId").val(dataArray.contractValue);
    $("#revisedEndDateId").val(typeof dataArray.revisedEndDate === 'undefined' ? dataArray.pinEndDate : dataArray.revisedEndDate);
    $("#revisedEndDateDiv").show();
	
	$("#projectObjectivesId").val(dataArray.projectObjectives);
	$("#projectDeliverablesId").val(dataArray.projectDeliverables);
	$("#projectInScopeId").val(dataArray.projectInScope);
	$("#projectOutScopeId").val(dataArray.projectOutScope);
	$("#projectAssumptionsId").val(dataArray.projectAssumptions);
	$("#projectConstraintsId").val(dataArray.projectConstraints);
	$("#projectInitialRisksId").val(dataArray.projectInitialRisksMitigation);
	$("#projectKeyMilestonesId").val(dataArray.projectKeyMilestones);
	
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
 		"</tr>";
		 $("#commentTable tbody").append(commentTableStr);
    }
	
	/*Populate Resource Table*/
	$("#humanResourceTable tbody").empty();
	$("#physicalResourceTable tbody").empty();
	var resourceLength = dataArray.pinDetails.length;
	var hrTableStr = "";	
	var actionsHR = "";
	var actionsPR = "";
	var prTableStr = "";
	for (var i = 0; i < resourceLength; i++) {
		let srandomid = Math.random().toString(36).substring(7);
		if(dataArray.pinDetails[i].pinResourceType === "HR") {
			var employeeId = dataArray.pinDetails[i].resourseEmpID == undefined ? "" : dataArray.pinDetails[i].resourseEmpID;
			if(dataArray.pinDetails[i].isActive === 1) {
				actionsHR = "<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
			    "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
			    "<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			} else {
				actionsHR = "";
			}
			hrTableStr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+">" +
		        	"<td>" +dataArray.pinDetails[i].resourseName+ "</td>" +
		        	"<td style='display:none;'>" +dataArray.pinDetails[i].resourseId+ "</td>" +
		        	"<td>" +employeeId+ "</td>" +
		        	"<td>" +dataArray.pinDetails[i].roleName+ "</td>" +
		        	"<td style='display:none;'>" +dataArray.pinDetails[i].roleId+ "</td>" +
		        	"<td id="+dataArray.pinDetails[i].allocation+">" +dataArray.pinDetails[i].allocation+ "</td>" +
		        	"<td id="+dataArray.pinDetails[i].startDate+">" +dataArray.pinDetails[i].allocationStartDate+ "</td>" +
		        	"<td id="+dataArray.pinDetails[i].endDate+">" +dataArray.pinDetails[i].allocationEndDate+ "</td>" +
		        	"<td>" + actionsHR + "</td>" +
		        	"</tr>";
					$("#humanResourceTable tbody").append(hrTableStr);
					//$("#humanResourceTable tbody tr").find(".add, .edit").toggle();
		} else if (dataArray.pinDetails[i].pinResourceType === "PR"){
			if(dataArray.pinDetails[i].isActive === 1) {
				actionsPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
			    "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
			    "<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			} else {
				actionsPR = "";
			}
			prTableStr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+">" +
        	"<td>" +dataArray.pinDetails[i].descroption+ "</td>" +        	
        	"<td id="+dataArray.pinDetails[i].allocation+">" +dataArray.pinDetails[i].allocation+ "</td>" +
        	"<td id="+dataArray.pinDetails[i].startDate+">" +dataArray.pinDetails[i].allocationStartDate+ "</td>" +
        	"<td id="+dataArray.pinDetails[i].endDate+">" +dataArray.pinDetails[i].allocationEndDate+ "</td>" +
        	"<td>" + actionsPR + "</td>" +
        	"</tr>";
			$("#physicalResourceTable tbody").append(prTableStr);
			//$("#physicalResourceTable tbody tr").find(".add, .edit").toggle();
		}
	}
	populateFormByRoleAndStatus($("#sessionUserRole").val(), dataArray.pinStatus);
}


function populateFormByRoleAndStatus(role, status) {
	if (role === "DH" || role === "PMO" || role === "PM" || role === "Finance"){
		if(status === "R" || status === "C") {
			makeAllFieldDisabled();
		} else if(role === "PM") {
			if(status === "D") {			
				makeAllFieldEditable();
			} else if(status === "A" || status === "R" ) {			
				makeAllFieldDisabled();  		
			}
			
		} else if(role === "DH") {
			if(status === "D") {
				approveOrRejectWithComment();
			} else if(status === "I") {
				makeAllFieldEditable();
			} else if(status === "A" || status === "R" ) {
				makeAllFieldDisabled();
			}
		} else if(role === "PMO") {
			if(status === "A" || status === "I" ) {
				approveOrRejectWithComment();
			}
		} else {
			makeAllFieldDisabled();
		}
	} else {
		makeAllFieldDisabled();
	}	
}

function enableAccordianButton() {
	$("#buttonOne").attr("disabled", false);
	$("#buttonTwo").attr("disabled", false);
	$("#buttonThree").attr("disabled", false);
	$("#buttonFour").attr("disabled", false);
}

function makeAllFieldEditable() {
	$("#createPinFormId :input").attr("disabled", false);
	$("#submmitButtonDiv").show();
	$("#approveRejectButtonDiv").hide();
	$("#savePinBtnId").hide();
	$("#updatePinBtnId").show();
	
	$("#addHumanResourceBtn").attr("disabled", false);
	$("#addPhysicalResourceBtn").attr("disabled", false);
	$(".editHumanResource").removeClass('button-disabled');
	$(".deleteHumanResource").removeClass('button-disabled');
	$(".editPhysicalResource").removeClass('button-disabled');
	$(".deletePhysicalResource").removeClass('button-disabled');
	$("#deliveryOrgId").attr("disabled", true);
}

function makeAllFieldDisabled() {
	$("#createPinFormId :input").attr("disabled", true);
	enableAccordianButton();
	$("#submmitButtonDiv").show();
	$("#approveRejectButtonDiv").hide();
	$("#savePinBtnId").hide();
	$("#updatePinBtnId").hide();
	
	$("#addHumanResourceBtn").attr("disabled", true);
	$("#addPhysicalResourceBtn").attr("disabled", true);
	$(".editHumanResource").addClass('button-disabled');
	$(".deleteHumanResource").addClass('button-disabled');
	$(".editPhysicalResource").addClass('button-disabled');
	$(".deletePhysicalResource").addClass('button-disabled');
}

function approveOrRejectWithComment() {
	$("#createPinFormId :input").attr("disabled", true);
	enableAccordianButton();
	$("#pinCommentsId").attr("disabled", false);
	$("#submmitButtonDiv").hide();
	$("#approveRejectButtonDiv").show();
	
	$("#addHumanResourceBtn").attr("disabled", true);
	$("#addPhysicalResourceBtn").attr("disabled", true);
	$(".editHumanResource").addClass('button-disabled');
	$(".deleteHumanResource").addClass('button-disabled');
	$(".editPhysicalResource").addClass('button-disabled');
	$(".deletePhysicalResource").addClass('button-disabled');
}

function closePin(pinNumber) {
	alertify.set({ buttonReverse: true });
	alertify.confirm("Closing the Pin will release all the Resource and close the Change Request as well. Are you sure you want to proceed ?", function (e) {
		if (e) {
			callClosePin(pinNumber);
		} 
	});
}

function callClosePin(pinNumber) {
	$("#loader").show();
	var json = {
			 "pinNo": pinNumber
		}
	$.ajax({
		url: apiContxtPin+"/resource/pinMaster/closedPin",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				fetchAllPinList();
				successMsg = data.message;
				alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
			} else if (data.error) {
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

function createPdfForPin(pinNo, changeRequestNo, type, crHeaderId) {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/pinMaster/createPinPdf",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinNo": pinNo
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