<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.text.DateFormat"%>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>

</head>
<%
Date date = Calendar.getInstance().getTime();
DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
String strDate = dateFormat.format(date);

Calendar c = Calendar.getInstance();
c.setTime(date);
c.add(Calendar.YEAR, 10);
Date futureDate = c.getTime();
String strFutureDate = dateFormat.format(futureDate);
%>

<div class="container container-background" id="vendorListDiv">
<div class="main-wrap-div">
<div class="row form-group">
<div class="col-md-12">
<nav>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><b>Master Screen</b></li>
        <li class="breadcrumb-item active"><b>Vendor Master</b></li>
    </ol>
</nav>
</div>
</div>
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Vendor Master</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="addVendorBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Add Vendor
					</button>
			</div>
		</div>

	<div class="row">
		<div class="form-group col-md-12 responsive-table" id="vendorListSearchTableDiv">
			<table id="vendorListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Vendor Name</th>					
						<th>Vendor Code</th>	
						<th>Contact Person Name</th>
						<th>Contact Person Phone No</th>
						<th>Contact Person Email Id</th>
						<th>Vendor Status</th>
						<th width="10%">Action</th>
					</tr>
				</thead>
				<tbody>
				
				</tbody>			
			</table>
		</div>
	</div>
	</div>
</div>

<!-- Add Vendor Modal -->
  <div class="modal fade" id="addVendorModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="modelTitleVendor"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>     
        </div>
        <div class="error-messages-scroll" id="addVendorErrorDiv" style="padding: 0rem 1rem;"></div>
        <div class="modal-body modal-body-scroll">         
    
     <form method="POST" rel="form" novalidate id="addVendorFormId" enctype="multipart/formdata" >
    
    <input type="hidden" id="vendorMasterId">
    
    <div class="form-group row">
	    <label for="inputVendorName" class="col-sm-4 col-form-label">Vendor Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="vendorNameId" placeholder="Vendor Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputVendorCode" class="col-sm-4 col-form-label">Vendor Code:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="6" id="vendorCodeId" placeholder="Vendor Code" required/>
	    </div>
  	</div>
  	
  	 	<div class="form-group row">
	    <label for="inputContactPersonName" class="col-sm-4 col-form-label">Contact Person Name:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="50" id="contactPersonNameId" placeholder="Contact Person Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputPhoneNo" class="col-sm-4 col-form-label">Contact Person Phone No:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="10" id="contactPersonPhoneNoId" placeholder="Contact Person Phone No" required/>
	    </div>
 	</div>
 	
 	<div class="form-group row">
	    <label for="inputEmailIs" class="col-sm-4 col-form-label">Contact Person Email Id:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="contactPersonEmailId" placeholder="Contact Person Email Id" required/>
	    </div>
 	</div>
  
	 <div class="form-group row" id="activeStatusIdDiv" style="display: none;">
	    <label for="inputActiveStatusId" class="col-sm-4 col-form-label">Status:</label>
	    <div class="col-sm-8 text-align-left">
	    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<input class="form-check-input" type="checkbox" name="activeStatus" id="activeStatusId">
			&nbsp;&nbsp;&nbsp;
			<label class="form-check-label" for="activeStatus">
	 			Active </label>
	    </div>
	  </div> 
  	
 	</form>  
   </div>
   
   
  <div class="modal-footer text-align-center" id="addVendorBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="addNewVendor()">Save</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="updateVendorBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateVendor()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>

   

      </div>
      
    </div>
  </div>
  
  

 
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/vendorMaster.js"></script>
<script src="./js/utility.js"></script>