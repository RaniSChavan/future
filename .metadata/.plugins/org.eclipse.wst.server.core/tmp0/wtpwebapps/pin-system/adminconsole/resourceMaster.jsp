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

<div class="container container-background" id="resourceListDiv">
<div class="main-wrap-div">
	<div class="row form-group">
	<div class="col-md-12">
	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><b>Master Screen</b></li>
	        <li class="breadcrumb-item active"><b>Resource Master</b></li>
	    </ol>
	</nav>
	</div>
	</div>
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Resource Master</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="addResourceBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Add Resource
					</button>
			</div>
		</div>

	<div class="row">
		<div class="form-group col-md-12 responsive-table" id="resourceListSearchTableDiv">
			<table id="resourceListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Resource Name</th>					
						<!-- <th>Hourly Rate</th> -->
						<th>Employee Id</th>	
						<th>Joining Date</th>
						<th>Separation Date</th>
						<th>Resource Type</th>
						<th>Resource Status</th>
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

<!-- Add Resource Modal -->
  <div class="modal fade" id="addResourceModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="modelTitleResource"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>     
        </div>
        <div class="error-messages-scroll" id="addResourceErrorDiv" style="padding: 0rem 1rem;"></div>
        <div class="modal-body modal-body-scroll">         
    
     <form method="POST" rel="form" novalidate id="addResourceFormId" enctype="multipart/formdata" >
    
    <input type="hidden" id="resourceMasterId">
    
    <div class="form-group row">
	    <label for="inputResourceName" class="col-sm-4 col-form-label">Resource Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="resourceNameId" placeholder="Resource Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row" id="resourceEmpIdDiv" style="display: none;">
	    <label for="inputResourceEmpId" class="col-sm-4 col-form-label">Employee Id*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" id="resourceEmpId" placeholder="Resource Id" disabled="disabled"/>
	    </div>
  	</div>
  	
  	 <div class="form-group row">
	    <label for="inputResourceEmailId" class="col-sm-4 col-form-label">Resource Email Id*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="resourceEmailId" placeholder="Resource Email Id" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputResourcePhoneNo" class="col-sm-4 col-form-label">Resource Phone No:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="10" id="resourcePhoneNoId" placeholder="Resource Phone No"/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputResourceSourceCode" class="col-sm-4 col-form-label">Source Code*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="resourceSourseCode" id="resourceSourseCodeId">
			</select>
	    </div>
 	</div>
 	
 	<!-- <div class="form-group row">
	    <label for="inputResourceHourlyRate" class="col-sm-4 col-form-label">Hourly Rate*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="7" id="resourceHourlyRateId" placeholder="Resource Hourly Rate" onkeypress="return validateFloatKeyPress(this,event,4);"/>
	    </div>
  	</div> -->
 	
 	<div class="form-group row">
	    <label for="inputResourceDesignationName" class="col-sm-4 col-form-label">Designation Name*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="designationName" id="designationNameId">
			</select>
	    </div>
 	</div>
 	
 	<div class="form-group row">
	    <label for="inputResourceGradeName" class="col-sm-4 col-form-label">Grade Name*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="resourceGradeName" id="resourceGradeId">
			</select>
	    </div>
 	</div>
 	
 	<div class="form-group row">
		<label for="inputJoiningDate" class="col-sm-4 col-form-label">Joining Date*:</label>
		<div class="col-sm-8">
			<%-- <input type="date" class="form-control" id="joiningDateId" name="joiningDate" min="<%=strDate%>" max="<%=strFutureDate%>"> --%>
			<input type="date" class="form-control" id="joiningDateId" name="joiningDate">
		</div>
	</div>
	
	<div class="form-group row" id="separationDateDiv" style="display: none;">
		<label for="inputSeparationDate" class="col-sm-4 col-form-label">Separation Date:</label>
		<div class="col-sm-8">
			<input type="date" class="form-control" id="separationDateId" name="separationDate">
		</div>
	</div>
	
	<div class="form-group row">
	    <label for="inputResourceManagerName" class="col-sm-4 col-form-label">Manager Name*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="managerName" id="managerNameId">
			</select>
	    </div>
 	</div>
 	
 	<div class="form-group row">
	    <label for="inputMentorName" class="col-sm-4 col-form-label">Mentor Name*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="mentorName" id="mentorNameId">
			</select>
	    </div>
 	</div>
	
	<div class="form-group row">
	    <label for="inputSkillDetails" class="col-sm-4 col-form-label">Skill Details*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="skillDetailsSelect[]" multiple id="skillDetailsSelect"></select>      
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputResourceType" class="col-sm-4 col-form-label">Resource Type*:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="resourceType" id="resourceTypeId" onchange="populateSubcontractorDiv(this)">
			  <option value="">Select</option>
			  <option value="Employee">Employee</option>
			  <option value="FullTimeConsultant">Full time Consultant</option>
			  <option value="Intern">Intern</option>
			  <option value="PartTimeConsultant">Part time Consultant</option>		
			  <option value="Subcontractor">Subcontractor</option>			  
			</select>
	    </div>
 	 </div>
 	 
 	 <div class="form-group row" id="subcontractorOrgDiv" style="display: none;">
	    <label for="inputVendorName" class="col-sm-4 col-form-label">Subcontractor Org:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="vendorName" id="resourceVendorId"></select>
	    </div>
	    <!-- <div class="col-sm-8">
	       <input type="text" class="form-control" id="subcontractorOrgId" placeholder="Subcontractor Org"/>
	    </div> -->
  	</div>
 	 
 	 <div class="form-group row">
	    <label for="inputResourceCatagory" class="col-sm-4 col-form-label">Resource Catagory:</label>
	    <div class="col-sm-8">
	       <select class="form-control" name="resourceCatagory" id="resourceCatagoryId">
			  <option value="">Select</option>
			  <option value="Manager">Manager</option>
			  <option value="Mentor">Mentor</option>
			  <option value="Both">Both</option>
			</select>
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
   
   
  <div class="modal-footer text-align-center" id="addResourceBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="addNewResource()">Save</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="updateResourceBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateResource()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="activeResourceBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateResourceToActive()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>

   

      </div>
      
    </div>
  </div>
  
  

 
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/resourceMaster.js"></script>
<script src="./js/utility.js"></script>