var apiContxtPin = "/pin-webservice";

var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var FAILURE_STRUCTURE = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>";

$(document).ready(function () {
	fetchAllPinNoList();
	populateMonth();
	populateYear();
});


function fetchAllPinNoList(){	
	$.ajax({
		url: apiContxtPin+ "/resource/common/getAllActivePinList",
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
					$.each(data.allPinNoDetails, function (i, option) {								
						  var $option = $("<option>", {
		                        text: option.pinNo+'-'+option.projectName,
		                        value: option.pinNo
		                    })
			                $option.appendTo('#pinSelect');
					});
					$('#pinSelect').multiselect({
			  		    columns: 1,
			  		    placeholder: 'Select PIN',
			  		    search: true,
			  		    selectAll: true
			  		});
					 $('#pinSelect').multiselect('reload');				 
				}
				$("#loader").hide();	
			},			
			error: function () {
				alertify.alert(FAILURE_MSG);
			}
		});
}

function populateMonth() {
	$('#monthSelect').append('<option value="1">January</option>');
	$('#monthSelect').append('<option value="2">February</option>');
	$('#monthSelect').append('<option value="3">March</option>');
	$('#monthSelect').append('<option value="4">April</option>');
	$('#monthSelect').append('<option value="5">May</option>');
	$('#monthSelect').append('<option value="6">June</option>');
	$('#monthSelect').append('<option value="7">July</option>');
	$('#monthSelect').append('<option value="8">August</option>');
	$('#monthSelect').append('<option value="9">September</option>');
	$('#monthSelect').append('<option value="10">October</option>');
	$('#monthSelect').append('<option value="11">November</option>');
	$('#monthSelect').append('<option value="12">December</option>');
}

function populateYear() {
	for (var i = 2019; i <= 2030; i++) {
            $('#yearSelect').append($('<option />').val(i).html(i));
        }
}

function populateBillableReport() {
 if(validateSearchCriteria()) {
	$("#reportErrorDiv").empty();
	$("#loader").show();
	$("#allocationMonthId").text($("#monthSelect option:selected").text()+" Allocation");
	$("#monthWiseAllocationHourId").text("Total hour in "+$("#monthSelect option:selected").text());	
	var pinSelect =  $("#pinSelect option:selected").map(function(){return this.value}).get().join(',');
	$.ajax({
		url: apiContxtPin+ "/resource/common/getBillableReport",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"pinNo": pinSelect,
			"allocationMonth": $("#monthSelect").val(),
			"allocationYear": $("#yearSelect").val(),
			"workingDay": $("#workingDaysId").val(),
			"holyDay": $("#holidaysId").val()
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
				drawBillableReportTable(data);				
			}								
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});	
 }
}

function drawBillableReportTable(dataArray) {
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
	     			title: 'Billable Report',
				    autoFilter: true,
					sheetName: "BillableReport"
					/*"exportOptions": {
				        "format": {
				          "header": function(content, index) {
				            // Here 2 is the index of the column whose header name we want to change(0 based)
				            return index === 2 ? "Gender" : content;
				          }
				        }
				      }*/
	                //messageTop: 'Pending Account Information Report'
	                //messageBottom: 'Total Amount:     ' + total_amount 
	            }
	          ]		
		}).clear();
		
		if(!dataArray.error) {
			for (var i = 0; i < dataArray.allResourceCostDetails.length; i++) {
				var pinNo = dataArray.allResourceCostDetails[i].pinNo;
				var resourseId = dataArray.allResourceCostDetails[i].resourseId;
				var resourseName = dataArray.allResourceCostDetails[i].resourseName;			
				var roleName = dataArray.allResourceCostDetails[i].roleName;
				var allocation = dataArray.allResourceCostDetails[i].allocation;
				var resourseSparationDate = dataArray.allResourceCostDetails[i].resourseSparationDate;
				var allocationReportedMonth = dataArray.allResourceCostDetails[i].allocationReportedMonth;
				var monthWiseHourlyAllocation = dataArray.allResourceCostDetails[i].monthWiseHourlyAllocationt;
				var resourseHourlyRate = dataArray.allResourceCostDetails[i].resourseHourlyRate;
				var actualCost = dataArray.allResourceCostDetails[i].actualCost;
				
				resourceReportTable.row.add([pinNo, resourseId, resourseName, roleName, allocation, resourseSparationDate, 
										allocationReportedMonth, monthWiseHourlyAllocation, resourseHourlyRate, actualCost]);		
			}
		}
		resourceReportTable.draw();
	//}
}

function validateSearchCriteria() {
	var pinSelect = $("#pinSelect").val();
	var month = $("#monthSelect").val();
	var workingDays = $("#workingDaysId").val();
	var holidays = $("#holidaysId").val();
	var errorDiv = $("#reportErrorDiv");
	
	
	if (pinSelect.length  === 0) {
		errorDiv.empty().append("Please select Pin");     
        return false;
    } else if (month  === "0") {     
		errorDiv.empty().append("Please select Month");
	    return false;
	} else if (workingDays  === "") {     
		errorDiv.empty().append("Please select No of Working Days");
	    return false;
	} else if (holidays  === "") {     
		errorDiv.empty().append("Please select No of Holidays");
	    return false;
	}
	return true;
}

/************************************************** */
var columnsName = [];


function populateAllocationReport() {
	$("#loader").show();
	$.ajax({
		url: apiContxtPin+ "/resource/common/getResourceAllocationList",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify({ 
			"resourseId":"ALL",
			"isActive":"ALL"
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
	$.each( dataArray.allPinNoDetails[0], function( key, value ) {
			var my_item = {};
			my_item.data = key;
			my_item.title = key;
			columnsName.push(my_item);
	});
	$('#allocationReportDiv').show();
	$('#allocationReportSearchTable').DataTable({
		destroy: true,	
		responsive: true,
		pageLength : 10,
	    data: dataArray.allPinNoDetails,
	    "columns": columnsName,
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
	  });
}