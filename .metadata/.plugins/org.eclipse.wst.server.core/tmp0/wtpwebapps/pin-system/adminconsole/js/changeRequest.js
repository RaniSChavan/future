var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var userName = "";
var userRole = "";
var approvalStatus = "";
var humanResourceError = false;
var physicalResourceError = false;
var changeReasonDisable = false;
var addEditResourceSelectHR = false;
var addEditResourceSelectPR = false;
var humanResourcePreviousCell = "";
var physicalResourcePreviousCell = "";

$(document).ready(function () {
	userRole = $("#sessionUserRole").val();
	if(userRole === "DH" || userRole === "PM") {
		$("#addChangeReqBtnId").show();
	} else {
		$("#addChangeReqBtnId").hide();
	}
	setChangeReqDataTable();
});

function setChangeReqDataTable() {
	window.scrollTo(0, 0);
	$("#changeReqListDiv").show();
	$("#createNewChgReqDivId").hide();
	$("#selectPinDivId").hide();
	$('#changeReqListSearchTable').DataTable();
	$('.dataTables_length').addClass('bs-select');	
	fetchAllChangeReqList();
	document.addEventListener('click', printMousePos, true);
}

function backToCRList() {
	setChangeReqDataTable();
}


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
    	if(checkPinCrStartEndDate("humanResourceErrorDiv", "CR")) {
    		fetchResourceList("AllResource", "resourceId" , "");
        	fetchRoleList("roleId", "");
    		$(this).attr("disabled", "disabled");
    		var startDateValidation = $("#pinStartDateId").val();
    		var endDateValidation = $("#pinEndDateId").val();	 
    		var index = $("#humanResourceTable tbody tr:last-child").index();
    		humanResourcePreviousCell = "";
            var row = '<tr crChangeStatus="Y">' +
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
    	if(checkPinCrStartEndDate("physicalResourceErrorDiv", "CR")) {
    		$(this).attr("disabled", "disabled");
    		var startDateValidation = $("#pinStartDateId").val();
    		var endDateValidation = $("#pinEndDateId").val();
    		var index = $("#physicalResourceTable tbody tr:last-child").index();
    		physicalResourcePreviousCell = "";
            var row = '<tr crChangeStatus="Y">' +
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
		var resourceId = $("#resourceId option:selected").val();
		var resourceName = $("#resourceId option:selected").text();
		var employeeId = $("p[name=employeeId]").html();
		var roleId = $("#roleId option:selected").val();
		var roleIdText = $("#roleId option:selected").text();
		var allocation = $("#allocationId").val();
		var allocationId = $("#allocationId").parent().attr("id");
		var startDate = $("#startDateId").val();
		var endDate = $("#endDateId").val();
		var startDateValidation = $("#startDateId").parent().attr("id");		
		var endDateValidation = $("#endDateId").parent().attr("id");
		if(validateHumanResource(resourceId, roleId, allocation, startDate, endDate, "CR")) {
			$("#humanResourceErrorDiv").empty();
			var addActionHR = '';
			var trTitle = $(this).parents("tr").attr("title");
			if(trTitle != undefined) {
				addActionHR = "<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>"+
		        "<a class='copy copyHumanResource' title='Copy' data-toggle='tooltip'><i class='material-icons'>&#xE14D;</i></a>";
			} else {
				addActionHR = "<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
				"<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			}
			
			let srandomid = Math.random().toString(36).substring(7);
			var markup = "<td>" + resourceName + "</td>" +
						"<td style='display:none;'>"+resourceId+"</td>" +						
						"<td>" + employeeId + "</td>" +
						"<td>" + roleIdText + "</td>" +
						"<td style='display:none;'>"+roleId+"</td>" +
						"<td id="+allocationId+">" + allocation + "</td>" +
						"<td id="+startDateValidation+">" + startDate + "</td>" +
						"<td id="+endDateValidation+">" + endDate + "</td>" +	
						"<td>" + addActionHR + "</td>" +
						"</tr>";
			var rowEditted = '';
			var trCrChangeStatus = $(this).parents("tr").attr("crChangeStatus");
			 if(humanResourcePreviousCell.length != 0 && trCrChangeStatus != 'Y') {			
			   var obj = new Object();
			   obj.resourceId = resourceId;
			   obj.role  = roleId;
			   obj.allocation = allocation;
			   obj.startDate = startDate;
			   obj.endDate = endDate;
			   var currentCells= JSON.stringify(obj);
		   
				//if(checkHumanResourceForEdit(humanResourcePreviousCell, currentCells)) {
				if(humanResourcePreviousCell === currentCells) {
					rowEditted = 'N';
				} else {
					rowEditted = 'Y';
				}
			 } else {
				rowEditted = 'Y';
			 }
			 $(this).parents("tr").prop('id', srandomid);	
			 $(this).parents("tr").attr('crChangeStatus', rowEditted);		 
			 $(this).parents("tr").css('background-color', 'white');
			 $(this).parents("tr").html(markup);
			 humanResourceError = false;
			 if(trTitle != undefined) {
				 if(addEditResourceSelectHR) {
					 $(".add-new-HR").removeAttr("disabled"); 
				 } else {
					 $(".add-new-HR").attr("disabled");
				 }	
			 } else {
				 $(".add-new-HR").removeAttr("disabled"); 
			 }	 
			 //$(".add-new-HR").removeAttr("disabled");
		}
    });
	

	// Add row on add button click
	$(document).on("click", ".addPhysicalResource", function(){
		var description = $("#descriptionPRId").val();
		var allocation = $("#allocationPRId").val();
		var allocationId = $("#allocationPRId").parent().attr("id");
		var startDate = $("#startDatePRId").val();
		var endDate = $("#endDatePRId").val();
		var startDateValidation = $("#startDatePRId").parent().attr("id");
		var endDateValidation = $("#endDatePRId").parent().attr("id");
		
		if(validatePhysicalResource(description, allocation, startDate, endDate, "CR")) {
			$("#physicalResourceErrorDiv").empty();
			var addActionPR = '';
			var trTitle = $(this).parents("tr").attr("title");
			if(trTitle != undefined) {
				addActionPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>"+
		        "<a class='copy copyPhysicalResource' title='Copy' data-toggle='tooltip'><i class='material-icons'>&#xE14D;</i></a>";
			} else {
				addActionPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
				"<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			}
			
			let srandomid = Math.random().toString(36).substring(7);
			var markup = "<td>" + description + "</td>" +									
						"<td id="+allocationId+">" + allocation + "</td>" +
						"<td id="+startDateValidation+">" + startDate + "</td>" +
						"<td id="+endDateValidation+">" + endDate + "</td>" +
						"<td>" + addActionPR + "</td>";
			
			var rowEditted = '';
			var trCrChangeStatus = $(this).parents("tr").attr("crChangeStatus");
			if(physicalResourcePreviousCell.length != 0 && trCrChangeStatus != 'Y') {			
			   var obj = new Object();
			   obj.description = description;
			   obj.allocation = allocation;
			   obj.startDate = startDate;
			   obj.endDate = endDate;
			   var currentCells= JSON.stringify(obj);
		       if(physicalResourcePreviousCell === currentCells) {
					rowEditted = 'N';
				} else {
					rowEditted = 'Y';
				}
			  } else {
				rowEditted = 'Y';
			 }
			 
			 $(this).parents("tr").prop('id', srandomid);
			 $(this).parents("tr").attr('crChangeStatus', rowEditted);
			 $(this).parents("tr").css('background-color', 'white');
			 $(this).parents("tr").html(markup);
			 physicalResourceError = false;
			 if(trTitle != undefined ) {
				 if(addEditResourceSelectPR) {
					 $(".add-new-PR").removeAttr("disabled"); 
				 } else {
					 $(".add-new-PR").attr("disabled");
				 }		
			 } else {
				 $(".add-new-PR").removeAttr("disabled"); 
			 }	 
		}
    });
	
	// Edit row on edit button click
	$(document).on("click", ".editHumanResource", function(){
		if($('.addHumanResource:visible').length > 0) {
			alert("Previous record needs to be saved in order to edit this.");
			return false;
		}	
		var resourceIsActive = $(this).parents("tr").attr("resourceisactive");	
		var trId = $(this).parents("tr").attr('id');
		var trVal = $("#"+trId)[0];
		var cells = trVal.getElementsByTagName("td");
		var resourceName = cells[0].innerText;
		var resourceId = cells[1].innerText;
		var employeeId = cells[2].innerText;
		var role = cells[4].innerText;
		var allocation = cells[5].innerText;
		var startDate = cells[6].innerText;
		var startDateValidation = cells[6].id;
		var endDate = cells[7].innerText;
		var endDateValidation = cells[7].id;
		
		var trTitle = $(this).parents("tr").attr("title");
		   var obj = new Object();
		   obj.resourceId = resourceId;
		   obj.role  = role;
		   obj.allocation = allocation;
		   obj.startDate = startDate;
		   obj.endDate = endDate;
		   humanResourcePreviousCell= JSON.stringify(obj);
		
		if(trTitle != undefined ) {
			$(this).parents("tr").find("td:eq(0)").html('<select class="form-control" name="resource" id="resourceId" onchange="populateEmployeeId(this,\'empIdEdit\')" disabled="disabled"></select>');
		} else {
			$(this).parents("tr").find("td:eq(0)").html('<select class="form-control" name="resource" id="resourceId" onchange="populateEmployeeId(this,\'empIdEdit\')"></select>');
		}		
		$("#resourceId").val(resourceId);
		$(this).parents("tr").find("td:eq(2)").html('<p id="empIdEdit" name="employeeId">'+employeeId+'</p>');
		
		if(resourceIsActive != undefined && resourceIsActive  === "0") {
			$(this).parents("tr").find("td:eq(3)").html('<select class="form-control" name="role" id="roleId" disabled="disabled"></select>');
		} else {
			$(this).parents("tr").find("td:eq(3)").html('<select class="form-control" name="role" id="roleId"></select>');
		}				
		$("#roleId").val(role);
		
		if(resourceIsActive != undefined && resourceIsActive  === "0") {
			$(this).parents("tr").find("td:eq(5)").html('<input type="text" class="form-control pinAllocation" name="allocation" id="allocationId" maxlength="3" disabled="disabled" value="'+allocation+'">');
		} else {
			$(this).parents("tr").find("td:eq(5)").html('<input type="text" class="form-control pinAllocation" name="allocation" id="allocationId" maxlength="3" value="'+allocation+'">');
		}
		
		if(startDateValidation != undefined && endDateValidation != undefined ) {
			if(resourceIsActive != undefined && resourceIsActive  === "0") {
				var resourseSparationDate = $(this).parents("tr").attr("resoursespdate");					
				var inactiveResourceEndDateValidation = "";
				if(resourseSparationDate < endDateValidation ) {
					inactiveResourceEndDateValidation = resourseSparationDate;
				} else {
					inactiveResourceEndDateValidation = endDateValidation;
				}
				
				$(this).parents("tr").find("td:eq(6)").html('<input type="date" class="form-control" name="startDate" id="startDateId" disabled="disabled" value="'+startDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
				$(this).parents("tr").find("td:eq(7)").html('<input type="date" class="form-control" name="endDate" id="endDateId" value="'+endDate+'" min="'+startDateValidation+'" max="'+inactiveResourceEndDateValidation+'">');
			} else {
				$(this).parents("tr").find("td:eq(6)").html('<input type="date" class="form-control" name="startDate" id="startDateId" value="'+startDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
				$(this).parents("tr").find("td:eq(7)").html('<input type="date" class="form-control" name="endDate" id="endDateId" value="'+endDate+'" min="'+startDateValidation+'" max="'+endDateValidation+'">');
			}
			
		} else {
			$(this).parents("tr").find("td:eq(6)").html('<input type="date" class="form-control" name="startDate" id="startDateId" value="'+startDate+'">');
			$(this).parents("tr").find("td:eq(7)").html('<input type="date" class="form-control" name="endDate" id="endDateId" value="'+endDate+'">');
		}		
        $(this).parents("tr").find(".edit, .add").toggle();
		$(this).hide();	

		if(trTitle != undefined ) {
			fetchResourceListForCR("AllResource", "resourceId", resourceId);
		} else {
			fetchResourceList("AllResource", "resourceId" , resourceId);
		}	
			
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
		var startDateValidation = cells[2].id;
		var endDate = cells[3].innerText;
		var endDateValidation = cells[3].id;
		
		var obj = new Object();
	    obj.description = description;
	    obj.allocation = allocation;
	    obj.startDate = startDate;
	    obj.endDate = endDate;
	    physicalResourcePreviousCell= JSON.stringify(obj);
		   
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
    
    $(document).on("click", ".copyHumanResource", function() {
    	var resourceIsActive = $(this).parents("tr").attr("resourceisactive");
		if(resourceIsActive != undefined && resourceIsActive  === "0") {
			alert("Resource is inactive. Only active resources can be copied.");
			return false;
		}
		let randomEmpId = Math.random().toString(36).substring(8);
		var startDateValidation = $("#pinStartDateId").val();
    	var endDateValidation = $("#pinEndDateId").val();	
		var copyActionHR = "<a class='add addHumanResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
				"<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
		        
		var row = $(this).closest('tr').html();
     	$('#humanResourceTable tbody').append('<tr id="'+randomEmpId+'" crchangestatus="Y" style="background-color:#ADD8E6">'+row+'</tr>');
     	
		var trVal = $("#"+randomEmpId)[0];
		var cells = trVal.getElementsByTagName("td");
		cells[6].innerText = startDateValidation;
		cells[6].id = startDateValidation;
		cells[7].innerText = endDateValidation;
		cells[7].id = endDateValidation;
		cells[8].innerHTML = copyActionHR;
     });
     
    $(document).on("click", ".copyPhysicalResource", function(){
		let randomEmpId = Math.random().toString(36).substring(8);
		var startDateValidation = $("#pinStartDateId").val();
    	var endDateValidation = $("#pinEndDateId").val();
		var copyActionPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
		        "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>" +
				"<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
		        
		var row = $(this).closest('tr').html();
     	$('#physicalResourceTable tbody').append('<tr id="'+randomEmpId+'" crchangestatus="Y" style="background-color:#ADD8E6">'+row+'</tr>');
     	
		var trVal = $("#"+randomEmpId)[0];
		var cells = trVal.getElementsByTagName("td");
		cells[2].innerText = startDateValidation;
		cells[2].id = startDateValidation;
		cells[3].innerText = endDateValidation;
		cells[3].id = endDateValidation;
		cells[4].innerHTML = copyActionPR;
     });    
     
});

/**
 * Fetch All Change Request data
 * @returns
 */
function fetchAllChangeReqList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/changeRequest/getAllCRList",
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
				$('#changeReqListSearchTable').show();
				drawTableChangeReqList(data);
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#changeReqListSearchTable').show();
			}
	});
}

