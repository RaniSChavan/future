<html>
<%@ page session="true"%>
<%
System.out.println("*******************");
System.out.println("**   Error JSP   **");
System.out.println("*******************");
session.invalidate();
%>
<%
	String restApiUrl =  System.getenv("PINDOMAIN");
%>
  <head>
    <title>Login failed</title>
  </head>
  <body bgcolor=#ffffff>
  <div id="login">
   
  <center><h2>Authentication Failure.</h2>
   
  <!-- <a href="login.jsp">Return to login page</a> </center> -->
  </div>
   
  </body>
  <script>
	url = document.URL
	u = document.URL.lastIndexOf('/pin-system')
	s = document.URL.substring(0, u)
    //window.location = s + "?errorMessage=Incorrect userid or password"
   <%--  window.location =('//<%=restApiUrl%>/')+"?errorMessage=401" --%>
	sessionStorage.setItem("errorMessageValId", "401");	
	window.location =('//<%=restApiUrl%>/')
  </script>
</html>