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
<%
/* String role = session.getAttribute("role").toString();
String targetUrl = null;
if(role.equals("corporate")) {
	targetUrl = "employeeDependent";
} else {
	targetUrl = "customerMaster";
} */
String targetUrl = null;
%>

<%-- 	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><a href="?target="<%=targetUrl%>">Home</a></li>
	        <li class="breadcrumb-item active"><b>Resource Allocation Report</b></li>
	    </ol>
    </nav> --%>

<div class="container container-background">
	<div class="main-wrap-div">
		<div class="row form-group">
			<div class="col-md-6"><p class="main-wrap-header">Resource Allocation Report</p></div>
		</div>
		<div class="error-messages-scroll" id="reportErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
		<div class="form-group row">
		<div class="col-sm-1"></div>
		   <label for="resource" class="col-sm-1 col-form-label">Resource*</label>
		   <div class="col-sm-4">
		     <select class="form-control" name="resource" id="resourceId"></select>
		  </div>
		   
		 <label for="status" class="col-sm-1 col-form-label">Status*</label>
		   <div class="col-sm-4">
	        <select class="form-control" name="status" id="statusId">
		  		<option value="">Select</option>
		  		<option value="ALL">ALL</option>
		  		<option value="1">Active</option>
		 		<option value="0">Inactive</option>
			 </select>
		   </div>
		</div>
		<br><br>
		<div class="form-group row">
			<button type="submit" class="btn btn-primary" onclick="populateAllocationReport()" style="margin-left: auto; margin-right: auto;">Search</button>
		</div>
   </div>
   
	<div class="main-wrap-div" id="allocationReportDiv" style="display: none;">
		<div class="row">
		<div class="form-group col-md-12 responsive-table" id="allocationReportSearchDiv">
			<table id="allocationReportSearchTable" class="table table-striped table-bordered display " style="width:100%">
				<thead>
					<tr>						
						<th>Resource Name</th>
						<th>Employee Id</th>
						<th>PIN No</th>
						<th>CR No</th>
						<th>Project Name</th>
						<th>Project Sponsor Name</th>
						<th>Allocation Start Date</th>
						<th>Allocation End Date</th>
						<th>Allocation</th>
						<th>Status</th>
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

<script src="js/resourceAllocationReport.js" type='text/javascript'></script>