/**
 * Display the Change Request data in table format using datatable
 * @param dataArray
 * @returns
 */
function drawTableChangeReqList(dataArray){
	var pageLengthVal = showEntriesPageLength("changeReqListSearchTable");
	$('#changeReqListSearchTable').html("");
	var resourceSearchTable = $('#changeReqListSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : pageLengthVal,
		"columnDefs": [{
			"className": 'hover',
			"defaultContent": "NA",
			"targets": "_all"
		}],			
	}).clear();

	for (var i = 0; i < dataArray.allChangeRequestDetails.length; i++) {
		var changeRequestHeaderId = dataArray.allChangeRequestDetails[i].changeRequestHeaderId;
		var changeRequestNo = dataArray.allChangeRequestDetails[i].changeRequestNo;
		var pinNo = dataArray.allChangeRequestDetails[i].pinNo;
		var projectName = dataArray.allChangeRequestDetails[i].projectName;
		var projectSponsorName = dataArray.allChangeRequestDetails[i].projectSponsorName;
		var projectManagerName = dataArray.allChangeRequestDetails[i].projectManagerName;
		var contractValue = dataArray.allChangeRequestDetails[i].contractValue;
		var startDate = dataArray.allChangeRequestDetails[i].startDate;
		var endDate = dataArray.allChangeRequestDetails[i].endDate;
		var crStatusDetail = dataArray.allChangeRequestDetails[i].crStatusDetail;
		var crStatus = dataArray.allChangeRequestDetails[i].crStatus;
		var pdfExist = dataArray.allChangeRequestDetails[i].pdfExist;
				
		var fn = "fetchChangeRequestDetails('"+changeRequestHeaderId+"')";
		var openPdfViewerFn = "openPdfViewer('"+pinNo+"', '"+changeRequestNo+"', 'CR')"; 
		var downloadPdf = "fetchPdf('"+pinNo+"', '"+changeRequestNo+"', 'CR', '"+changeRequestHeaderId+"', 'Y')";
		var editImg = '';
		if(crStatus === "A" && pdfExist === 'Y') {
			editImg= '<a title="View" onclick="'+openPdfViewerFn+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-eye" style="font-size: 20px;"></i></a>'+
			'&nbsp;&nbsp;&nbsp;'+
			'<a title="Download Pdf" onclick="'+downloadPdf+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-download" style="font-size: 22px;color:DodgerBlue;margin-top: 2px;"></i></a>';
		}else if (crStatus === "A" && pdfExist != 'Y') {
			editImg= '';
		} else if (crStatus === "C" && pdfExist === 'Y') {
			editImg= '<a title="View" onclick="'+openPdfViewerFn+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-eye" style="font-size: 20px;"></i></a>';
		} else if (crStatus === "C" && pdfExist != 'Y') {
			editImg= '';
		} else {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';
		}
		
		/*
		if(crStatus === "A" && pdfExist === 'Y') {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+openPdfViewerFn+'"/>'+
			'&nbsp;&nbsp;&nbsp;'+
			'<a title="Download Pdf" onclick="'+downloadPdf+'" style="vertical-align: inherit;cursor: pointer;">'+
			'<i class="fa fa-download" style="font-size: 22px;color:DodgerBlue;margin-top: 2px;"></i></a>';
		} else {
			editImg= '<img id="edit-prescription" src="images/edit.png" alt="Edit" class="table-action-item datatable-edit-img" onclick="'+fn+'"/>';
		}
		*/		
		resourceSearchTable.row.add([changeRequestNo, pinNo, projectName, projectSponsorName, projectManagerName, contractValue , startDate, endDate, crStatusDetail, editImg]);		
	}
	resourceSearchTable.draw();
}

