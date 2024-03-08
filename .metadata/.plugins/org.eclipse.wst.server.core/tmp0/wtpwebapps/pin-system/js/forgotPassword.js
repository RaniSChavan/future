var apiContxtPin = "/pin-webservice";

function redirectToLogin() {
   var location = '//'+$("#restApiUrlId").val()+'/';
   window.location = location;
}

jQuery('#resetPassword').on('submit', function (e) {	
	e.preventDefault();	
	if(validateForgotPassword()){
		sessionStorage.setItem("passwordReset", "N");
		$("#loader").show();
		var data = {
			newPassword : $("#newpasswordId").val(),
			confirmPassword : $("#confirmpasswordId").val(),
			encryptedData : $("#jwtTokenId").val()
		};
		$.ajax({
			type : 'POST',
			url: apiContxtPin+ "/resource/auth/forgotResetPassword",		
			data: JSON.stringify(data),
	        beforeSend : function(xhr) {
	            if (xhr.overrideMimeType) {
	                xhr.overrideMimeType("application/json");
	            }
	        },
	        method : "POST",
	        headers: { "APIKey": $("#apiKeySession").val() },
	        data : JSON.stringify(data),
	        dataType : "json",
	        processData : false,
	        contentType : "application/json; charset=utf-8",
			success : function(result,xhr) {
				$("#loader").hide();
				if(result.status ==='success'){
					alert("Password reset successfully");
					var location = '//'+$("#restApiUrlId").val()+"?passwordReset="+result.paramId;
  					window.location = location;
  					
				}
				if(result.error) {
					if(result.error[0].errorMessages[0].errorMsg !== undefined) {
						alert(result.error[0].errorMessages[0].errorMsg);
					} else {
						alert('Password reset failed! Please contact administrator.');
					}
				}				
			},
			error : function(err) {
				$("#loader").hide(); 
			}
		});
	}
	
});

function validateForgotPassword() {
	var newPassword = $("#newpasswordId").val();
	var confirmPassword = $("#confirmpasswordId").val();
	var jwtToken = $("#jwtTokenId").val();
	
	var errorDiv = $("#resetPasswordErrorDiv");
	
	if (newPassword === "") {
    	errorDiv.empty().append("Please enter New Password");    
        return false;
    } else if (CheckPassword(newPassword) == false) {
        errorDiv.empty().append("Password should be 8 to 16 characters which contain at least one numeric digit and a special character");     
        return false;
    } else if (confirmPassword === "") {
    	errorDiv.empty().append("Please enter Confirm Password");   
        return false;
    } else if (newPassword != confirmPassword) {
    	errorDiv.empty().append("New Password and Confirm Password does not match");    
        return false;
    }
 return true;
}

function CheckPassword(inputtxt) { 
	var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	if(!inputtxt.match(paswd)) { 
		return false;
	} else { 
		return true;
	}
}