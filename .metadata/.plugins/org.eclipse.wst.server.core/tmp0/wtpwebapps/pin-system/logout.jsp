
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%
	String restApiUrl =  System.getenv("PINDOMAIN");
	//restApiUrl = restApiUrl+"#logout";
%>
<html>

<head>
<title>Logout</title>
</head>
<body bgcolor=#ffffff>
	<div id="login">
		<center>
			<br> <br>
			<%@ page session="true"%>

			User '<%=request.getRemoteUser()%>' has been logged out.

			<%
				session.invalidate();
			%>
			<!-- <br> <a href="/fitto-sys-admin">Click here to login again</a> -->
		</center>
	</div>

</body>
<script>
	url = document.URL
	u = document.URL.lastIndexOf('/pin-system')
	s = document.URL.substring(0, u)
	window.location =('//<%=restApiUrl%>/')
</script>

</html>