function openPdfViewer(pinNo, changeRequestNo, type) {
	var pdfPageUrl = "https://"+$("#restApiUrlSession").val()+"/adminconsole/pdfReport.jsp?pinNo="+pinNo+"&crNo="+changeRequestNo+"&type="+type;
	window.open(pdfPageUrl);
}

/**
 * Function call on Add Change Request button click
 * @returns
 */
$(document).ready(function(){
	$('#addChangeReqBtnId').click(function(){  		
  		$("#changeReqListDiv").hide();
  		$("#createNewChgReqDivId").hide();
  		$("#selectPinDivId").show();
  		fetchAllPinNoList();
  		$("#changeRequestFormId")[0].reset();
  		humanResourceError = false;
  		physicalResourceError = false;
  		changeReasonDisable = false;
	});
});


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


function fetchChangeReasonList(param, arrayObj, status) {	
	$('#changeReasonSelect').find('option').remove();
	$.ajax({
		url: apiContxtPin+ "/resource/common/getChangeReasonList",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"createdRoleName": $("#sessionUserRole").val()
		}),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			if (jQuery.isEmptyObject(data)) {
				alertify.alert("No Data Found!");							
			} else {
				$.each(data.allChangeReasonDetails, function (i, option) {								
					  var $option = $("<option>", {
	                        text: option.changeReasonName,
	                        value: option.changeReasonId
	                    })
		                $option.appendTo('#changeReasonSelect');
				});
				$('#changeReasonSelect').multiselect({
		  		    columns: 1,
		  		    placeholder: 'Select Change Reason',
		  		    search: true,
		  		    selectAll: true
		  		});
				 $('#changeReasonSelect').multiselect('reload');
				 if(param == "EDIT") {
					 for (var i = 0; i < arrayObj.length; i++) {
							$("#changeReasonSelect").find("option[value="+arrayObj[i]+"]").prop("selected", "selected").prop("readonly", true);    	
					}
					$('#changeReasonSelect').multiselect('reload');
					userRole = $("#sessionUserRole").val();
					if((userRole === "PM" && status === "D") || (userRole === "DH" && status === "I")) {
						updateResourceBasedOnChgReason();
					}	
				 }
			}
			if(changeReasonDisable == true) {
				 $("#selectedItem").prop("disabled", true);
			}
			$("#loader").hide();
		},
		error: function () {
			alertify.alert("An error has occurred!!!");
		}
	});	
}

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
			$("#changeReqListDiv").hide();
			$("#createNewChgReqDivId").show();
			setupAccordion();
			setAriaExpanded("buttonOne");
		    populatePinDetails(data, "ADD");
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});		
}

