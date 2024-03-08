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

<div class="container container-background" id="designationListDiv">
<div class="main-wrap-div">
	<div class="row form-group">
	<div class="col-md-12">
	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><b>Master Screen</b></li>
	        <li class="breadcrumb-item active"><b>Designation Master</b></li>
	    </ol>
	</nav>
	</div>
	</div>
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Designation Master</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="addDesignationBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Add Designation
					</button>
			</div>
		</div>

	<div class="row">
		<div class="form-group col-md-12 responsive-table" id="designationListSearchTableDiv">
			<table id="designationListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Designation Name</th>					
						<th>Designation Code</th>
						<th>Designation Status</th>
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

<!-- Add Designation Modal -->
  <div class="modal fade" id="addDesignationModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="modelTitleDesignation"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>     
        </div>
        <div class="error-messages-scroll" id="addDesignationErrorDiv" style="padding: 0rem 1rem;"></div>
        <div class="modal-body modal-body-scroll">         
    
     <form method="POST" rel="form" novalidate id="addDesignationFormId" enctype="multipart/formdata" >
    
    <input type="hidden" id="designationMasterId">
    
    <div class="form-group row">
	    <label for="inputDesignationName" class="col-sm-4 col-form-label">Designation Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="100" id="designationNameId" placeholder="Designation Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputDesignationCode" class="col-sm-4 col-form-label">Designation Code:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="100" id="designationCodeId" placeholder="Designation Code" required/>
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
   
   
  <div class="modal-footer text-align-center" id="addDesignationBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="addNewDesignation()">Save</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="updateDesignationBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateDesignation()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>

   

      </div>
      
    </div>
  </div>
  
  

 
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/designationMaster.js"></script>
<script src="./js/utility.js"></script>