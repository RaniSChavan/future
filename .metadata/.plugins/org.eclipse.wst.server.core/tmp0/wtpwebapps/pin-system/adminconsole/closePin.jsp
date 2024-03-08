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

<div class="container container-background">

<div class="main-wrap-div" id="closePinListDiv">
	<div class="row form-group">
	<div class="col-md-12">
	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><b>PIN Management</b></li>
	        <li class="breadcrumb-item active"><b>Close PIN</b></li>
	    </ol>
	</nav>
	</div>
	</div>
	
	<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Close PIN Details</p></div>
		<div class="col-md-6 text-right" >
				<button type="button" class="btn btn-primary" id="closePinBtnId" style="display: none;">
						<i class="glyphicon glyphicon-plus-sign"></i>
						Close PIN
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
		<div class="col-md-6"><p class="main-wrap-header">Closed PIN</p></div>
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
	
<div class="main-wrap-div" style="display: none;" id="closePinDivId">
	<!-- <div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Create PIN</p></div>
	</div> -->
	
	<div class="error-messages-scroll" id="closePinErrorDiv" style="padding: 0px 2px 10px 0px;"></div>
	
	<form id="closePinFormId">
	<input type="hidden" id="pinHeaderId">
	<input type="hidden" id="pinCloserDetailsId">
    <div class="accordion" id="accordionExample">
      <div class="card">
         <div class="card-header" id="headingOne">
             <h2 class="mb-0">
                 <button type="button" class="btn btn-link collapsed" id="buttonOne" data-toggle="collapse" data-target="#collapseOne"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Basic Pin Info</button>									
             </h2>
         </div>
         <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
         <div class="card-body">        
			 
	         <div class="form-group row">
			    <label for="projectName" class="col-sm-2 col-form-label">Project Name*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="projectNameId" disabled="disabled">
			    </div>
			    
				<div class="col-sm-1"></div>
				 <label for="projectManagerId" class="col-sm-2 col-form-label">Project Manager Name*</label>
			     <div class="col-sm-3">
			       <select class="form-control" name="manager" id="managerId" onchange="populateDeliveryOrg(this)" disabled="disabled">
				  </select>
			    </div>
			 </div>
			 
			 <!-- PIN Id TextBox -->
	         <div class="form-group row">
			    <label for="pinNo" class="col-sm-2 col-form-label">PIN No*</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="pinNoId" name="pinNo" disabled="disabled">
			    </div>			 
			 
	         <!-- <div class="col-sm-1"></div>
			    <label for="projectRepository" class="col-sm-2 col-form-label">Project Repository</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="projectRepositoryId" placeholder="projectRepository">
			    </div> -->
			 </div>
			 
			 
			 <!-- Pin Start Date and Pin End Date-->
	         <div class="form-group row">
			    <label for="pinStartDate" class="col-sm-2 col-form-label">PIN Start Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinStartDateId" name="pinStartDate" disabled="disabled">
			    </div>
			    
				<div class="col-sm-1"></div>
				  <label for="pinEndDate" class="col-sm-2 col-form-label">PIN End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinEndDateId" name="pinEndDate" disabled="disabled">
			    </div>
			 </div>	
			 
			  <!-- Revised End Date-->
	         <div class="form-group row" id="revisedEndDateDiv">
			    <label for="revisedEndDate" class="col-sm-2 col-form-label">Revised End Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="revisedEndDateId" name="revisedEndDate" disabled="disabled">
			    </div>
			    <div class="col-sm-1"></div>
				  <label for="pinCloseDate" class="col-sm-2 col-form-label">PIN Close Date*</label>
			    <div class="col-sm-3">
				  <input type="date" class="form-control" id="pinCloseDateId" name="pinCloseDate">
			    </div>
			 </div>	
			 
			 <div class="form-group row">
			    <label for="projectRepository" class="col-sm-2 col-form-label">Project Repository*</label>
			    <div class="col-sm-3">
				  <textarea class="form-control" id="projectRepositoryId" maxlength="500" placeholder="Project Repository"></textarea>
			    </div> 	 
			 
	         <!-- <div class="col-sm-1"></div>
			    <label for="projectRepository" class="col-sm-2 col-form-label">Project Repository</label>
			    <div class="col-sm-3">
				  <input type="text" class="form-control" id="projectRepositoryId" placeholder="projectRepository">
			    </div> -->
			 </div>	 
		
         </div>
         </div>
     </div>
     
     <div class="card">
        <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed" id="buttonTwo" data-toggle="collapse" data-target="#collapseTwo">
                <i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Type Of Engagement</button>
            </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
        <div class="card-body">
	         <div class="form-group row">
			    <label for="coeClassification" class="col-sm-2 col-form-label">Coe Classification*</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="coeClassification" multiple id="coeClassificationId">
			  		<option value="Data Analytics">Data Analytics</option>
			 		<option value="Software Integration">Software Integration</option>
			 		<option value="Quality Assurance">Quality Assurance</option>			 		
				  </select>
			    </div>
			 </div>
			 
		  <div class="form-group row">
			<label for="coeSubClassification" class="col-sm-2 col-form-label">Coe Sub Classification</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="coeSubClassificationId" name="coeSubClassification" maxlength="200" placeholder="Coe Sub Classification"></textarea>
			</div>
		   </div>
			 
			 <div class="form-group row">
			    <label for="business" class="col-sm-2 col-form-label">Business*</label>
			    <div class="col-sm-10">
			      <textarea class="form-control" id="businessId" name="business" maxlength="1000" placeholder="Business"></textarea>
			    </div>
			  </div>
			    
			 <div class="form-group row">
				 <label for="solution" class="col-sm-2 col-form-label">Solution*</label>
			    <div class="col-sm-10">
			       <textarea class="form-control" id="solutionId" name="solution" maxlength="1000" placeholder="Solution"></textarea>
			    </div>
			 </div>
			 
			<div class="form-group row">
			    <label for="natureOfProject" class="col-sm-2 col-form-label">Nature Of Project*</label>
			    <div class="col-sm-10">
			      <select class="form-control" name="natureOfProject" multiple id="natureOfProjectId">
			  		<option value="Green Field Product">Green Field Product</option>
			 		<option value="Consulting">Consulting</option>
			 		<option value="Product Enhancement">Product Enhancement</option>			 		
				  </select>
			    </div>
			</div>
			    
			<div class="form-group row">
				 <label for="inputSkillDetails" class="col-sm-2 col-form-label">Skill Required*</label>
			     <div class="col-sm-10">
			       <textarea class="form-control" id="skillRequiredId" name="skillRequired" maxlength="500" placeholder="Skill Required"></textarea> 
			    </div>
			 </div>
		  		  
        </div>
       </div>
    </div>
     
    <div class="card">
        <div class="card-header" id="headingThree">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed"  id="buttonThree" data-toggle="collapse" data-target="#collapseThree">
                <i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Learnings</button>
            </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">        
          <div class="form-group row">
			<label for="technicalLearning" class="col-sm-2 col-form-label">Technical</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="technicalLearningId" name="technicalLearning" maxlength="1000" placeholder="Technical Learning"></textarea>
			</div>
		  </div>	  
		 <div class="form-group row">
			<label for="peopleLearning" class="col-sm-2 col-form-label">People</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="peopleLearningId" name="peopleLearning" maxlength="1000" placeholder="People Learning"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="processLearning" class="col-sm-2 col-form-label">Process</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="processLearningId" name="processLearning" maxlength="1000" placeholder="Process Learning"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="effortTimeline" class="col-sm-2 col-form-label">Effort/Timeline</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="effortTimelineId" name="effortTimeline" maxlength="500" placeholder="Effort/Timeline"></textarea>
			</div>
		  </div>
		  
          </div>
        </div>
    </div>
    
      <div class="card">
        <div class="card-header" id="headingFour">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed"  id="buttonFour" data-toggle="collapse" data-target="#collapseFour">
                <i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Performance</button>
            </h2>
        </div>
        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
          <div class="card-body">        
          <div class="form-group row">
			<label for="projectObjPlanned" class="col-sm-2 col-form-label">Project Objectives Planned*</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectObjPlannedId" name="projectObjPlanned" maxlength="1000" placeholder="Project Objectives Planned"></textarea>
			</div>
		  </div>	  
		 <div class="form-group row">
			<label for="projectObjAchieved" class="col-sm-2 col-form-label">Project Objectives Achieved*</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="projectObjAchievedId" name="projectObjAchieved" maxlength="1000" placeholder="Project Objectives Achieved"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="milestonesPlanned" class="col-sm-2 col-form-label">Milestones Planned</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="milestonesPlannedId" name="milestonesPlanned" maxlength="1000" placeholder="Milestones Planned"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="milestonesAchieved" class="col-sm-2 col-form-label">Milestones Achieved</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="milestonesAchievedId" name="milestonesAchieved" maxlength="1000" placeholder="Milestones Achieved"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="plannedAllocation" class="col-sm-2 col-form-label">People Planned Allocation</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="plannedAllocationId" name="plannedAllocation" maxlength="500" placeholder="People Planned Allocation"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="actualAllocation" class="col-sm-2 col-form-label">People Actual Allocation</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="actualAllocationId" name="actualAllocation" maxlength="500" placeholder="People Actual Allocation"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="issuesIdentified" class="col-sm-2 col-form-label">Issues Identified</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="issuesIdentifiedId" name="issuesIdentified" maxlength="100" placeholder="Issues Identified"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="issuesFixed" class="col-sm-2 col-form-label">Issues Fixed</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="issuesFixedId" name="issuesFixed" maxlength="100" placeholder="Issues Fixed"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="issuesRepeated" class="col-sm-2 col-form-label">Issues Repeated</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="issuesRepeatedId" name="issuesRepeated" maxlength="100" placeholder="Issues Repeated"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="riskIdentifiedMitigated" class="col-sm-2 col-form-label">Risk Identified & Mitigated</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="riskIdentifiedMitigatedId" name="riskIdentifiedMitigated" maxlength="1000" placeholder="Risk Identified & Mitigated"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
			<label for="physicalResourceRelease" class="col-sm-2 col-form-label">Hardware & Software Resources To Be Released*</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="physicalResourceReleaseId" name="physicalResourceRelease" maxlength="100" placeholder="Hardware & Software Resources To Be Released"></textarea>
			</div>
		  </div>
		  <div class="form-group row">
		    <label for="revokeAllDataAccess" class="col-sm-2 col-form-label">Revoke All Data Access:</label>
		    <div class="col-sm-8 text-align-left">
				<label class="radio-inline"><input type="radio" value="YES" name="revokeAllDataAccess" onclick="enableRasonDiv('YES')">&nbsp;&nbsp;&nbsp;&nbsp;Yes</label>
				<label class="radio-inline"><input type="radio" value="NO" name="revokeAllDataAccess" onclick="enableRasonDiv('NO')">&nbsp;&nbsp;&nbsp;&nbsp;No</label> 
		    </div>
		  </div> 
		   <div class="form-group row" id="reasonDivId">
			<label for="reason" class="col-sm-2 col-form-label">Reason*</label>
			<div class="col-sm-10">
				<textarea class="form-control" id="revokeAccessReasonId" name="revokeAccessReason" maxlength="500" placeholder="Reason"></textarea>
			</div>
		  </div>
		  
          </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header" id="headingFive">
            <h2 class="mb-0">
                <button type="button" class="btn btn-link collapsed"  id="buttonFive" data-toggle="collapse" data-target="#collapseFive">
                <i class="fa fa-plus-circle"></i>&nbsp;&nbsp;Comment</button>
            </h2>
        </div>
        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
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
    </div>
    </form>
    
    <br><br>
    <div id="submitButtonDiv">
    	<button type="submit" class="btn btn-primary" id="createClosePinBtnId" onclick="createClosePIN()" style="display: none;">Submit</button>
    	<button type="submit" class="btn btn-primary" id="updateClosePinBtnId" onclick="updateClosePIN()" style="display: none;">Update</button>
    	<button type="button" class="btn btn-secondary" onclick="backToClosePinList()">Cancel</button>
    </div>
    <div id="approveRejectButtonDiv" style="display: none;">
    	<button type="submit" class="btn btn-primary" onclick="approveClosePIN()">Approved</button>
    	<button type="submit" class="btn btn-primary" onclick="rejectClosePIN()">Reject</button>
    	<button type="button" class="btn btn-secondary" onclick="backToClosePinList()">Cancel</button>
    </div>
</div>
</div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/closePin.js"></script>
<script src="./js/pinCRCommon.js"></script>
<script src="./js/utility.js"></script>