function fetchChangeRequestDetails(changeRequestHeaderId) {
	$.ajax({
		url: apiContxtPin+ "/resource/changeRequest/getCRDetails",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify({ 
				"changeRequestHeaderId": changeRequestHeaderId
			}),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$("#changeReqListDiv").hide();
				$("#selectPinDivId").hide();
				$("#createNewChgReqDivId").show();
				setupAccordion();
				setAriaExpanded("buttonOne");
			    populatePinDetails(data, "EDIT");
			},
			error: function () {
				alertify.alert(FAILURE_MSG);
				$('#pinListSearchTable').show();
			}
		});
}

function populatePinDetails(dataArray, param) {	
	$("#pinHeaderId").val(dataArray.pinHeaderId);
	$("#pinNumberId").val(dataArray.pinNo);	
	$("#projectTypeId").val(dataArray.projectTypeCode);
	$("#projectCategoryId").val(dataArray.projectCaragoryCode);
	fetchCustomerLocationList(dataArray.customerCode);
	$("#projectNameId").val(dataArray.projectName);
	$("#sponsorNameId").val(dataArray.projectSponsorName);
	fetchResourceList("Manager", "managerId", dataArray.projectManagerId);
	$("#existingPinStartDateId").val(dataArray.pinStartDate);
	$("#existingPinEndDateId").val(dataArray.pinEndDate);
	$("#revisedEndDateId").val(typeof dataArray.revisedEndDate === 'undefined' ? dataArray.pinEndDate : dataArray.revisedEndDate);
	$("#deliveryOrgId").val(dataArray.sourceName);
	
	if(param === "EDIT") {
		$("#changeRequestHeaderId").val(dataArray.changeRequestHeaderId);
		$("#pinStartDateId").val(dataArray.startDate);
		$("#pinEndDateId").val(dataArray.endDate);
		$("#contractValueId").val(dataArray.contractValue);
		$("#changeDescId").val(dataArray.changeDescription);
		
		//TODO
		//$("#changeReasonSelect").val()
		
		$("#effortImpactId").val(dataArray.effortImpact);
		$("#scopeImpactId").val(dataArray.scopeImpact);
		$("#timeLineImpactId").val(dataArray.timeLineImpact);
		$("#costImpactId").val(dataArray.costImpact);
		$("#userInterfaceId").val(dataArray.techChangeUserInterface);
		$("#designId").val(dataArray.techChangeDesign);
		$("#databaseId").val(dataArray.techChangeDatabase);
		$("#algorithmId").val(dataArray.techChangeAlgoritham);
		$("#risksId").val(dataArray.risk);
		$("#risksMitigationPlanId").val(dataArray.riskMitigationPlan);
		
		var reasonForChangeArray = dataArray.reasonForChange;
		var myArr = JSON.parse(reasonForChangeArray);
		fetchChangeReasonList("EDIT", myArr, dataArray.crStatus);
	} else {
		fetchChangeReasonList("ADD", "", dataArray.crStatus);
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
			    "<a class='edit editHumanResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>"+
			    "<a class='copy copyHumanResource' title='Copy' data-toggle='tooltip'><i class='material-icons'>&#xE14D;</i></a>";
				//+"<a class='delete deleteHumanResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			} else {
				actionsHR = "";
			}
			var backgroundColor = "#FFFFFF";
			var crchangestatus= "";
			if(dataArray.pinDetails[i].crChangeStatus === "M") {
				backgroundColor = "#C1E1C1";
				crchangestatus = "Y";
			} else {
				backgroundColor = "#FFFFFF";
				crchangestatus = "N";
			}
			var hrTableMainTr = "";
			if(dataArray.pinDetails[i].resourseIsActive === 0 || dataArray.pinDetails[i].resourseIsActive === "0" ) {
				hrTableMainTr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+" resourceisactive="+dataArray.pinDetails[i].resourseIsActive+" resoursespdate="+dataArray.pinDetails[i].resourseSparationDate+" crchangestatus="+crchangestatus+" style='background-color:"+backgroundColor+"'>";
			} else {
				hrTableMainTr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+" resourceisactive="+dataArray.pinDetails[i].resourseIsActive+" crchangestatus="+crchangestatus+" style='background-color:"+backgroundColor+"'>";
			}
			
			 
			
			
			//hrTableStr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+" resourceisactive="+dataArray.pinDetails[i].resourseIsActive+" crchangestatus="+crchangestatus+" style='background-color:"+backgroundColor+"'>" +
			hrTableStr = hrTableMainTr +
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
		} else if (dataArray.pinDetails[i].pinResourceType === "PR") {
			if(dataArray.pinDetails[i].isActive === 1) {
				actionsPR = "<a class='add addPhysicalResource' title='Add' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a>" +
			    "<a class='edit editPhysicalResource' title='Edit' data-toggle='tooltip'><i class='material-icons'>&#xE254;</i></a>"+
			    "<a class='copy copyPhysicalResource' title='Copy' data-toggle='tooltip'><i class='material-icons'>&#xE14D;</i></a>";
				//+"<a class='delete deletePhysicalResource' title='Delete' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a>";
			} else {
				actionsPR = "";
			}
			var backgroundColor = "#FFFFFF";
			var crchangestatus= "";
			if(dataArray.pinDetails[i].crChangeStatus === "M") {
				backgroundColor = "#C1E1C1";
				crchangestatus = "Y";
			} else {
				backgroundColor = "#FFFFFF";
				crchangestatus = "N";
			}
			prTableStr = "<tr id="+srandomid+" title="+dataArray.pinDetails[i].pinDetailsId+" isActive="+dataArray.pinDetails[i].isActive+" crchangestatus="+crchangestatus+" style='background-color:"+backgroundColor+"'>" +
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
	
	if(param === "ADD") {		
		makeAllFieldEditable("ADD");
		makeResourceNonEditable();
	} else {
		populateFormByRoleAndStatus($("#sessionUserRole").val(), dataArray.crStatus);
	}
}

