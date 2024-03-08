<%@page import="com.fitto.gui.utils.SessionManagementUtils"%>
<%@page import="com.fitto.gui.utils.AESEncryption"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<% HttpSession httpSession =request.getSession(false);
    System.out.println(" From JSP"+httpSession.isNew());
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<%
String restApiUrl =  System.getenv("PINDOMAIN");
String apiKey = System.getenv("API_KEY");

String passwordReset = request.getParameter("passwordReset");
if(passwordReset != null) {
	AESEncryption encryption = new AESEncryption();
	String decryptUserName = encryption.decrypt(passwordReset);
	SessionManagementUtils sessionManagementUtils = new SessionManagementUtils();
	sessionManagementUtils.invalidateAllSessionsOfUser(decryptUserName);
}

%>
<html>
<head>
  <title>Login Page</title>
  <meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
  
  <link rel="shortcut icon" type="image/png" href="../images/favicon.ico" />
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,600' rel='stylesheet' type='text/css'>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/6.1.95/css/materialdesignicons.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  
 <link rel="stylesheet" type="text/css" href="../css/login.css"/>
</head>
<body>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../images/login.jpg" alt="login" class="login-card-img">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="../images/app_logo.png" alt="logo" class="logo">
              </div>
              <div id="loginDivId">
              <p class="login-card-description">Sign into your Pin System account</p>
              <div class="error-msg-div"><span id="loginErrorMsgTextId"></span></div>
              <form method="POST" action='<%= response.encodeURL("j_security_check") %>'  class="login-form">
              	  <input type="hidden" id="restApiUrlId" value="<%=restApiUrl%>"/>
              	   <input type="hidden" id="apiKeySession"  value="<%=apiKey%>"/>
                  <div class="form-group">
                    <label for="username" class="sr-only">User Name</label>
                    <input type="text" class="form-control" name="j_username" maxlength="45" placeholder="User Name">
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" placeholder="***********" name="j_password" id="loginPasswordId" class="form-control" style="width: 85%;float: left;"/>
                    <div class="toggle-pwd-div">
					 <a class="toggle-pwd-btn" onclick="togglePassword()">
						<i class="glyphicon glyphicon-eye-open" id="togglePassword"></i>
					 </a>
					</div>
                  </div>
                  <input name="login" id="login" class="btn btn-block login-btn mb-4" type="submit" value="Login">
                </form>
                
                <a href="#" class="forgot-password-link" onclick="showForgetPassword()">Forgot password?</a>                
               </div>
               
               <div id="forgotPasswordDivId" style="display: none;">
               	<p class="forgot-password-description">Please enter your Email Id registered with us, to send you a link to reset the password.</p>
               	  <div class="form-group row">  
					<div class="col-sm-12">
					  <div class="error-messages" id="resetPasswordErrorDiv"></div>
					</div>
				  </div>
               	  <form method="POST" class="login-form" id="forgetPassword">
                  <div class="form-group">
                    <label for="emailId" class="sr-only">Email Id</label>
                    <input type="text" class="form-control" name="emailId" id="forgetPasswordEmail" maxlength="45" placeholder="Email Id">
                  </div>
                  <input name="forgotPassword" id="forgotPassword" class="btn btn-block login-btn mb-4" type="submit" value="Reset Password">
                </form>
                <a href="#" class="forgot-password-link" onclick="redirectToLogin()">Back to Login</a>  
               </div>
               <!--  <a href="#" class="forgot-password-link">Forgot password?</a>
                <p class="login-card-footer-text">Don't have an account? <a href="#" class="text-reset">Register here</a></p>
                <nav class="login-card-footer-nav">
                  <a href="#">Terms of use.</a>
                  <a href="#">Privacy policy</a>
                </nav> -->
            </div>
            <br><br><br><br><br>
          </div>
        </div>
      </div>
    </div>
  </main>
  
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="../images/modal-loader.gif" alt="Loading..." />
</div> 


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="/js/login.js"></script>

</body>
</html>