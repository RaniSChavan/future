<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js"></script>

</head>

	<div class="container container-background" id="customerListDiv">
	<div class="main-wrap-div row ">
	<div class="col-md-12">
	<nav>
	    <ol class="breadcrumb">
	        <li class="breadcrumb-item"><b>Master Screen</b></li>
	        <li class="breadcrumb-item active"><b>Customer Master</b></li>
	    </ol>
	</nav>
	</div>
	</div>
	<div class="row">
	<div class="form-group col-md-5 col-sm-10 org-div-left">
		<div class="row">
		<div class="col-md-6"><p class="main-wrap-header">Customer Details</p></div>
		<div class="col-md-6 text-right">								
		<button type="button" class="btn btn-primary" id="addCustomerBtnId" style="display: none;">
			<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;&nbsp;Add Customer
		</button>
	</div>
	</div><br>
	
	<div class="row">		
		<div id="customerListSearchTableDiv" class="responsive-table">
			<table id="customerListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th width="10%"></th>
						<th width="20%">Customer Name</th>
						<th width="50%">Customer Description</th>
						<th width="10%">Status</th>
						<th width="10%">Action</th>
					</tr>
				</thead>
				<tbody>
				
				</tbody>			
			</table>
		</div>
	</div>
	</div>	
		
	<div class="form-group col-md-7 col-sm-10 org-div-right">
	<div class="row">
	<div class="col-md-6"><p class="main-wrap-header">Customer Location Details</p></div>
		<div class="col-md-6 text-right" >
			<button type="button" class="btn btn-primary" id="addLocationBtnId" style="display: none;">
				<i class="glyphicon glyphicon-plus-sign"></i>&nbsp;&nbsp;Add Customer Location
			</button>
		</div>
		</div><br>	
		<div class="row">
		<div id="locationListSearchTableDiv" class="responsive-table">
			<table id="locationListSearchTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
				<thead>
					<tr>						
						<th width="15%">Location</th>
						<th width="10%">LocationCode</th>
						<th width="20%">Contact Person Name</th>
						<th width="15%">Contact Person Phone No</th>
						<th width="20%">Contact Person Email Id</th>
						<th width="10%">Status</th>
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
</div>

<!-- Add Customer Modal -->
  <div class="modal fade" id="addCustomerModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="modelTitleCustomer"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button> 
        </div>
        <div class="error-messages-scroll" id="addCustomerErrorDiv" style="padding: 0rem 1rem;"></div>
        <div class="modal-body modal-body-scroll">         
    
     <form method="POST" rel="form" novalidate id="addCustomerFormId" enctype="multipart/formdata" >
    
    <input type="hidden" id="customerId">
    <input type="hidden" id="customerLocationId">
    
    <div id="onlyCustomerdetailDiv">
    <div class="form-group row">
	    <label for="inputCustomerName" class="col-sm-4 col-form-label">Customer Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="customerNameId" placeholder="Customer Name" required/>
	    </div>
  	</div>
  
  	<div class="form-group row">
	    <label for="inputCustomerDesc" class="col-sm-4 col-form-label">Customer Description*:</label>
	    <div class="col-sm-8">
	       <textarea class="form-control" id="customerDescId" name="customerDesc" maxlength="500" placeholder="Customer Description"></textarea>
	    </div>
  	</div>
  	
  	<div>
  		<p style="font-size: 16px;
    font-weight: 500;
    padding: 4px 0px 12px 0px;"><b>Customer Location Details:</b></p>
  	</div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputLocationName" class="col-sm-4 col-form-label">Location Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="100" id="locationNameId" placeholder="Location Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputLocationCode" class="col-sm-4 col-form-label">Location Code*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="3" id="locationCodeId" placeholder="Location Code" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputContactPersonName" class="col-sm-4 col-form-label">Contact Person Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="100" id="contactPersonNameId" placeholder="Contact Person Name" required/>
	    </div>
  	</div>
  	
  	<div class="form-group row">
	    <label for="inputPhoneNo" class="col-sm-4 col-form-label">Contact Person Phone No*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="10" id="contactPersonPhoneNoId" placeholder="Contact Person Phone No" required/>
	    </div>
 	</div>
 	
 	<div class="form-group row">
	    <label for="inputEmailIs" class="col-sm-4 col-form-label">Contact Person Email Id*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="contactPersonEmailId" placeholder="Contact Person Email Id" required/>
	    </div>
 	</div>

  
 	</form>  
   </div>
   
   
  <div class="modal-footer text-align-center" id="addCustomerBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="addNewCustomer()">Save</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="addLocationBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="addNewCustomerLocation()">Save</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  <div class="modal-footer text-align-center" id="updateLocationBtnDiv" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateCustomerLocation()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
   

      </div>
      
    </div>
  </div>
  
  
 <!-- Edit Customer Modal -->
  <div class="modal fade" id="updateCustomerModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Customer</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="error-messages-scroll" id="updateCustomerErrorDiv" style="padding: 0rem 1rem;"></div>
        <div class="modal-body modal-body-scroll">         
    
     <form method="POST" rel="form" novalidate id="updateCustomerFormId" enctype="multipart/formdata" >
    
    <input type="hidden" id="updateCustomerId">
    
    <div class="form-group row">
	    <label for="inputEditCustomerName" class="col-sm-4 col-form-label">Customer Name*:</label>
	    <div class="col-sm-8">
	       <input type="text" class="form-control" maxlength="45" id="editCustomerNameId" placeholder="Customer Name" required/>
	    </div>
  	</div>
 	
 	<div class="form-group row">
	    <label for="inputEditCustomerDesc" class="col-sm-4 col-form-label">Customer Description*:</label>
	    <div class="col-sm-8">
	       <textarea class="form-control" id="editCustomerDescId" name="editCustomerDesc" maxlength="500" placeholder="Customer Description"></textarea>
	    </div>
  	</div>
 	</form>  
   </div>
   
   
  <div class="modal-footer text-align-center" id="updateCustomerBtn" style="display: none;">
    <button type="button" class="btn btn-primary" onclick="updateCustomerData()">Update</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  
  </div>
   

      </div>
      
    </div>
 
 
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/customerMaster.js"></script>
<script src="./js/utility.js"></script>