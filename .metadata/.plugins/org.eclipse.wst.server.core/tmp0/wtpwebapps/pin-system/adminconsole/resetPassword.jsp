<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.text.DateFormat"%>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="./css/common.css"/>

</head>

<div class="container container-background">

<div class="main-wrap-div">

<div class="row form-group">
		<div class="col-md-6"><p class="main-wrap-header">Reset Password</p></div>
	</div>

<div class="error-messages-scroll" id="resetPasswordErrorDiv" style="padding: 0px 2px 10px 0px;"></div>

	<div class="reset-password-div">
		<form id="resetPasswordFormId">
	         <div class="form-group row">
			    <label for="oldPassword" class="col-sm-2 col-form-label">Old Password*</label>
			    <div class="col-sm-3">
				  <input type="password" class="form-control" id="oldPasswordId" maxlength="16" placeholder="Old Password">
			    </div>		
			 </div>
			 
			 <div class="form-group row">
			    <label for="newPassword" class="col-sm-2 col-form-label">New Password*</label>
			    <div class="col-sm-3">
				  <input type="password" class="form-control" id="newPasswordId" maxlength="16" placeholder="New Password">
			    </div>		
			 </div>
			 
			 <div class="form-group row">
			    <label for="confirmPassword" class="col-sm-2 col-form-label">Confirm Password*</label>
			    <div class="col-sm-3">
				  <input type="password" class="form-control" id="confirmPasswordId" maxlength="16" placeholder="Confirm Password">
			    </div>		
			 </div>
			 
			 <div class="form-group row">
			 <div class="col-sm-5">
			   <div class="alert alert-info">
  					<strong>Info!</strong> Password should be 8 to 16 characters which contain at least one numeric digit and a special character.
			   </div>		 
			 </div>
			 </div>			 
		</form>
	</div>
		
		 <br><br>
    	<div>
    		<button type="submit" class="btn btn-primary" onclick="resetPassword()">Submit</button>
    		<a href="../logout.jsp" id="resetPassworLogoutId"></a>
    	</div>
</div>

</div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="./js/resetPassword.js"></script>
<script src="./js/utility.js"></script>