<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.text.DateFormat"%>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>

</head>

<!-- <nav>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="?target=customerMaster">Home</a></li>
        <li class="breadcrumb-item active"><b>Resource Master</b></li>
    </ol>
</nav> -->

<div class="container container-background">

<div class="main-wrap-div" id="pinListDiv">
	<div class="row form-group">
	<div class="col-md-12">
	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><b>PIN Management</b></li>
	        <li class="breadcrumb-item active"><b>Create/ View PIN</b></li>
	    </ol>
	</nav>
	</div>
	</div>
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">PIN Details</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="addPineBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Add PIN
					</button>
			</div>
		</div>

	<div class="row">
		<div class="form-group col-md-12 responsive-table" id="pinListSearchTableDiv">
			<table id="pinListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>PIN Number</th>					
						<th>Project Name</th>
						<th>Project Sponsor Name</th>
						<th>Project Manager Name</th>
						<th>Contract Value</th>
						<th>PIN Start Date</th>
						<th>PIN End Date</th>
						<th>Revised End Date</th>
						<th>Project Hold Date</th>
						<th>Status</th>
						<th width="10%">Action</th>
					</tr>
				</thead>
				<tbody>
				
				</tbody>			
			</table>
		</div>
	</div>
	</div>
	
<div class="main-wrap-div" style="display: none;" id="createNewPinDivId">
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Create PIN</p></div>
	</div>
	
	<div class="error-messages-scroll" id="addPinErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
	
	<form id="createPinFormId">
	<input type="hidden" id="pinHeaderId">
    <div class="accordion" id="accordionExample">
      <div class="card">
         <div class="card-header" id="headingOne">
             <h2 class="mb-0">
                 <button type="button" class="btn btn-link collapsed" id="buttonOne" data-toggle="collapse" data-target="#collapseOne"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Basic Pin Info</button>									
             </h2>
         </div>
         <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
         <div class="card-body">
        
         	 <!-- Project Type Dropdown and Project Category Dropdown-->
	         <div class="form-group row">
			    <label for="projectType" class="col-sm-2 col-form-label">Project Type*</label>
			    <div class="col-sm-3">
			      <select class="form-control" name="projectType" id="projectTypeId">
			  		<option value="">Select</option>
			  		<option value="I">Internal</option>
			 		<option value="R">Revenue</option>
				  </select>
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectCategory" class="col-sm-2 col-form-label">Project Category*</label>
			    <div class="col-sm-3">
			       <select class="form-control" name="projectCategory" id="projectCategoryId">
			  		<option value="">Select</option>
			  		<option value="S">Software Engineering</option>
			 		<option value="A">Analytics</option>
			 		<option value="P">Process</option>
				  </select>
			    </div>
			 </div>
			 
			 <!-- customer Dropdown and projectName textbox-->
	         <div class="form-group row">
			    <label for="customer" class="col-sm-2 col-form-label">Customer*</label>
			    <div class="col-sm-3">
			      <select class="form-control" name="customer" id="customerId">
				  </select>
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectName" class="col-sm-2 col-form-label">Project Name*</label>
			    <div class="col-sm-3">
			        <input type="text" class="form-control" id="projectNameId" maxlength="45" placeholder="Project Name">
			    </div>
			 </div>
			 
			 <!-- Project Sponsor Name textbox and Project Manager Name Drpdown-->
	         <div class="form-group row">
			    <label for="sponsorName" class="col-sm-2 col-form-label">Project Sponsor Name*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="sponsorNameId" maxlength="100" placeholder="Project Sponsor Name">
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectManagerId" class="col-sm-2 col-form-label">Project Manager Name*</label>
			     <div class="col-sm-3">
			       <select class="form-control" name="manager" id="managerId" onchange="populateDeliveryOrg(this)">
				  </select>
			    </div>
			 </div>
			 
			 <!-- Contract Value TextBox -->
	         <div class="form-group row">
			    <label for="contractValue" class="col-sm-2 col-form-label">Contract Value*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="contractValueId" name="contractValue" maxlength="9"  onkeypress="return validateFloatKeyPress(this,event,6);" placeholder="Contract Value">
			    </div>			 
			 
			 <!-- Source Name TextBox -->
	         <div class="col-sm-1"></div>
			    <label for="deliveryOrg" class="col-sm-2 col-form-label">Delivery Organization</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="deliveryOrgId" placeholder="Delivery Organization" disabled="disabled">
			    </div>
			 </div>
			 
			 
			 <!-- Pin Start Date and Pin End Date-->
	         <div class="form-group row">
			    <label for="pinStartDate" class="col-sm-2 col-form-label">PIN Start Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinStartDateId" name="pinStartDate">
			    </div>
			    
				<div class="col-sm-1"></div>
				  <label for="pinEndDate" class="col-sm-2 col-form-label">PIN End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinEndDateId" name="pinEndDate">
			    </div>
			 </div>	
			 
			  <!-- Revised End Date-->
	         <div class="form-group row" id="revisedEndDateDiv" style="display: none;">
			    <label for="revisedEndDate" class="col-sm-2 col-form-label">Revised End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="revisedEndDateId" name="revisedEndDate">
			    </div>
			 </div>		 
		
         </div>
         </div>
     </div>
     
     <div class="card">
        <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed" id="buttonTwo" data-toggle="collapse" data-target="#collapseTwo"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Project Details</button>
            </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
        <div class="card-body">
        
         <!-- Project Objectives TextArea -->
         <div class="form-group row">
			<label for="projectObjectives" class="col-sm-2 col-form-label">Project Objectives</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectObjectivesId" name="projectObjectives" maxlength="500" placeholder="Project Objectives"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Deliverables TextArea -->
         <div class="form-group row">
			<label for="projectDeliverables" class="col-sm-2 col-form-label">Project Deliverables</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectDeliverablesId" name="projectDeliverables" maxlength="2000" placeholder="Project Deliverables"></textarea>
			</div>
		  </div>
		  
		  <!-- Project In Scope TextArea -->
         <div class="form-group row">
			<label for="projectInScope" class="col-sm-2 col-form-label">Project In Scope</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectInScopeId" name="projectInScope" maxlength="2000"	 placeholder="Project In Scope"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Out of Scope TextArea -->
         <div class="form-group row">
			<label for="projectOutScope" class="col-sm-2 col-form-label">Project Out Of Scope</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectOutScopeId" name="projectOutScope" maxlength="2000" placeholder="Project Out Of Scope"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Assumptions TextArea -->
         <div class="form-group row">
			<label for="projectAssumptions" class="col-sm-2 col-form-label">Project Assumptions</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectAssumptionsId" name="projectAssumptions" maxlength="1000" placeholder="Project Assumptions"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Constraints TextArea -->
         <div class="form-group row">
			<label for="projectConstraints" class="col-sm-2 col-form-label">Project Constraints</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectConstraintsId" name="projectConstraints" maxlength="1000" placeholder="Project Constraints"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Initial Risks Mitigation TextArea -->
         <div class="form-group row">
			<label for="projectInitialRisks" class="col-sm-2 col-form-label">Project Initial Risks Mitigation</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectInitialRisksId" name="projectInitialRisks" maxlength="2000" placeholder="Project Initial Risks Mitigation"></textarea>
			</div>
		  </div>
		  
		 <!-- Project Key Milestones TextArea -->
         <div class="form-group row">
			<label for="projectKeyMilestones" class="col-sm-2 col-form-label">Project Key Milestones</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectKeyMilestonesId" name="projectKeyMilestones" maxlength="1000" placeholder="Project Key Milestones"></textarea>
			</div>
		  </div>
		  		  
        </div>
       </div>
    </div>
     
    <div class="card">
        <div class="card-header" id="headingThree">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed"  id="buttonThree" data-toggle="collapse" data-target="#collapseThree"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Comment</button>
            </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">
  
         <!-- Pin Submitted Comments TextArea -->
         <div class="form-group row">
         <table class="table table-bordered" id="commentTable">
            <thead>
               <tr>
                   <th>Comment</th>
                   <th>Commented By</th>
                   <th>Commented On</th>			                        
               </tr>
            </thead>
            <tbody></tbody>
		</table>
         
         </div>
         
         <!-- Pin Comments TextArea -->
         <div class="form-group row">
			<label for="pinComments" class="col-sm-2 col-form-label">Comments*</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="pinCommentsId" name="pinComments" maxlength="1000" placeholder="Comments"></textarea>
			</div>
		  </div>
		  
            </div>
        </div>
    </div>

	<div class="card">
         <div class="card-header" id="headingFour">
             <h2 class="mb-0">
                 <button type="button" class="btn btn-link collapsed" id="buttonFour" data-toggle="collapse" data-target="#collapseFour"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp; Resource Details</button>                     
             </h2>
         </div>
         <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
             <div class="card-body">
             
             	<!-- Add Human Resource -->
                <div class="container-lg">
			    <div class="table-wrapper-responsive">
			        <div class="table-wrapper">
			            <div class="table-title">
			                <div class="row">
			                    <div class="col-sm-8"><h2>Human Resource</h2></div>
			                    <div class="col-sm-4">
			                        <!-- <button type="button" class="btn btn-info add-new add-new-HR" id="addHumanResourceBtn"><i class="fa fa-plus"></i> Add New</button> -->
			                    </div>
			                    <div class="error-messages-scroll" id="humanResourceErrorDiv" style="padding: .5rem 1rem;"></div>
			                </div>
			            </div>
			            <table class="table table-bordered" id="humanResourceTable">
			                <thead>
			                    <tr>
			                        <th>Resource Name</th>
			                        <th>Employee Id</th>
			                        <th>Role</th>
			                        <th>Allocation(in %)</th>
			                        <th>Start Date</th>
			                        <th>End Date</th>
			                        <th>Actions</th>
			                    </tr>
			                </thead>
			                <tbody></tbody>
			            </table>
			            <div class="table-title">
			                <div class="row">
			                    <div class="col-sm-8"></div>
			                    <div class="col-sm-4">
			                        <button type="button" class="btn btn-info add-new add-new-HR" id="addHumanResourceBtn"><i class="fa fa-plus"></i> Add New</button>
			                    </div>
			                </div>
			            </div>
			        	</div>
			    	</div>
				</div>
				
				<!-- Add Physical Resource -->
				<div class="container-lg">
			    <div class="table-wrapper-responsive">
			        <div class="table-wrapper">
			            <div class="table-title">
			                <div class="row">
			                    <div class="col-sm-8"><h2>Physical Resource</h2></div>
			                    <div class="col-sm-4">
			                        <!-- <button type="button" class="btn btn-info add-new add-new-PR" id="addPhysicalResourceBtn"><i class="fa fa-plus"></i> Add New</button> -->
			                    </div>
			                    <div class="error-messages-scroll" id="physicalResourceErrorDiv" style="padding: .5rem 1rem;"></div>
			                </div>
			            </div>
			            <table class="table table-bordered" id="physicalResourceTable">
			                <thead>
			                    <tr>
			                        <th>Description</th>
			                        <th>Allocation(in %)</th>
			                        <th>Start Date</th>
			                        <th>End Date</th>
			                        <th>Actions</th>
			                    </tr>
			                </thead>
			                <tbody></tbody>
			            </table>
			            <div class="table-title">
			                <div class="row">
			                    <div class="col-sm-8"></div>
			                    <div class="col-sm-4">
			                        <button type="button" class="btn btn-info add-new add-new-PR" id="addPhysicalResourceBtn"><i class="fa fa-plus"></i> Add New</button>
			                    </div>
			                </div>
			            </div>
			        	</div>
			    	</div>
				</div>
              </div>
            </div>
        </div>
    </div>
    </form>
    
    <br><br>
    <div id="submmitButtonDiv">
    	<button type="submit" class="btn btn-primary" id="savePinBtnId" onclick="savePinAllocation()" style="display: none;">Submit</button>
    	<button type="submit" class="btn btn-primary" id="updatePinBtnId" onclick="updatePinAllocation()" style="display: none;">Update</button>
    	<button type="button" class="btn btn-secondary" onclick="backToPinList()">Cancel</button>
    </div>
    <div id="approveRejectButtonDiv" style="display: none;">
    	<button type="submit" class="btn btn-primary" id="savePinBtnId" onclick="approvePin()">Approved</button>
    	<button type="submit" class="btn btn-primary" id="savePinBtnId" onclick="rejectPin()">Reject</button>
    	<button type="button" class="btn btn-secondary" onclick="backToPinList()">Cancel</button>
    </div>
</div>
</div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/pinAllocation.js"></script>
<script src="./js/pinCRCommon.js"></script>
<script src="./js/utility.js"></script>