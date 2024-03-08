<%-- <%@ page import="com.ambertag.security.SecurityServiceImpl"%> --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String jwtToken = request.getParameter("key");
	String restApiUrl =  System.getenv("PINDOMAIN");
	String apiKey = System.getenv("API_KEY");
%>
	
<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
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
               <div id="resetPasswordDivId">
               	<p class="login-card-description">Create New Password</p>
               	  <div class="form-group row">  
					<div class="col-sm-12">
					  <div class="error-messages" id="resetPasswordErrorDiv"></div>
					</div>
				  </div>
               	  <form method="POST" class="login-form" id="resetPassword">
               	  <input type="hidden" id="jwtTokenId" value="<%=jwtToken%>"/>
               	  <input type="hidden" id="restApiUrlId" value="<%=restApiUrl%>"/>
               	   <input type="hidden" id="apiKeySession"  value="<%=apiKey%>"/>
               	  <div class="alert alert-info">
  					<strong>Info!</strong> Password should be 8 to 16 characters which contain at least one numeric digit and a special character.
				  </div>
                  <div class="form-group">
                    <label for="newpassword" class="sr-only">New Password</label>
                    <input type="password" class="form-control" name="newpassword" id="newpasswordId" maxlength="16" placeholder="New Password">
                  </div>
                  <div class="form-group">
                    <label for="confirmpassword" class="sr-only">Confirm Password</label>
                    <input type="password" class="form-control" name="confirmpassword" id="confirmpasswordId" maxlength="16" placeholder="Confirm Password">
                  </div>
                  <input name="resetPassword" id="resetPassword" class="btn btn-block login-btn mb-4" type="submit" value="Reset Password">
                </form>
                 <a href="#" class="forgot-password-link" onclick="redirectToLogin()">Back to Login</a>    
               </div>
            </div>
            <br><br><br><br><br>
          </div>
        </div>
      </div>
    </div>
  </main>
  
<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>  
 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="/js/forgotPassword.js"></script>
</body>
</html>