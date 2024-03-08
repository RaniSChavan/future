<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.text.DateFormat"%>
<%
	String restApiUrlSession =  System.getenv("PINDOMAIN");
%>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>

</head>

<div class="container container-background">

<input type="hidden" id="restApiUrlSession" value="<%=restApiUrlSession%>">

<div class="main-wrap-div" id="changeReqListDiv">
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Change Request Details</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="addChangeReqBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Add Change Request
					</button>
			</div>
		</div>

	<div class="row">
		<div class="form-group col-md-12 responsive-table" id="changeReqListSearchTableDiv">
			<table id="changeReqListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>		
						<th>CR No</th>	
						<th>PIN No</th>		
						<th>Project Name</th>
						<th>Project Sponsor Name</th>
						<th>Project Manager Name</th>
						<th>Contract Value</th>
						<th>PIN Start Date</th>
						<th>PIN End Date</th>
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
	
<div class="main-wrap-div" style="display: none;" id="selectPinDivId">
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Create Change Request</p></div>
	</div>
	<div class="row form-group">
	<div class="col-sm-3"></div>
	<label for="projectType" class="col-sm-2 col-form-label">Select PIN*</label>
	<div class="col-sm-4">
		 <select class="form-control" name="selectPin" id="selectPinId"></select>
	</div>
	<div class="col-sm-2"></div>
	</div>
</div>
	
