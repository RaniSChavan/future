<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>

<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.4.1/css/buttons.dataTables.min.css">
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.4.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.html5.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.4.1/js/buttons.print.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/vfs_fonts.js"></script>

</head>

<%-- 	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><a href="?target="<%=targetUrl%>">Home</a></li>
	        <li class="breadcrumb-item active"><b>Resource Allocation Report</b></li>
	    </ol>
    </nav> --%>

<div class="container container-background">
	<div class="main-wrap-div">
		<div class="row form-group">
			<div class="col-md-6"><p class="main-wrap-header">Resource Billable Report</p></div>
		</div>
		<div class="error-messages-scroll" id="reportErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
		<div class="form-group row">
		<div class="col-sm-1"></div>
		   <label for="resource" class="col-sm-1 col-form-label">PIN*</label>
		   <div class="col-sm-4">
		     <select class="form-control" name="pinSelect[]" multiple id="pinSelect"></select>
		  </div>
		   
		</div>
		
		<div class="form-group row">
		<div class="col-sm-1"></div>	   
		 <label for="month" class="col-sm-1 col-form-label">Month*</label>
		   <div class="col-sm-4">
		   <select class="form-control" id="monthSelect">
				<option value='0'>Select Month</option>
			</select>
		   </div>
		   
		   <label for="year" class="col-sm-1 col-form-label">Year*</label>
		   <div class="col-sm-4">
		     <select class="form-control" id="yearSelect">
				<option value='0'>Select Year</option>
			</select>
		  </div>
		</div>
		
		<div class="form-group row">
		<div class="col-sm-1"></div>
		   <label for="resource" class="col-sm-1 col-form-label">No Of Working Days*</label>
		   <div class="col-sm-4">
		     <input type="number" class="form-control" 
		     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
		     maxlength="2" id="workingDaysId" placeholder="No Of Working Days"/>
		  </div>
		   
		 <label for="status" class="col-sm-1 col-form-label">No Of Holidays*</label>
		   <div class="col-sm-4">
	        <input type="number" class="form-control" 
	        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
	        maxlength="1" id="holidaysId" placeholder="No Of Holidays"/>
		   </div>
		</div>
		<br><br>
		<div class="form-group row">
			<button type="submit" class="btn btn-primary" onclick="populateBillableReport()" style="margin-left: auto; margin-right: auto;">Search</button>
		</div>
   </div>
   
	<div class="main-wrap-div" id="allocationReportDiv" style="display: none;">
		<div class="row">
		<div class="form-group col-md-12 responsive-table" id="allocationReportSearchDiv">
			<table id="allocationReportSearchTable" class="table table-striped table-bordered display " style="width:100%">
				<thead>
					<tr>	
						<th>PIN No</th>
						<th>Resource Id</th>			
						<th>Resource Name</th>
						<th>Role Name</th>
						<th>Allocation</th>
						<th>Resource Separation Date</th>
						<th id="allocationMonthId"></th>
						<th id="monthWiseAllocationHourId"></th>
						<th>Resource Hourly Rate</th>
						<th>Actual Cost</th>
					</tr>
				</thead>
				<tbody>		
				</tbody>			
			</table>
		</div>
		</div>
	</div>
	

  </div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="js/billableReport.js" type='text/javascript'></script>