function makeResourceNonEditable() {
	$("#addHumanResourceBtn").attr("disabled", true);
	$("#addPhysicalResourceBtn").attr("disabled", true);
	$(".editHumanResource").addClass('button-disabled');
	$(".deleteHumanResource").addClass('button-disabled');
	$(".editPhysicalResource").addClass('button-disabled');
	$(".deletePhysicalResource").addClass('button-disabled');
	$(".copyHumanResource").addClass('button-disabled');
	$(".copyPhysicalResource").addClass('button-disabled');
}

function enableEditResource() {
	$("#addHumanResourceBtn").attr("disabled", true);
	$("#addPhysicalResourceBtn").attr("disabled", true);
	$(".editHumanResource").removeClass('button-disabled');
	$(".deleteHumanResource").removeClass('button-disabled');
	$(".editPhysicalResource").removeClass('button-disabled');
	$(".deletePhysicalResource").removeClass('button-disabled');
}


function enableAddEditResource() {
	$("#addHumanResourceBtn").attr("disabled", false);
	$("#addPhysicalResourceBtn").attr("disabled", false);
	$(".editHumanResource").removeClass('button-disabled');
	$(".deleteHumanResource").removeClass('button-disabled');
	$(".editPhysicalResource").removeClass('button-disabled');
	$(".deletePhysicalResource").removeClass('button-disabled');
	$(".copyHumanResource").removeClass('button-disabled');
	$(".copyPhysicalResource").removeClass('button-disabled');
}


