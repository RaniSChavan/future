<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

</body>
</html><head>
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
			<div class="col-md-6"><p class="main-wrap-header">Resource List Report</p></div>
		</div>
		<div class="error-messages-scroll" id="reportErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
		<div class="form-group row">
		<div class="col-sm-1"></div>
		   <label for="inputResourceType" class="col-sm-1 col-form-label">Resource Type*</label>
		   <div class="col-sm-4">
	       <select class="form-control" name="resourceType" id="resourceTypeId">
			  <option value="">Select</option>
			  <option value="ALL">ALL</option>
			  <option value="Employee">Employee</option>
			  <option value="FullTimeConsultant">Full time Consultant</option>
			  <option value="Intern">Intern</option>
			  <option value="PartTimeConsultant">Part time Consultant</option>		
			  <option value="Subcontractor">Subcontractor</option>			  
			</select>
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
			<button type="submit" class="btn btn-primary" onclick="populateResourceListReport()" style="margin-left: auto; margin-right: auto;">Search</button>
		</div>
   </div>
   
	<div class="main-wrap-div" id="allocationReportDiv" style="display: none;">
		<div class="row">
		<div class="form-group col-md-12 responsive-table" id="allocationReportSearchDiv">
			<table id="allocationReportSearchTable" class="table table-striped table-bordered display " style="width:100%">
				<thead>
					<tr>						
						<th>RESOURCE NAME</th>
						<th>RESOURCE EMAIL ID</th>
						<th>RESOURCE SOURCE COMPANY</th>
						<th>RESOURCE DESIGNATION</th>
						<th>RESOURCE GRADE</th>
						<th>RESOURCE JOINING DT</th>
						<th>RESOURCE SEPERATION DT</th>
						<th>RESOURCE MANAGER NAME</th>
						<th>RESOURCE EMPID</th>
						<th>RESOURCE TYPE</th>
						<th>RESOURCE SUBCONTRACT COMPANY NAME</th>
					</tr>
				</thead>
				<tbody style="word-wrap: break-word;">		
				</tbody>			
			</table>
		</div>
		</div>
	</div>
	</div>


<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="js/resourceListReport.js" type='text/javascript'></script>