<div class="main-wrap-div" style="display: none;" id="createNewChgReqDivId">
	
	<div class="error-messages-scroll" id="addCRErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
	
	<form id="changeRequestFormId">
	<input type="hidden" id="pinHeaderId">
	<input type="hidden" id="pinNumberId">
	<input type="hidden" id="changeRequestHeaderId">
	
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
			      <select class="form-control" name="projectType" id="projectTypeId" disabled>
			  		<option value="">Select</option>
			  		<option value="I">Internal</option>
			 		<option value="R">Revenue</option>
				  </select>
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectCategory" class="col-sm-2 col-form-label">Project Category*</label>
			    <div class="col-sm-3">
			       <select class="form-control" name="projectCategory" id="projectCategoryId" disabled>
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
			      <select class="form-control" name="customer" id="customerId" disabled>
				  </select>
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectName" class="col-sm-2 col-form-label">Project Name*</label>
			    <div class="col-sm-3">
			        <input type="text" class="form-control" id="projectNameId" maxlength="45" placeholder="Project Name" disabled>
			    </div>
			 </div>
			 
			 <!-- Project Sponsor Name textbox and Project Manager Name Drpdown-->
	         <div class="form-group row">
			    <label for="sponsorName" class="col-sm-2 col-form-label">Project Sponsor Name*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="sponsorNameId" maxlength="100" placeholder="Project Sponsor Name" disabled>
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectManagerId" class="col-sm-2 col-form-label">Project Manager Name*</label>
			     <div class="col-sm-3">
			       <select class="form-control" name="manager" id="managerId" onchange="populateDeliveryOrg(this)" disabled>
				  </select>
			    </div>
			 </div>
			 
			 <div class="form-group row">
			 <!-- Source Name TextBox -->
			    <label for="deliveryOrg" class="col-sm-2 col-form-label">Delivery Organization</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="deliveryOrgId" placeholder="Delivery Organization" disabled="disabled">
			    </div>
			    
			    <div class="col-sm-1"></div>
			    <label for="existingPinStartDate" class="col-sm-2 col-form-label">PIN Start Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="existingPinStartDateId" name="existingPinStartDate">
			    </div>
			 </div>
			 
			  <!-- Pin Start Date and Pin End Date-->
	         <div class="form-group row">
			    <label for="existingPinEndDate" class="col-sm-2 col-form-label">PIN End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="existingPinEndDateId" name="existingPinEndDate">
			    </div>
			    
				<div class="col-sm-1"></div>
				  <label for="revisedEndDate" class="col-sm-2 col-form-label">Revised End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="revisedEndDateId" name="revisedEndDate">
			    </div>
			 </div>
			 
			 <!-- CR Start Date and CR End Date-->
	         <div class="form-group row">
			    <label for="pinStartDate" class="col-sm-2 col-form-label">Change Request Start Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinStartDateId" name="pinStartDate">
			    </div>
			    
				<div class="col-sm-1"></div>
				  <label for="pinEndDate" class="col-sm-2 col-form-label">Change Request End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinEndDateId" name="pinEndDate">
			    </div>
			 </div>
			 
			 <!-- Contract Value TextBox and Change Reason dropdown -->
	         <div class="form-group row">
			    <label for="contractValue" class="col-sm-2 col-form-label">Contract Value*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="contractValueId" name="contractValue" maxlength="9"  onkeypress="return validateFloatKeyPress(this,event,6);" placeholder="Contract Value">
			    </div>
			      
			    <div class="col-sm-1"></div>
			    <label for="projectChangeReason" class="col-sm-2 col-form-label">Change Reason*</label>
			     <div class="col-sm-3">
				  <select class="form-control" name="changeReasonSelect" multiple id="changeReasonSelect"></select>      
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
        
         <div class="form-group row">
			<label for="projectChangeDesc" class="col-sm-2 col-form-label">Change Description*</label>
			  <div class="col-sm-10">
				<textarea class="form-control" id="changeDescId" name="changeDesc" maxlength="1000"  placeholder="Change Description"></textarea>
			</div>		
		  </div>
		  
         <div class="form-group row">
			<label for="scopeImpact" class="col-sm-2 col-form-label">Scope Impact</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="scopeImpactId" name="scopeImpact" maxlength="1000" placeholder="Scope Impact"></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="effortImpact" class="col-sm-2 col-form-label">Effort Impact</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="effortImpactId" name="effortImpact" maxlength="1000" placeholder="Effort Impact"></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="timeLineImpact" class="col-sm-2 col-form-label">Time Line Impact</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="timeLineImpactId" name="timeLineImpact" maxlength="1000"	 placeholder="Time Line Impact"></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="costImpact" class="col-sm-2 col-form-label">Cost Impact</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="costImpactId" name="costImpact" maxlength="1000" placeholder="Cost Impact"></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="userInterface" class="col-sm-2 col-form-label">User Interface</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="userInterfaceId" name="userInterface	" maxlength="1000" placeholder="User Interface"></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="design " class="col-sm-2 col-form-label">Design</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="designId" name="design" maxlength="1000" placeholder="Design "></textarea>
			</div>
		  </div>
		  
         <div class="form-group row">
			<label for="database" class="col-sm-2 col-form-label">Database</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="databaseId" name="database" maxlength="1000" placeholder="Database"></textarea>
			</div>
		  </div>
		  		
         <div class="form-group row">
			<label for="algorithm" class="col-sm-2 col-form-label">Algorithm</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="algorithmId" name="algorithm" maxlength="1000" placeholder="Algorithm"></textarea>
			</div>
		  </div>
		  
		  <div class="form-group row">
			<label for="risks" class="col-sm-2 col-form-label">Risks</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="risksId" name="risks" maxlength="1000" placeholder="Risks"></textarea>
			</div>
		  </div>
		  
		  <div class="form-group row">
			<label for="risksMitigationPlan" class="col-sm-2 col-form-label">Risks & Mitigation Plan</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="risksMitigationPlanId" name="risksMitigationPlan" maxlength="1000" placeholder="Risks & Mitigation Plan"></textarea>
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
			                    <div class="col-sm-8">
			                    <div class="highlighted-resource-info">
				  					<p><strong>&nbsp;&nbsp; Note! </strong>Highlighted row signifies added/ modified resources.</p>
								</div>		                    
			                    </div>
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
			                    <div class="col-sm-8">
			                    <div class="highlighted-resource-info">
				  					<p><strong>&nbsp;&nbsp; Note! </strong>Highlighted row signifies added/ modified resources.</p>
								</div>	
			                    </div>
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
    	<button type="submit" class="btn btn-primary" id="saveCRBtnId" onclick="saveChangeRequest()" style="display: none;">Submit</button>
    	<button type="submit" class="btn btn-primary" id="updateCRBtnId" onclick="updateChangeRequest()" style="display: none;">Update</button>
    	<button type="button" class="btn btn-secondary" onclick="backToCRList()">Cancel</button>
    </div>
    <div id="approveRejectButtonDiv" style="display: none;">
    	<button type="submit" class="btn btn-primary" id="savePinBtnId" onclick="approveChangeRequest()">Approved</button>
    	<button type="submit" class="btn btn-primary" id="savePinBtnId" onclick="rejectChangeRequest()">Reject</button>
    	<button type="button" class="btn btn-secondary" onclick="backToCRList()">Cancel</button>
    </div>
</div>
</div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/changeRequest.js"></script>
<script src="./js/pinCRCommon.js"></script>
<script src="./js/utility.js"></script>