$("#changeReasonSelect").change(function() {
	var changeReasonObj = $("#changeReasonSelect").val();
	if(changeReasonObj.length  === 0) {
		addEditResourceSelectHR = false;
		addEditResourceSelectPR = false;
		makeResourceNonEditable();
	} else {
		updateResourceBasedOnChgReason();	
	}	
});

function updateResourceBasedOnChgReason() {
		if($('#changeReasonSelect').val().length == 0) {
			addEditResourceSelectHR = false;
			addEditResourceSelectPR = false;
			makeResourceNonEditable();
			$("#managerId").attr("disabled", true);
		} else {
			 var changeReasonSelection = $('#changeReasonSelect option:selected').toArray().map(item => item.text).join();
			 if(changeReasonSelection.indexOf("Add and Edit Resource") !== -1){
				 addEditResourceSelectHR = true;
				 addEditResourceSelectPR = true;
				 enableAddEditResource();
			  } else if(changeReasonSelection.indexOf("Release Resource") !== -1){
				 enableEditResource();
			  } else {
				  addEditResourceSelectHR = false;
					addEditResourceSelectPR = false;
					makeResourceNonEditable();
			  }
			 if(changeReasonSelection.indexOf("Manager Change") !== -1){
				 $("#managerId").attr("disabled", false);
			 } else {
				 $("#managerId").attr("disabled", true);
			 }
		}
}

