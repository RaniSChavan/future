var apiContxtPin = "/pin-webservice";
var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";


function resetPassword() {
	if(validateResetPassword()) {
		$("#loader").show();
		var json = {
			username : $("#sessionUsername").val(),
			password: $("#oldPasswordId").val(),
			newPassword: $("#newPasswordId").val()
		};	
		
		$.ajax({
		url: apiContxtPin+"/resource/auth/resetPassword",
		type: "POST",
		headers: { "APIKey": $("#apiKeySession").val() },
		data: JSON.stringify(json),
		dataType: "json",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			$("#loader").hide();
			if(data.message) {
				if(data.status === "success") {
					$("#resetPasswordErrorDiv").empty();
					successMsg = data.message;
					alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>", 
						function () { 
	       			 		document.getElementById("resetPassworLogoutId").click();
	    			});
				} else {
					$("#resetPasswordErrorDiv").empty();
					successMsg = data.message;
					alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");
				}
			} else if (data.error) {
				$("#resetPasswordErrorDiv").empty();
				successMsg = data.error[0].errorMessages[0].errorMsg;
				if(successMsg != undefined) {
					alertify.alert("<p style='text-align: left; margin-top: -5%;'><img src='images/checkmark.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>"+successMsg+"!</p>");	
				} else {
					alertify.alert(FAILURE_MSG);
				}
			}		
		},
		error: function () {
			$("#loader").hide();
			alertify.alert(FAILURE_MSG);
		}
	});
	}
}


function validateResetPassword() {
	var oldPassword = $("#oldPasswordId").val();
	var newPassword = $("#newPasswordId").val();
	var confirmPassword = $("#confirmPasswordId").val();
	
	var errorDiv = $("#resetPasswordErrorDiv");
	
	if (oldPassword  === "") {     
		errorDiv.empty().append("Please enter Old Password");     
        return false;
    } else if (newPassword === "") {
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