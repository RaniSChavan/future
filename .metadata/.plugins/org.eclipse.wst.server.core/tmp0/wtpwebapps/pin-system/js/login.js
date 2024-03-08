var apiContxtPin = "/pin-webservice";

$(document).ready(function () {
	var errorMessageId = sessionStorage.getItem("errorMessageValId");
	if(errorMessageId != null && errorMessageId === "401") {
		$("#loginErrorMsgTextId").text("Incorrect userid or password");
	} else {
		$("#loginErrorMsgTextId").text("");
	}
	sessionStorage.removeItem("errorMessageValId");
});

function togglePassword() {
	var password = $('#loginPasswordId');
	var togglePassword = $('#togglePassword');
	var type = password.attr('type') === 'password' ? 'text' : 'password';
    password.attr('type', type);
    togglePassword.toggleClass('glyphicon-eye-close');
}	

function showForgetPassword() {
	$("#loginDivId").hide();
	$("#forgotPasswordDivId").show();
}

function redirectToLogin() {
   var location = '//'+$("#restApiUrlId").val()+'/';
   window.location = location;
}

jQuery('#forgetPassword').on('submit', function(e) {
		e.preventDefault();
		var emailIdVal = $("#forgetPasswordEmail").val();
		if (jQuery.isEmptyObject(emailIdVal)) {
			$("#resetPasswordErrorDiv").empty().append("Enter Email Id to reset password!");
		} else if (!validateEmail(emailIdVal)) {
			$("#resetPasswordErrorDiv").empty().append(
					"Please enter a valid Email Id!");
		} else {
			$("#loader").show();
			$("#resetPasswordErrorDiv").empty();
			var data = {
				"emailId" : emailIdVal
			};
		$.ajax({
			type : 'POST',
			url: apiContxtPin+ "/resource/auth/forgotPassword",
			headers: { "APIKey": $("#apiKeySession").val() },
			data: JSON.stringify(data),
	        beforeSend : function(xhr) {
	            if (xhr.overrideMimeType) {
	                xhr.overrideMimeType("application/json");
	            }
	        },
	        method : "POST",
	        data : JSON.stringify(data),
	        dataType : "json",
	        processData : false,
	        contentType : "application/json; charset=utf-8",
	        success : function(result) {
	        	$("#loader").hide();
				if(result.error) 
					alert(result.error[0].errorMessages[0].errorMsg);
				else {
					alert(result.message);		
				}	
	        },
	        error : function(err) {
	        	$("#loader").hide(); //ISSUE# 2594
	            return errorCallback(err);
	        }
		});
	}
});
	
	
function validateEmail(email) {
	  //var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  //ISSUE# 2672
	  var regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
	  if(!regex.test(email)) {
	    return false;
	  } else{
	    return true;
	  }
	}