function saveChangeRequest() {
	if(validateCRDetails()) {
		var resourceJson = prepareResourceJson();
		//var commentJson = prepareCommentJson();
		var todaysDate = (new Date()).toISOString().split('T')[0];	
		var json = {
			  pinHeaderId : $("#pinHeaderId").val(),
			  pinNo : $("#pinNumberId").val(),
			  startDate : $("#pinStartDateId").val(),
			  endDate : $("#pinEndDateId").val(),
			  changeDescription : $("#changeDescId").val(),
			  projectManagerId : $("#managerId option:selected").val(),
		      projectManagerName : $("#managerId option:selected").text(),
			  effortImpact : $("#effortImpactId").val(),
			  scopeImpact : $("#scopeImpactId").val(),
			  timeLineImpact : $("#timeLineImpactId").val(),
			  costImpact : $("#costImpactId").val(),
			  reasonForChange: $("#changeReasonSelect").val(),
			  techChangeUserInterface : $("#userInterfaceId").val(),
			  techChangeDesign : $("#designId").val(),
			  techChangeDatabase : $("#databaseId").val(),
			  techChangeAlgoritham : $("#algorithmId").val(),
			  risk : $("#risksId").val(),
			  riskMitigationPlan : $("#risksMitigationPlanId").val(),
			  contractValue : $("#contractValueId").val(),
			  createdRoleId : $("#sessionUserRoleId").val(),
			  createdBy : $("#sessionUsername").val(),
			  isActive : "1",
		      
			  pinCommentsDetails: [
		    	  {	      
		            roleId : $("#sessionUserRoleId").val(),
		            roleName : $("#sessionUserRole").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinHeaderId : $("#pinHeaderId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ],
		     pinDetails: resourceJson
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/changeRequest/createCR",
			type: "POST",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify(json),
			dataType: "json",
			traditional: true,
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				$("#loader").hide();
				/*successMsg = data.message;*/
				if(data.message) {
					successMsg = data.message;
					if(data.status != 'failure') {
						if(data.emailSuccess){
							backToCRList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+`And Email sent successfully`+"!</p>");
						}else{
							backToCRList();
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

function prepareCommentJson() {
	var commentObj = [];
	$("#commentTable tr").each(function (index) {
		var item = {};
		if(index > 0) {
			  var self = $(this);
			  item ["pinCommentsId"] = self.find("td:eq(3)").text();
			  item ["pinHeaderId"] = self.find("td:eq(4)").text();
			  item ["roleId"] = self.find("td:eq(5)").text();
			  item ["roleName"] = self.find("td:eq(1)").text();
			  item ["pinCmments"] = self.find("td:eq(0)").text();
			  item ["pinCommentsDate"] = self.find("td:eq(2)").text();
			  item ["isActive"] = self.find("td:eq(6)").text();
			  commentObj.push(item);
		}
	});
	var todaysDate = (new Date()).toISOString().split('T')[0];
	var item = {}; 	
	item ["roleId"] = $("#sessionUserRoleId").val();
	item ["roleName"] = $("#sessionUserRole").val();
	item ["pinCmments"] = $("#pinCommentsId").val();
	item ["pinCommentsDate"] = todaysDate;
	item ["isActive"] = "1";
	commentObj.push(item);
	
	return commentObj;
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
	        if(self.attr("crChangeStatus") != undefined) {
	        	item ["crChangeStatus"] = self.attr("crChangeStatus");	        	
	        } else {
				item ["crChangeStatus"] = "N";	 
			}	        
	        item ["pinHeaderId"] = $("#pinHeaderId").val();
	        item ["pinNo"] =  $("#pinNumberId").val();
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
	        if(self.attr("crChangeStatus") != undefined) {
	        	item ["crChangeStatus"] = self.attr("crChangeStatus");	        	
	        } else {
				item ["crChangeStatus"] = "N";	 
			}
	        item ["pinHeaderId"] = $("#pinHeaderId").val();
	        item ["pinNo"] =  $("#pinNumberId").val();
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

function validateCRDetails() {
	var pinStartDate = $("#pinStartDateId").val();
	var pinEndDate = $("#pinEndDateId").val();	
	var contractValue = $("#contractValueId").val();
	var changeDesc = $("#changeDescId").val();
	var changeReason = $("#changeReasonSelect").val();
	var pinComments = $("#pinCommentsId").val();
	var humanResourceTbody = $("#humanResourceTable tbody");
	var physicalResourceTbody = $("#physicalResourceTable tbody");
	var existingPinStartDate = $("#existingPinStartDateId").val();
	var existingPinEndDate = $("#existingPinEndDateId").val();
	
	var errorDiv = $("#addCRErrorDiv");
	
	if (pinStartDate  === "") {     
		errorDiv.empty().append("Please enter valid Change Request Start Date");
		setAriaExpanded("buttonOne");
	    return false;
	} else if ($("#pinStartDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid Change Request Start Date");
    	setAriaExpanded("buttonOne");
    	return false;
    } else if((Date.parse(pinStartDate) < Date.parse(existingPinStartDate))) {
    	errorDiv.empty().append("Change Request Start Date should be greater than or equal to Pin Start Date");
   	 	$("#pinEndDateId").val("");
        setAriaExpanded("buttonOne");
       return false;
   } else if (pinEndDate  === "") {     
		errorDiv.empty().append("Please enter valid Change Request End Date");
		setAriaExpanded("buttonOne");
	    return false;
	} else if ($("#pinEndDateId")[0].validationMessage != "") {
    	errorDiv.empty().append("Please enter valid Change Request End Date");
    	setAriaExpanded("buttonOne");
    	return false;
    } else if ((Date.parse(pinEndDate) < Date.parse(pinStartDate))) {
    	errorDiv.empty().append("Change Request End Date should be greater than or equal to Change Request Start Date");   	
        $("#pinEndDateId").val("");
        setAriaExpanded("buttonOne");
        return false;
    } /*else if(!dateRangeCheck(existingPinStartDate, existingPinEndDate, pinStartDate)) {
    	errorDiv.empty().append("Change Request Start date should be between Pin  Start date and Pin End Date");
    	$("#pinStartDateId").val("");
    	setAriaExpanded("buttonOne");
        return false;
    }*/
    else if((Date.parse(pinEndDate) < Date.parse(existingPinStartDate))) {
    	errorDiv.empty().append("Change Request End Date should be greater than or equal to Pin Start Date");
    	 $("#pinEndDateId").val("");
         setAriaExpanded("buttonOne");
        return false;
    } else if (contractValue  === "") {     
		errorDiv.empty().append("Please enter valid Contract Value");
		setAriaExpanded("buttonOne");
	    return false;
	} else if (changeReason.length  === 0) {
		errorDiv.empty().append("Please select Change Reason");
		setAriaExpanded("buttonOne");
        return false;
    } else if (changeDesc  === "") {     
		errorDiv.empty().append("Please enter Change Description");
		setAriaExpanded("buttonTwo");
	    return false;
	}  else if (pinComments  === "") {     
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


function approveChangeRequest() {
	approvalStatus = "Approve";
	callUpdateChangeRequest();
}

function rejectChangeRequest() {
	approvalStatus = "Reject";
	callUpdateChangeRequest();
}
function updateChangeRequest() {
	approvalStatus = "";
	callUpdateChangeRequest();
}

function callUpdateChangeRequest() {
	chgReasonJsonObj = [];
	var array = $('#changeReasonSelect').val();	
	$.each(array,function(i){
		chgReasonJsonObj.push(array[i]);		
	});
	
	if(validateCRDetails()) {
		var resourceJson = prepareResourceJson();
		var todaysDate = (new Date()).toISOString().split('T')[0];	
		var json = {
			  changeRequestHeaderId : $("#changeRequestHeaderId").val(),
			  pinHeaderId : $("#pinHeaderId").val(),
			  pinNo : $("#pinNumberId").val(),
			  startDate : $("#pinStartDateId").val(),
			  endDate : $("#pinEndDateId").val(),
			  changeDescription : $("#changeDescId").val(),
			  projectManagerId : $("#managerId option:selected").val(),
		      projectManagerName : $("#managerId option:selected").text(),
			  effortImpact : $("#effortImpactId").val(),
			  scopeImpact : $("#scopeImpactId").val(),
			  timeLineImpact : $("#timeLineImpactId").val(),
			  costImpact : $("#costImpactId").val(),
			  reasonForChange: chgReasonJsonObj,
			  techChangeUserInterface : $("#userInterfaceId").val(),
			  techChangeDesign : $("#designId").val(),
			  techChangeDatabase : $("#databaseId").val(),
			  techChangeAlgoritham : $("#algorithmId").val(),
			  risk : $("#risksId").val(),
			  riskMitigationPlan : $("#risksMitigationPlanId").val(),
			  contractValue : $("#contractValueId").val(),
			  createdRoleId : $("#sessionUserRoleId").val(),
			  modifiedBy : $("#sessionUsername").val(),
			  isActive : "1",
			  approvalStatus : approvalStatus,
			  pinCommentsDetails: [
		    	  {	      
		            roleId : $("#sessionUserRoleId").val(),
		            roleName : $("#sessionUserRole").val(),
		            pinCmments : $("#pinCommentsId").val(),
		            pinHeaderId : $("#pinHeaderId").val(),
		            pinNo : $("#pinNumberId").val(),
		            pinCommentsDate : todaysDate,
		            isActive :"1"
		        }
		     ],
		     pinDetails: resourceJson
		}
		$("#loader").show();
		$.ajax({
			url: apiContxtPin+"/resource/changeRequest/updateCR",
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
							backToCRList();
							alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+`And Email sent successfully`+"!</p>");
						}else{
							backToCRList();
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

function populateFormByRoleAndStatus(role, status) {
	if (role === "DH" || role === "PMO" || role === "PM"){
		if(status === "A") {
			makeAllFieldDisabled();
		} else if(role === "PM") {
			if(status === "D") {			
				makeAllFieldEditable("EDIT");
			}	
		} else if(role === "DH") {
			if(status === "D") {
				approveOrRejectWithComment();
			} else if(status === "I") {
				makeAllFieldEditable("EDIT");
			} else if(status === "A" || status === "R" ) {
				makeAllFieldDisabled();
			}
		} else if(role === "PMO") {
			if(status === "I" ) {
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

function makeAllFieldEditable(param) {
	$("#changeRequestFormId :input").attr("disabled", false);
	if(param == "ADD") {
		$("#approveRejectButtonDiv").hide();	
		$("#updateCRBtnId").hide();	
		$("#submmitButtonDiv").show();
		$("#saveCRBtnId").show();
	} else {
		$("#submmitButtonDiv").show();
		$("#approveRejectButtonDiv").hide();
		$("#saveCRBtnId").hide();
		$("#updateCRBtnId").show();
	}
	$("#addHumanResourceBtn").attr("disabled", false);
	$("#addPhysicalResourceBtn").attr("disabled", false);
	$(".editHumanResource").removeClass('button-disabled');
	$(".deleteHumanResource").removeClass('button-disabled');
	$(".editPhysicalResource").removeClass('button-disabled');
	$(".deletePhysicalResource").removeClass('button-disabled');
	$(".copyHumanResource").removeClass('button-disabled');
	$(".copyPhysicalResource").removeClass('button-disabled');
	changeReasonDisable = false;
	$("#selectedItem").prop("disabled", false);	
	disableFieldForCR();
}

function makeAllFieldDisabled() {
	$("#changeRequestFormId :input").attr("disabled", true);
	enableAccordianButton();
	$("#submmitButtonDiv").show();
	$("#approveRejectButtonDiv").hide();
	$("#saveCRBtnId").hide();
	$("#updateCRBtnId").hide();
	
	$("#addHumanResourceBtn").attr("disabled", true);
	$("#addPhysicalResourceBtn").attr("disabled", true);
	$(".editHumanResource").addClass('button-disabled');
	$(".deleteHumanResource").addClass('button-disabled');
	$(".editPhysicalResource").addClass('button-disabled');
	$(".deletePhysicalResource").addClass('button-disabled');
	$(".copyHumanResource").addClass('button-disabled');
	$(".copyPhysicalResource").addClass('button-disabled');
	changeReasonDisable = true;
	$("#selectedItem").prop("disabled", true);	
}

function approveOrRejectWithComment() {
	$("#changeRequestFormId :input").attr("disabled", true);
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
	$(".copyHumanResource").addClass('button-disabled');
	$(".copyPhysicalResource").addClass('button-disabled');
	changeReasonDisable = true;
	$("#selectedItem").prop("disabled", true);	
	disableFieldForCR();
}

function disableFieldForCR() {
	$("#projectTypeId").attr("disabled", true);
	$("#projectCategoryId").attr("disabled", true);
	$("#customerId").attr("disabled", true);
	$("#projectNameId").attr("disabled", true);
	$("#sponsorNameId").attr("disabled", true);
	$("#managerId").attr("disabled", true);
	$("#existingPinStartDateId").attr("disabled", true);
	$("#existingPinEndDateId").attr("disabled", true);
	$("#revisedEndDateId").attr("disabled", true);
	$("#deliveryOrgId").attr("disabled", true);
}

function createPdfForLastCR(pinNo, changeRequestNo, type, crHeaderId) {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/changeRequest/createCRPdf",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinNo": pinNo,
			"changeRequestNo": changeRequestNo,
			"changeRequestHeaderId": crHeaderId
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